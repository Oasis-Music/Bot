import { ITheme } from '../utils/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

declare module 'howler' {
  interface Howl {
    changeSong(o: any): void
    _duration: number
    _sprite: any
    _src: any
    _format: any
  }
}
