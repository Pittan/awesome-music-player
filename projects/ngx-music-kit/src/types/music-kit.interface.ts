export type DeveloperToken = string
export type MusicUserToken = string
export type MusicKitStorefrontId = string
export type MusicKitMediaItemPosition = number
export type MusicKitMediaItemOptions = any
export interface MusicKitPlaybackStates {
  /** This value indicates that playback of all media items in the queue has ended. */
  completed
  /** This value indicates that playback of the media item has ended. */
  ended
  /** This value indicates that loading of the media item has begun. */
  loading
  /** This value indicates that the player has not attempted to start playback. */
  none
  /** This value indicates that playback has been paused. */
  paused
  /** This value indicates that the player is currently playing media. */
  playing
  /** This value indicates that the player has started a seek operation. */
  seeking
  /** This value indicates that the player is trying to fetch media data but cannot retrieve the data. */
  stalled
  /** This value indicates that plaback has been stopped. */
  stopped
  /** This value indicates that playback is delayed pending the completion of another operation. */
  waiting
}
export type MusicKitMusicDescriptor = string | MusicKitMediaItem

export interface MusicKitQueue {
  isEmpty: boolean
  items: MusicKitMediaItem[]
  length: number
  nextPlayableItem: MusicKitMediaItem | undefined
  position: number
  previousPlayableItem: MusicKitMediaItem | undefined
  addEventListener (name: string, callback: Function): void
  append(descriptor: MusicKitMusicDescriptor): void
  indexForItem(descriptor: MusicKitMusicDescriptor): number
  item(): number
  prepend(descriptor: MusicKitMusicDescriptor): void
  removeEventListener (name: string, callback: Function): void
}

export interface MusicKitEvents {
  authorizationStatusDidChange: string
  authorizationStatusWillChange: string
  eligibleForSubscribeView: string
  loaded: string
  mediaCanPlay: string
  mediaItemDidChange: string
  mediaItemWillChange: string
  mediaPlaybackError: string
  metadataDidChange: string
  playbackBitrateDidChange: string
  playbackDurationDidChange: string
  playbackProgressDidChange: string
  playbackStateDidChange: string
  playbackStateWillChange: string
  playbackTargetAvailableDidChange: string
  playbackTimeDidChange: string
  playbackVolumeDidChange: string
  primaryPlayerDidChange: string
  queueItemsDidChange: string
  queuePositionDidChange: string
  storefrontCountryCodeDidChange: string
  storefrontIdentifierDidChange: string
  userTokenDidChange: string
}

export interface MusicKitFormattedPlaybackDuration {
  hours: number
  minutes: number
}

export enum MusicKitPlayerRepeatMode {
  /** The current queue will be repeated. */
  ALL = 'all',
  /** No repeat mode specified. */
  NONE = 'none',
  /** The current media item will be repeated. */
  ONE = 'one'
}
export enum MusicKitPlayerShuffleMode {
  /** This value indicates that shuffle mode is off. */
  OFF = 'off',
  /** This value indicates that songs are being shuffled in the current queue. */
  SONGS = 'songs'
}

export declare class MusicKitMediaItem {
  constructor (options: MusicKitMediaItemOptions)
  albumInfo?
  albumName?
  artistName?
  artwork?
  artworkURL?
  attributes?
  contentRating?
  discNumber?
  id?
  info?
  isExplicitItem?
  isPlayable?
  isPreparedToPlay?
  isrc?
  playbackDuration?
  playlistArtworkURL?
  playlistName?
  previewURL?
  releaseDate?
  title?
  trackNumber?
  type?
  // prepareToPlay ()
}

export interface ArtworkURL {

}

interface QueryParameters {
  [key: string]: any
}

export interface MusicKitSetQueueOptions {
  album?: string
  items?: MusicKitMusicDescriptor[]
  parameters?: QueryParameters
  playlist?: string
  song?: string
  songs?: string[]
  startPosition?: number
  url?: string
}

export interface MusicKitArtwork {
  bgColor: string
  height: number
  width: number
  textColor1: string
  textColor2: string
  textColor3: string
  textColor4: string
  url: string
}

export interface MusicKitEmbedOptions {
  height: number | string
  width: number | string
}

// export declare class MusicKit {
//   readonly version: string
//   readonly errors: MusicKitMKError[]
//   MusicKitInstance: MusicKitInstance
//   /** Configure a MusicKit instance. */
//   configure (configuration: MusicKitConfiguration): MusicKitInstance
//   getInstance (): MusicKitInstance
//   /**
//    * Returns a formatted artwork URL.
//    * @param artwork An artwork resource object.
//    * @param height The desired artwork height.
//    * @param width the desired artwork width.
//    */
//   formatArtworkURL (artwork: MusicKitArtwork, height: number, width: number): string
//   /**
//    * Returns an object with milliseconds formatted into hours and minutes.
//    */
//   formattedMilliseconds (milliseconds: number): MusicKitFormattedPlaybackDuration
//   /**
//    * Returns an object with seconds formatted into hours and minutes.
//    */
//   formattedSeconds (seconds: number): MusicKitFormattedPlaybackDuration
//   /**
//    * Generates Apple Music web player markup.
//    *
//    * @param url The iTunes URL for the Apple Music content.
//    * @param options The object containing the height and width of the player.
//    */
//   generateEmbedCode (url: string, options: MusicKitEmbedOptions): string
//
//   formatMediaTime (seconds: number, separator: string): string
// }

/**
 * The playback bit rate of the music player.
 */
export enum MusicKitPlaybackBitrate {
  /** The bit rate is 256 kbps. */
  HIGH = 'HIGH',
  /** The bit rate is 64 kbps. */
  STANDARD = 'STANDARD'
}

export interface MusicKitConfiguration {
  /** The developer token to identify yourself as a trusted developer and member of the Apple Developer Program. */
  developerToken?: DeveloperToken | undefined
  /** The current storefront for this MusicKit configuration. */
  storefrontId?: MusicKitStorefrontId | undefined
  /** This property indicates whether you have explicitly enabled or disabled declarative markup. */
  declarativeMarkup?: boolean | undefined
  /** The bit rate for ths MusicKit configuration */
  bitrate?: MusicKitPlaybackBitrate
  /** A property that defines your app configuration. */
  app?: MusicKitAppConfiguration
}

export interface MusicKitAppConfiguration {
  /** The build number of your app. */
  build?: string
  /** A URL for your icon. */
  icon?: string
  /** The name of your app. */
  name?: string
  /** The version of your app. */
  version?: string
}
