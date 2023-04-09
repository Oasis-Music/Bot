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
  isPlay: boolean // there is internal play state because howler.seek() automatically pause playback after call
  private audioProcessInterval: any
  readonly howler: Howl
  private canvas: Canvas

  constructor(props: Options) {
    this.isPlay = false
    this.audioProcessInterval = null

    const howler = new Howl({
      src: '_',
      html5: true,
      format: 'mp3',
      xhr: {
        method: 'GET'
      }
    })

    howler.on('play', () => {
      requestAnimationFrame(this.animate.bind(this))
    })
    this.howler = howler

    this.canvas = new Canvas(props.node, this.howler)
    this.canvas.init()
  }

  public play() {
    this.isPlay = true
    this.howler.play()
  }

  public pause() {
    this.isPlay = false
    this.howler.pause()
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
      if (this.howler.playing()) {
        callback()
      }
    }, 1000)
  }

  /* If src changed it triggers AbortController automatically */
  public load(src: string) {
    this.howler.changeSong({ src })
  }

  public onLoad(callback: () => void) {
    this.howler.on('load', callback)
  }

  public onEnd(callback: () => void) {
    this.howler.on('end', () => {
      if (this.howler.loop()) {
        this.isPlay = true
      } else {
        this.isPlay = false
      }
      callback()
    })
  }

  public clean() {
    clearInterval(this.audioProcessInterval)
  }

  private animate() {
    this.canvas.drawProgress()
    if (this.isPlay) {
      requestAnimationFrame(this.animate.bind(this))
    }
  }
}

export default AudioPlayer
