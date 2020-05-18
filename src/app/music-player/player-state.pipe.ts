import { Pipe, PipeTransform } from '@angular/core';
import { PlayerState } from '../cassette-tape/cassette-tape.component'

@Pipe({
  name: 'playerState'
})
export class PlayerStatePipe implements PipeTransform {

  transform(value: PlayerState, ...args: unknown[]): string {
    switch (value) {
      case 'play':
        return 'PL AY'
      case 'fast-rewind':
        return 'FR'
      case 'fast-forward':
        return 'FF'
      case 'stop':
        return 'ST OP'
    }
    return '';
  }

}
