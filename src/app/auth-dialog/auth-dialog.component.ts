import { Component, OnInit } from '@angular/core';
import { NgxMusicKitService } from 'ngx-music-kit'

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})
export class AuthDialogComponent implements OnInit {

  constructor(
    private ngxMusicKit: NgxMusicKitService
  ) { }

  ngOnInit(): void {

  }

  startAuth () {
    this.authIfNeeded().then(() => {
      location.reload()
    })
  }

  private authIfNeeded (): Promise<void | string> {
    if (!this.ngxMusicKit.musicKitInstance.isAuthorized) {
      return this.ngxMusicKit.authorize()
    } else {
      return Promise.resolve()
    }
  }

}
