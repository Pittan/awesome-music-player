import { Injectable } from '@angular/core'
import { MusicKitInstance, MusicKitConfiguration, DeveloperToken, MusicUserToken, MusicKitStorefrontId } from '../types'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {
  AddPlaylistResponse,
  AlbumRelationship,
  GenreRelationship, GetMultipleCatalogAlbumsResponse,
  MusicVideoRelationship, PlaylistRelationship, StationRelationship
} from '../types'
import { BehaviorSubject, Observable } from 'rxjs'
import postscribe from 'postscribe'
import { NgxMusicKitModule } from './ngx-music-kit.module'

const API_ENDPOINT = 'https://api.music.apple.com/v1'

@Injectable({
  providedIn: NgxMusicKitModule
})
export class NgxMusicKitService {

  private httpHeaders: HttpHeaders

  initialized = new BehaviorSubject(false)

  musicKitInstance: MusicKitInstance

  constructor (
    private http: HttpClient
  ) { }

  private loadMusicKitJs () {
    return new Promise((resolve, reject) => {
      postscribe(
        '#music-kit-js-entry',
        '<script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>',
        {
          done: () => {
            resolve()
          },
          error: (e) => {
            reject(e)
          }
        }
      )
    })
  }

  /**
   * Initialize MusicKit JS
   */
  initClient (config: MusicKitConfiguration): Promise<void> {
    if (this.initialized.value) {
      return Promise.resolve()
    }
    return this.loadMusicKitJs().then(() => {
        return new Promise((resolve) => {
          if (window.MusicKit) {
            // Initialize
            this.musicKitInstance = window.MusicKit.configure(config)
            resolve()
          } else {
            // Wait for initialize
            document.addEventListener('musickitloaded', () => {
              this.musicKitInstance = window.MusicKit.configure(config)
              resolve()
            })
          }
        }).then(() => {
          if (this.musicKitInstance.isAuthorized) {
            this.prepareHttpClient(
              this.musicKitInstance.developerToken,
              this.musicKitInstance.musicUserToken
            )
          }

          this.initialized.next(true)
        })
      }
    )
  }

  /**
   * Authorize user and it prepare for Http Header.
   */
  authorize (): Promise<MusicUserToken> {
    return this.musicKitInstance.authorize().then(token => {
      this.prepareHttpClient(this.musicKitInstance.developerToken, token)
      return token
    })
  }

  private throwErrorIfNotInitialized () {
    if (!this.initialized.value && !this.musicKitInstance) {
      throw Error('MusicKit JS is not initialized! You have to run MusicKitClientService.initClient() first.')
    }
  }

  private prepareHttpClient (developerToken: DeveloperToken, musicUserToken: MusicUserToken) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Music-User-Token': musicUserToken,
      Authorization: `Bearer ${developerToken}`
    })
  }

  // # Storefronts and Localization
  // - Get a User's storefront
  // - Get a Storefront
  // - Get Multiple Storefronts
  // - Get All Storefronts

  // # Albums, Artists, Songs and Videos
  // - Albums
  // - Artists
  // - Songs
  // - Music Videos
  //
  // # Playlists and Stations
  // - Playlists
  // - Apple Music Stations
  // # Search
  // - Search
  // # Ratings and Charts
  // - Ratings
  // - Charts
  // # Genres, Curators, and Recommendations
  // - Music Genres
  // - Curators
  // - Recommendations
  // # Activities and History
  // - Activities
  // - History

  search (options: { term?: string, l?: string, limit?: number, offset?: string, types?: string[], storefront?: MusicKitStorefrontId}) {
    let params: any = {}
    if (options.term) params.term = options.term.replace(' ', '+')
    if (options.l) params.l = options.l
    if (options.limit) params.limit = options.limit.toString()
    if (options.offset) params.offset = options.offset
    if (options.types) params.types = options.types.join(',')
    const storefront = options.storefront || this.musicKitInstance.storefrontId
    return this.http.get(`${API_ENDPOINT}/catalog/${storefront}/search`, {
      headers: this.httpHeaders,
      params
    })
  }

  // tslint:disable:max-line-length
  getArtistRelationship (relationship: 'albums', options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<AlbumRelationship>
  getArtistRelationship (relationship: 'genres', options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<GenreRelationship>
  getArtistRelationship (relationship: 'musicVideos', options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<MusicVideoRelationship>
  getArtistRelationship (relationship: 'playlists', options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<PlaylistRelationship>
  getArtistRelationship (relationship: 'station', options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<StationRelationship>
  getArtistRelationship (relationship: string, options: { id: string, storefront?: string, l?: string, limit?: number}): Observable<any> {
    let params: any = {}
    if (options.l) params.l = options.l
    if (options.limit) params.limit = options.limit.toString()
    const storefront = options.storefront || this.musicKitInstance.storefrontId
    return this.http.get<any>(`${API_ENDPOINT}/catalog/${storefront}/artists/${options.id}/${relationship}`, {
      headers: this.httpHeaders,
      params
    })
  }
  // tslint:enable

  getMultipleCatalogAlbums (params: { storefront?: MusicKitStorefrontId, ids: string[] | number[], include?: string, l?: string}) {
    let p: any = {
      ids: params.ids.join(',')
    }
    if (params.l) p.l = params.l
    const storefront = params.storefront || this.musicKitInstance.storefrontId
    return this.http.get<GetMultipleCatalogAlbumsResponse>(`${API_ENDPOINT}/catalog/${storefront}/albums`, {
      headers: this.httpHeaders,
      params: p
    })
  }

  createPlaylist (name: string, description: string, tracks?: string[]) {
    const attributes = { name, description }
    const body: any = { attributes }
    if (tracks) {
      body.relationships = {
        tracks: {
          data: tracks.map(id => ({ id, type: 'songs' }))
        }
      }
    }
    return this.http.post<AddPlaylistResponse>(`${API_ENDPOINT}/me/library/playlists`, body, {
      headers: this.httpHeaders
    })
  }

}
