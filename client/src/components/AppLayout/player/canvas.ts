import { Howl } from 'howler'

type styleDeclaration = Partial<CSSStyleDeclaration> & { [propName: string]: string }

class Canvas {
  readonly canvas: HTMLCanvasElement
  readonly canvasCtx: CanvasRenderingContext2D
  readonly container: HTMLElement
  readonly progress: HTMLDivElement
  readonly howler: Howl

  constructor(container: HTMLElement, howler: Howl) {
    this.container = container

    this.howler = howler

    const c = document.createElement('canvas')
    c.height = 30

    this.styleEl(c, {
      width: '100%',
      backgroundColor: '#000'
    })
    this.canvas = c

    c.addEventListener('click', (e) => {
      const x = Math.round(this.howler.duration() * (e.offsetX / c.clientWidth))
      console.log('seek to', x)

      this.howler.seek(x)
    })

    const progressEl = document.createElement('div')
    this.styleEl(progressEl, {
      width: '100%',
      backgroundColor: 'lime'
    })

    this.progress = progressEl
    this.container.appendChild(progressEl)

    this.progress.appendChild(this.canvas)

    this.canvasCtx = c.getContext('2d') as CanvasRenderingContext2D
  }

  private styleEl(el: HTMLElement, styles: styleDeclaration) {
    for (const prop in styles) {
      ;(el.style as styleDeclaration)[prop] = styles[prop]
    }
  }
}

export default Canvas
