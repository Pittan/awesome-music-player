import { Component } from '@angular/core'
import { NgxMusicKitService } from 'ngx-music-kit'
import { environment } from '../environments/environment'
import { flatMap } from 'lodash-es'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'awesome-music-player'

  constructor (
    private ngxMusicKit: NgxMusicKitService
  ) {

  }

  ngOnInit () {
    // this.ngxMusicKit.initClient({
    //   developerToken: environment.apple_music.token,
    //   app: {
    //     name: environment.apple_music.app_name,
    //     build: environment.apple_music.build,
    //   }
    // })
    // .then(() => {
    //   if (!this.ngxMusicKit.musicKitInstance.isAuthorized) {
    //     return this.ngxMusicKit.authorize()
    //   }
    // })
    // .then(() => {
    //   // this.musicKit.search({ term: 'Perfume' }).subscribe(res => {
    //   //   console.log(res)
    //   // })
    //
    //   // id: 351343399
    //   // this.musicKit.getArtistRelationship('albums', { id: '351343399', limit: 100 }).subscribe(res => {
    //   //   console.log(res)
    //   //   res.data.forEach(al => {
    //   //     console.group(`Album`)
    //   //     console.log('Name:', al.attributes.name)
    //   //     console.log('ID: ', al.id)
    //   //     const url = window.MusicKit.formatArtworkURL(al.attributes.artwork, 32, 32)
    //   //     console.log('%c+', 'font-size: 0px; padding: 32px; color: transparent; background: url(' + url + ');')
    //   //     console.groupEnd()
    //   //   })
    //   // })
    //
    //   // Get all albums
    //   const albums = [
    //     1420297347, 1479640870, 1465083583, 657666068, 657671889, 1440800532, 1440777771,
    //     1465086747, 657660761, 1440769541, 1442464409, 1444855079, 1444892943, 1444864368,
    //     1479021788, 1445028016, 1444618408, 1444633631, 1464889243, 657689612, 1464887221,
    //     657685784, 1445046461, 663649047, 1445029657, 1440907374, 663645347, 1479021907,
    //     1464884247, 658115946, 657688000, 663529213, 657677010, 657680477, 658182876,
    //     1444865759, 1488564835, 1470032548, 1466796927, 1414164195, 1444609578, 657678517]
    //
    //   console.log(this.ngxMusicKit.musicKitInstance.api)
    //   console.log(this.ngxMusicKit.musicKitInstance.api)
    //   this.ngxMusicKit.musicKitInstance.api.search(
    //     'coldplay everyday life',
    //     { limit: 10, types: 'artists,albums' }).then((results) => {
    //       console.log(results)
    //       const res = results.albums.data[0]
    //       this.play(res.id)
    //       // console.table(results.albums.data[0].attributes);
    //     // Vue.set(vm, 'albums', results.albums.data)
    //   });
    //
    //   // this.ngxMusicKit.getMultipleCatalogAlbums({ids: albums}).subscribe(res => {
    //   //   const albums = res.data
    //   //   const tracks = flatMap(albums.map(al => {
    //   //     return al.relationships.tracks.data
    //   //   }))
    //   //   console.log(tracks[0])
    //   //   this.play(tracks)
    //   // })
    // })
  }

  private play (queue) {
    // this.ngxMusicKit.musicKitInstance.setQueue({
    //   album: queue
    // }).then(queue => {
    //   console.log('queue: ' + JSON.stringify(queue.nextPlayableItem));
    //   // this.ngxMusicKit.musicKitInstance.player.play().then((pos) => {
    //   //   console.log('pos:' + pos);
    //   // });
    // })
  }
}
