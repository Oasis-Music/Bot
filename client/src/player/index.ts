import { Howl } from 'howler'
import Canvas from './canvas'

interface Options {
  src?: string
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
  private isPlay: boolean //  it's internal play state because howler.seek() automatically pause playback after call
  private audioProcessInterval: unknown
  private readonly howler: Howl
  private canvas: Canvas

  constructor(props: Options) {
    this.isPlay = false
    this.audioProcessInterval = null

    const howler = new Howl({
      src: props.src ? props.src : '_',
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

  public setLoop(v: boolean) {
    this.howler.loop(v)
  }

  public isPlaying(): boolean {
    return this.isPlay
  }

  public getDuration(): number {
    return this.howler.duration()
  }

  public getLoop(): boolean {
    return this.howler.loop()
  }

  public seekTo(n: number) {
    this.howler.seek(n)
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

  public onSeek(callback: () => void) {
    this.howler.on('seek', () => {
      callback()
    })
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
    this.howler.stop()
    clearInterval(this.audioProcessInterval as number)
    this.howler.off()
    this.canvas.clearEventListeners()
  }

  private animate() {
    this.canvas.drawProgress()
    if (this.isPlay) {
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  public redrawTrackline() {
    this.canvas.regenerateWaves()
  }
}

export default AudioPlayer
