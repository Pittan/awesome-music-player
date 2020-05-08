import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgxMusicKitModule } from 'ngx-music-kit';
import { CassetteTapeComponent } from './cassette-tape/cassette-tape.component'

@NgModule({
  declarations: [
    AppComponent,
    CassetteTapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMusicKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
