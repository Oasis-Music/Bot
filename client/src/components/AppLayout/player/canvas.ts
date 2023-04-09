import { Howl } from 'howler'

type styleDeclaration = Partial<CSSStyleDeclaration> & { [propName: string]: string }

class Canvas {
  readonly howler: Howl
  readonly container: HTMLElement
  readonly progressWrapper: HTMLDivElement

  readonly progressCanvas: HTMLCanvasElement
  readonly progressCanvasCtx: CanvasRenderingContext2D

  readonly waveCanvas: HTMLCanvasElement
  readonly waveCanvasCtx: CanvasRenderingContext2D

  containerClickHandler: (e: MouseEvent) => void

  constructor(container: HTMLElement, howler: Howl) {
    this.container = container
    this.howler = howler
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

    this.drawWaveBars()
    this.drawProgressBars()
  }

  private handleContainerClick(e: MouseEvent) {
    const offset = Math.round(this.howler.duration() * (e.offsetX / this.container.offsetWidth))
    console.log('play from:', offset, this.howler.playing())

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
    const barWidth = 4
    const barGap = 4
    const barCount = this.progressCanvas.width / (barWidth + barGap - barGap)

    let x = 0

    for (let i = 0; i < barCount; i++) {
      const barHeight = 20

      const y = this.progressCanvas.height / 2 - barHeight / 2

      this.drawRoundedRect(ctx, x, y, barWidth, barHeight, 2, color)

      x += barWidth + barGap
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

  public clearEventListeners() {
    this.container.removeEventListener('click', this.containerClickHandler)
  }
}

export default Canvas
