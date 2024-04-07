import { Howl } from 'howler'

declare module 'howler' {
  interface Howl {
    changeSong(o: any): void
    _duration: number
    _sprite: any
    _src: any
    _format: any
  }
}
