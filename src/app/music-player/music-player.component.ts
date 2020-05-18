import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { MusicPlayerService } from './music-player.service'
import { Subscription } from 'rxjs'
import {
  PlayerState,
  TapeLength
} from '../cassette-tape/cassette-tape.component'
import { state, animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.sass'],
  animations: [
    trigger('slideInOut', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '90px',
      })),
      transition('open => closed', animate('200ms ease-in-out')),
      transition('closed => open', animate('200ms ease-in-out'))
    ])
  ]
})
export class MusicPlayerComponent implements OnInit, OnDestroy {

  playbackTime: number
  state: PlayerState
  tapeLength: TapeLength
  tapeSide: 'A' | 'B'
  tapeName = ''

  isPlayerActive = false

  private subscription = new Subscription()

  playerVisibilityState: 'open' | 'closed' = 'closed'

  constructor(
    private player: MusicPlayerService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.player.playbackTimeSec.subscribe(val => {
        if (this.tapeSide === 'B') {
          this.playbackTime = val - (this.tapeLength * 60 / 2)
          return
        }
        this.playbackTime = val
      })
    )
    this.subscription.add(
      this.player.playerState.subscribe(val => {this.state = val})
    )
    this.subscription.add(
      this.player.tapeLength.subscribe(val => { this.tapeLength = val })
    )
    this.subscription.add(
      this.player.tapeSide.subscribe(val => { this.tapeSide = val })
    )
    this.subscription.add(
      this.player.isActive.subscribe(val => { this.isPlayerActive = val })
    )
    this.subscription.add(
      this.player.tapeName.subscribe(val => { this.tapeName = val })
    )
    this.subscription.add(
      this.player.isMaximized.subscribe(val => {
        this.playerVisibilityState = val ? 'open' : 'closed'
      })
    )
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  pauseAndStop () {
    this.player.pauseAndStop()
  }

  play () {
    this.player.resume()
  }

  rewind () {
    this.player.rewind()
  }

  fastForward () {
    this.player.fastForward()
  }

  prev () {
    window.MusicKit.getInstance().player.skipToPreviousItem()
  }

  next () {
    window.MusicKit.getInstance().player.skipToNextItem()
  }

  toggle () {
    if (this.playerVisibilityState === 'open') { return }
    this.player.isMaximized.next(!this.player.isMaximized.value)
  }

  close () {
    this.player.isMaximized.next(false)
  }

  flip () {
    this.player.flip()
  }

}
