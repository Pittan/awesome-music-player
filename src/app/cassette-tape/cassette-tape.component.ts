import { AfterViewInit, Component, Input } from '@angular/core'

interface TapeStyle {
  right?: string
  left?: string
  top?: string
  width?: string
  height?: string
}

export type PlayerState = 'play' | 'play-reverse' | 'fast-forward' | 'fast-rewind' | 'stop'

export type TapeLength = 10 | 30 | 60 | 90 | 120

@Component({
  selector: 'app-cassette-tape',
  templateUrl: './cassette-tape.component.html',
  styleUrls: ['./cassette-tape.component.sass']
})
export class CassetteTapeComponent implements AfterViewInit {

  @Input()
  state: PlayerState

  @Input()
  set currentSide (val: 'A' | 'B') {
    this._currentSide = val
    this.calculateTapeStyle()
  }
  get currentSide () {
    return this._currentSide
  }

  @Input()
  tapeName = ''

  private _currentSide: 'A' | 'B' = 'A'
  private _tapeLengthMin: TapeLength = 10
  private _playbackTimeSec: number = 0

  @Input()
  set tapeLengthMin (val: TapeLength) {
    this._tapeLengthMin = val
    this.calculateTapeStyle()
  }

  get tapeLengthMin () {
    return this._tapeLengthMin
  }

  @Input()
  set playbackTimeSec (val: number) {
    this._playbackTimeSec = val
    this.calculateTapeStyle()
  }

  get playbackTimeSec () {
    return this._playbackTimeSec
  }

  // internal
  leftTapeStyle: TapeStyle = {}

  // internal
  rightTapeStyle: TapeStyle = {}

  constructor() { }

  ngAfterViewInit(): void {
    this.calculateTapeStyle()
  }

  private calculateTapeStyle () {
    const coreWidth = 30
    const baseWidth = Math.sqrt(((4 * 140 * this.tapeLengthMin) / 3) + coreWidth * coreWidth)
    const playedPercentage = (this.playbackTimeSec / 60) / (this.tapeLengthMin / 2)
    const minutesLeftPercentage = 1 - playedPercentage

    const leftSize = baseWidth * minutesLeftPercentage
    this.leftTapeStyle = {
      left: `-${21 + (leftSize/2)}px`,
      top: `${18 - (leftSize/2)}px`,
      width: `${leftSize}px`,
      height: `${leftSize}px`
    }

    const rightSize = baseWidth * playedPercentage
    this.rightTapeStyle = {
      right: `-${21 + (rightSize/2)}px`,
      top: `${18 - (rightSize/2)}px`,
      width: `${rightSize}px`,
      height: `${rightSize}px`
    }
  }

}
