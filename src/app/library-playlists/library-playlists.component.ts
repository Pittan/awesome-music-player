import { Component, OnInit } from '@angular/core';
import { NgxMusicKitService } from 'ngx-music-kit'
import { MusicPlayerService } from '../music-player/music-player.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-library-playlists',
  templateUrl: './library-playlists.component.html',
  styleUrls: ['./library-playlists.component.sass']
})
export class LibraryPlaylistsComponent implements OnInit {

  playLists: any[] = []

  private subscription = new Subscription()

  constructor (
    private ngxMusicKit: NgxMusicKitService,
    private musicPlayer: MusicPlayerService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.ngxMusicKit.initialized.subscribe(val => {
        if (val) {
          if (this.ngxMusicKit.musicKitInstance.isAuthorized) {
            // List all of your playlist
            this.fetchPlaylist().then(res => {
              this.playLists = res
              console.log(res)
            })
          }
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private fetchPlaylist (offset = 0) {
    return this.ngxMusicKit.musicKitInstance.api.library.playlists(undefined, {
      limit: 100, offset
    }).then(res => {
      return res
    })
  }

  playDirect (id: string) {
    this.musicPlayer.play(id, true).then(() => {
    }).catch((err) => {
      console.log(err)
    })
  }

}
