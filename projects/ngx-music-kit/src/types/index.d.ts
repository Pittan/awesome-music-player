export * from './music-kit.interface'
export * from './music-kit-instance.interface'
export * from './music-kit-api.interface'
export * from './music-kit-library.interface'
export * from './music-kit-mk-error.interface'
export * from './music-kit-player.interface'
export * from './apple-music-api-response.interface'

import {
  MusicKitArtwork,
  MusicKitConfiguration, MusicKitEmbedOptions, MusicKitFormattedPlaybackDuration
} from './music-kit.interface'
import { MusicKitMKError } from './music-kit-mk-error.interface'
import { MusicKitInstance } from './music-kit-instance.interface'

declare global {
  interface Window {
    MusicKit: {
      readonly version: string
      readonly errors: MusicKitMKError[]
      MusicKitInstance: MusicKitInstance,
      /** Configure a MusicKit instance. */
      configure(configuration: MusicKitConfiguration): MusicKitInstance,
      getInstance (): MusicKitInstance,
      /**
       * Returns a formatted artwork URL.
       * @param artwork An artwork resource object.
       * @param height The desired artwork height.
       * @param width the desired artwork width.
       */
      formatArtworkURL (artwork: MusicKitArtwork, height: number, width: number): string,
      /**
       * Returns an object with milliseconds formatted into hours and minutes.
       */
      formattedMilliseconds (milliseconds: number): MusicKitFormattedPlaybackDuration,
      /**
       * Returns an object with seconds formatted into hours and minutes.
       */
      formattedSeconds (seconds: number): MusicKitFormattedPlaybackDuration,
      /**
       * Generates Apple Music web player markup.
       *
       * @param url The iTunes URL for the Apple Music content.
       * @param options The object containing the height and width of the player.
       */
      generateEmbedCode (url: string, options: MusicKitEmbedOptions): string,

      formatMediaTime (seconds: number, separator: string): string,
    }
  }
}
