import { Howl } from 'howler'
import Canvas from './canvas'

interface Options {
  src: string
  node: HTMLElement
}

// Info: why is instance prototype expanded
// https://github.com/goldfire/howler.js/issues/825
Howl.prototype.changeSong = function (o) {
  this.unload()
  this._duration = 0 // init duration
  this._sprite = {} // init sprite
  this._src = typeof o.src !== 'string' ? o.src : [o.src]

  this._format = typeof o.format !== 'string' ? o.format : [o.format]
  this.load() // => update duration, sprite(var timeout)
}

class AudioPlayer {
  isPlay: boolean
  private audioProcessInterval: any
  readonly howler: Howl
  private canvas: Canvas

  constructor(props: Options) {
    this.isPlay = false
    this.audioProcessInterval = null

    this.howler = new Howl({
      src: '_',
      html5: true,
      format: 'mp3',
      xhr: {
        method: 'GET'
      }
    })

    this.canvas = new Canvas(props.node, this.howler)
  }

  public play() {
    this.howler.play()
    this.isPlay = true
  }

  public playPause() {
    if (this.isPlay) {
      this.isPlay = false
      this.howler.pause()
    } else {
      this.isPlay = true
      this.howler.play()
    }
  }

  public getCurrentTime(): number {
    return this.howler.seek()
  }

  public onAudioProcess(callback: () => void) {
    this.audioProcessInterval = setInterval(() => {
      if (this.isPlay) {
        callback()
      }
    }, 1000)
  }

  // if src changed it triggers AbortController automatically
  public load(src: string) {
    this.howler.changeSong({ src })
  }

  public onLoad(callback: () => void) {
    this.howler.on('load', callback)
  }

  public onEnd(callback: () => void) {
    this.howler.on('end', callback)
  }

  public clean() {
    clearInterval(this.audioProcessInterval)
  }
}

export default AudioPlayer
