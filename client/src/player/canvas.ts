import { Howl } from 'howler'

type styleDeclaration = Partial<CSSStyleDeclaration> & { [propName: string]: string }

function getRandomBarHeight(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Canvas {
  readonly howler: Howl
  readonly container: HTMLElement
  readonly progressWrapper: HTMLDivElement
  readonly barWidth: number
  readonly barGap: number

  readonly progressCanvas: HTMLCanvasElement
  readonly progressCanvasCtx: CanvasRenderingContext2D

  readonly waveCanvas: HTMLCanvasElement
  readonly waveCanvasCtx: CanvasRenderingContext2D

  private bars: number[]

  containerClickHandler: (e: MouseEvent) => void

  constructor(container: HTMLElement, howler: Howl) {
    this.container = container
    this.howler = howler
    this.bars = []

    this.barWidth = 4
    this.barGap = 4

    this.containerClickHandler = () => {
      return
    }

    this.progressWrapper = document.createElement('div')

    const progressCanvas = document.createElement('canvas')
    progressCanvas.height = 30
    this.progressCanvas = progressCanvas
    this.progressCanvasCtx = this.progressCanvas.getContext('2d') as CanvasRenderingContext2D

    const waveCanvas = document.createElement('canvas')
    waveCanvas.height = 30
    this.waveCanvas = waveCanvas
    this.waveCanvasCtx = waveCanvas.getContext('2d') as CanvasRenderingContext2D
  }

  init() {
    this.styleEl(this.container, {
      position: 'relative',
      height: '30px'
    })

    this.styleEl(this.progressWrapper, {
      position: 'absolute',
      zIndex: '4',
      width: '0px',
      overflow: 'hidden'
    })

    this.styleEl(this.progressCanvas, {
      backgroundColor: 'transparent'
    })

    this.styleEl(this.waveCanvas, {
      zIndex: '3',
      position: 'absolute',
      top: '0px'
    })

    this.container.appendChild(this.progressWrapper)
    this.progressCanvas.width = this.container.offsetWidth
    this.progressWrapper.appendChild(this.progressCanvas)

    this.waveCanvas.width = this.container.offsetWidth
    this.container.appendChild(this.waveCanvas)

    this.containerClickHandler = this.handleContainerClick.bind(this)
    this.container.addEventListener('click', this.containerClickHandler)

    this.generateBars()
    this.drawWaveBars()
    this.drawProgressBars()
  }

  private handleContainerClick(e: MouseEvent) {
    const offset = Math.round(this.howler.duration() * (e.offsetX / this.container.offsetWidth))
    // console.log('play from:', offset, this.howler.playing())

    this.howler.seek(offset)

    if (!this.howler.playing()) {
      this.drawProgress()
    }
  }

  private styleEl(el: HTMLElement, styles: styleDeclaration) {
    for (const prop in styles) {
      ;(el.style as styleDeclaration)[prop] = styles[prop]
    }
  }

  drawProgress() {
    const seek = this.howler.seek() || 0
    const progressWidth = (seek / this.howler.duration()) * 100 || 0
    // console.log('%canimate() -' + ` %c${progressWidth}%`, 'color:lime', 'color:white')

    this.progressWrapper.style.width = progressWidth + '%'
  }

  drawBars(ctx: CanvasRenderingContext2D, color: string) {
    if (!this.bars.length) return

    let x = 0

    const bars = this.bars

    for (let i = 0; i < bars.length; i++) {
      const barHeight = bars[i]

      const y = this.progressCanvas.height / 2 - barHeight / 2

      this.drawRoundedRect(ctx, x, y, this.barWidth, barHeight, 2, color)

      x += this.barWidth + this.barGap
    }
  }

  drawProgressBars() {
    this.drawBars(this.progressCanvasCtx, '#dbdbdb')
  }

  drawWaveBars() {
    this.drawBars(this.waveCanvasCtx, '#575763')
  }

  drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: string
  ) {
    ctx.fillStyle = color
    if (height === 0) return

    if (height < 0) {
      height *= -1
      y -= height
    }
    ctx.beginPath()

    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)

    ctx.closePath()
    ctx.fill()
  }

  generateBars() {
    const genBars = []

    const barCount = this.progressCanvas.width / (this.barWidth + this.barGap - this.barGap)

    for (let i = 0; i < barCount; i++) {
      const barHeight = getRandomBarHeight(15, 30)
      genBars.push(barHeight)
    }

    this.bars = genBars
  }

  regenerateWaves() {
    this.waveCanvasCtx.clearRect(0, 0, this.waveCanvas.width, this.waveCanvas.height)
    this.progressCanvasCtx.clearRect(0, 0, this.progressCanvas.width, this.progressCanvas.height)

    this.generateBars()

    this.drawWaveBars()
    this.drawProgressBars()
  }

  public clearEventListeners() {
    this.container.removeEventListener('click', this.containerClickHandler)
  }
}

export default Canvas
