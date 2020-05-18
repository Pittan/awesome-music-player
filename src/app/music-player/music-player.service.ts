import { Injectable } from '@angular/core';
import { NgxMusicKitService } from 'ngx-music-kit'
import { environment } from '../../environments/environment'
import {
  PlayerState,
  TapeLength
} from '../cassette-tape/cassette-tape.component'
import { BehaviorSubject } from 'rxjs'
import { filter, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  private initialized = false

  /** 早送り・巻き戻し用のインターバル */
  private interval

  private realDurationSec = 0

  /** 早送り・巻き戻しをするときに何秒ずつ送るか */
  private scale = 8

  /** A面B面通しての、現在の再生時間 */
  playbackTimeSec = new BehaviorSubject<number>(0)

  /** テープの再生時間 */
  tapeLength = new BehaviorSubject<TapeLength>(120)

  /** テープの名前 */
  tapeName = new BehaviorSubject('')

  /** 再生中のテープの面(A or B) */
  tapeSide = new BehaviorSubject<'A' | 'B'>('A')

  /** プレーヤーの状態 */
  playerState= new BehaviorSubject<PlayerState>('stop')

  isActive = new BehaviorSubject(false)

  /** アプリの中で最大化表示されているかどうか */
  isMaximized = new BehaviorSubject(false)

  constructor(
    private ngxMusicKit: NgxMusicKitService
  ) {
    this.ngxMusicKit.initClient({
      developerToken: environment.apple_music.token,
      app: {
        name: environment.apple_music.app_name,
        build: environment.apple_music.build,
      }
    }).then(() => {
      const events = window?.MusicKit?.Events
      this.addEventListener(events.playbackTimeDidChange, (ev) => {
        if (ev.currentPlaybackTime === 0) { return }
        const index = this.ngxMusicKit.musicKitInstance.player.nowPlayingItemIndex
        const queue = this.ngxMusicKit.musicKitInstance.player.queue
        let duration = 0
        for(let i = 0; i < index; i++) {
          duration += (queue.items[i].playbackDuration / 1000)
        }
        duration += ev.currentPlaybackTime
        const fullTapeLengthSec = this.tapeLength.value * 60
        const isLimitOfSideA = duration >= fullTapeLengthSec / 2 && this.tapeSide.value === 'A'
        const isLimitOfSideB = duration >= fullTapeLengthSec && this.tapeSide.value === 'B'
        if (isLimitOfSideA || isLimitOfSideB) {
          // you have to flip this tape
          this.pauseAndStop()
        }
        this.playbackTimeSec.next(Math.floor(duration))
      })

      this.addEventListener(events.playbackStateDidChange, (ev) => {
        // console.log(`
        // state changed: ${window.MusicKit.PlaybackStates[ev.state]}`)
        switch (ev.state) {
          case window.MusicKit.PlaybackStates.playing:
            this.playerState.next('play')
            break
          case window.MusicKit.PlaybackStates.stopped:
            this.playerState.next('stop')
            break
          case window.MusicKit.PlaybackStates.paused:
            this.playerState.next('stop')
            break
        }
      })
      this.initialized = true
    })
  }

  play (playlistId: string, library?: boolean): Promise<void> {
    this.playbackTimeSec.next(0)
    this.tapeLength.next(10)
    this.tapeSide.next('A')
    this.playerState.next('stop')

    // estimate playlist running time
    const api = this.ngxMusicKit.musicKitInstance.api

    if (library) {
      return api.library.playlist(playlistId).then(res => {
        const tracks = res.relationships.tracks.data
        this.tapeName.next(res.attributes.name)
        this.process(playlistId, tracks)
      })
    } else {
      return api.playlist(playlistId).then(res => {
        const tracks = res.relationships.tracks.data
        this.tapeName.next(res.attributes.name)
        this.process(playlistId, tracks)
      })
    }
  }

  private process (playlistId, tracks) {
    let duration = 0
    tracks.forEach(t => { duration += t.attributes.durationInMillis })
    const durationInMinutes = duration / 1000 / 60
    this.realDurationSec = duration / 1000
    // console.log('this playlist is about ', durationInMinutes, ' minutes')
    if (durationInMinutes > 120) {
      alert('120分以上のプレイリストは再生できないよ')
      // NOTE もしかしたら120分以上のプレイリストも再生できるけど、止まるようにしたら面白いかも…？
      //      (そのほうが実際にダビングしたカセットテープ感も出ると思う…)
      throw Error('This playlist is longer than 120 minutes.')
    }

    let tapeLength: TapeLength = 120;
    ([120, 90, 60, 30, 10] as TapeLength[]).forEach(time => {
      if (durationInMinutes < time) {
        tapeLength = time
      }
    })
    this.tapeLength.next(tapeLength)
    this.isActive.next(true)
    if (!this.isMaximized.value) {
      this.isMaximized.next(true)
    }
    return this.ngxMusicKit.musicKitInstance.setQueue({playlist: playlistId}).then(queue => {
      return this.ngxMusicKit.musicKitInstance.player.play();
    })
  }

  /**
   * MusicKitJSのイベントをハンドラーに登録する
   * @param name
   * @param callback
   */
  private addEventListener (name: string, callback: Function) {
    this.ngxMusicKit.musicKitInstance.addEventListener(name, callback)
  }

  /**
   * 再生・早送り・巻き戻しをストップします
   */
  pauseAndStop () {
    this.ngxMusicKit.musicKitInstance.player.pause()
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    if (this.playerState.value === 'fast-forward' || this.playerState.value === 'fast-rewind') {
      // stop and set new position
      this.playerState.next('stop')
      return this.setPosition(this.playbackTimeSec.value, true).then(() => {
        this.pauseAndStop()
        this.ngxMusicKit.musicKitInstance.player.volume = 1
      })
    }
    this.playerState.next('stop')
    return Promise.resolve()
  }

  resume () {
    const isASideLimit = this.tapeSide.value === 'A' && this.tapeLength.value * 60 / 2 <= this.playbackTimeSec.value
    const isBSideLimit = this.tapeSide.value === 'B' && Math.floor(this.realDurationSec) <= this.playbackTimeSec.value
    if (isASideLimit || isBSideLimit) {
      return
    }

    this.pauseAndStop().then(() => {
      this.ngxMusicKit.musicKitInstance.player.play().then(() => {}).catch((err) => {})
    })
  }

  /**
   * 巻き戻しをします
   */
  async rewind () {
    await this.pauseAndStop()
    this.interval = setInterval(() => {
      const fullTapeLengthSec = this.tapeLength.value * 60
      const isASideLimit = this.tapeSide.value === 'A' && this.playbackTimeSec.value <= 0
      const isBSideLimit = this.tapeSide.value === 'B' && this.playbackTimeSec.value <= fullTapeLengthSec / 2
      if (isASideLimit || isBSideLimit) {
        this.pauseAndStop()
        return
      }
      this.playerState.next('fast-rewind')
      this.playbackTimeSec.next(this.playbackTimeSec.value - this.scale)
    }, 40)
  }

  /**
   * 早送りをします
   */
  async fastForward () {
    await this.pauseAndStop()
    this.interval = setInterval(() => {
      const fullTapeLengthSec = this.tapeLength.value * 60
      const isASideLimit = this.tapeSide.value === 'A' && this.playbackTimeSec.value >= fullTapeLengthSec / 2
      const isBSideLimit = this.tapeSide.value === 'B' && this.playbackTimeSec.value >= fullTapeLengthSec
      if (isASideLimit || isBSideLimit) {
        this.pauseAndStop()
        return
      }

      this.playerState.next('fast-forward')
      this.playbackTimeSec.next(this.playbackTimeSec.value + this.scale)
    }, 40)
  }

  /**
   * 秒(A面B面通して)を指定すると、プレイリストの中から
   * その時間にある曲を選択して、該当部分までシークします。
   */
  private setPosition (s: number, restoreVolumeManually?: boolean) {
    return new Promise((resolve, reject) => {
      const currentPlaybackIndex = this.ngxMusicKit.musicKitInstance.player.nowPlayingItemIndex
      const queue = this.ngxMusicKit.musicKitInstance.player.queue
      let tmpTime = 0
      for (let index = 0; index < queue.length; index++) {
        const item = queue.items[index]
        tmpTime += item.playbackDuration
        if (s * 1000 < tmpTime) {
          // この曲に決定
          const player = this.ngxMusicKit.musicKitInstance.player
          // if (index !== currentPlaybackIndex) { player.stop() }
          let promise = Promise.resolve(0)
          if (index !== currentPlaybackIndex) {
            this.ngxMusicKit.musicKitInstance.player.volume = 0
            promise = player.prepareToPlay({id: queue.items[index].id}).then(() => {
              return player.changeToMediaAtIndex(index)
            })
            return promise.then((pos) => {
              const time = index === 0 ? s : (s - (tmpTime - item.playbackDuration) / 1000)
              this.playerState.pipe(
                filter(val => val === 'play'),
                take(1)
              ).subscribe(() => {
                resolve(player.seekToTime(time))
                if (!restoreVolumeManually) { this.ngxMusicKit.musicKitInstance.player.volume = 1 }
              })
            })
          } else {
            return promise.then(() => {
              const time = index === 0 ? s : (s - (tmpTime - item.playbackDuration) / 1000)
              resolve(player.seekToTime(time))
            })
          }
        }
      }
      console.log('foooooooooooooo')
      // 見つからなかったとき(例: A面の0秒でひっくり返すとB面の最後の方になる)は
      // しょうがないのでB面の最後の曲の20秒あたりに再生位置を動かす
      // NOTE ほんとはホワイトノイズを流したいけど…
      resolve(this.setPosition(this.realDurationSec - 20, restoreVolumeManually))
    })
  }

  async flip () {
    const halfLengthOfTape = this.tapeLength.value / 2 * 60 // 片面の再生時間(s)
    let newPosition = 0
    if (this.tapeSide.value === 'A') {
      // A面だったとき
      newPosition = (halfLengthOfTape * 2) - this.playbackTimeSec.value
    } else {
      // B面だったとき
      newPosition = halfLengthOfTape - (this.playbackTimeSec.value - halfLengthOfTape)
    }
    this.ngxMusicKit.musicKitInstance.player.volume = 0
    this.isActive.next(false)
    this.tapeSide.next(this.tapeSide.value === 'A' ? 'B' : 'A')
    await this.setPosition(newPosition, true)
    this.isActive.next(true)
    await this.pauseAndStop()
    this.ngxMusicKit.musicKitInstance.player.volume = 1
  }
}
