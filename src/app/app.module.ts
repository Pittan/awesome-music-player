import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgxMusicKitModule } from 'ngx-music-kit';
import { CassetteTapeComponent } from './cassette-tape/cassette-tape.component';
import { MusicPlayerComponent } from './music-player/music-player.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerStatePipe } from './music-player/player-state.pipe';
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component';
import { CatalogPlaylistsComponent } from './catalog-playlists/catalog-playlists.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { LicenseComponent } from './license/license.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    CassetteTapeComponent,
    MusicPlayerComponent,
    PlayerStatePipe,
    LibraryPlaylistsComponent,
    CatalogPlaylistsComponent,
    AuthDialogComponent,
    LicenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMusicKitModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
