import {AnimatorParams} from "../../models/AnimatorParams"
import {AnimatorInterface} from "../../models/AnimatorInterface"

window.addEventListener('slide-right', (event: CustomEvent) => {
  abSlideRight(event.detail.canvas, event.detail.params)
  console.log('Animation started: slide-right')
})
console.log('Animation registered: slide-right')

export function abSlideRight(canvas: HTMLCanvasElement, params: AnimatorParams) {
  const animator = new ABSlideRight(canvas, params)
  animator.animate()
}

class ABSlideRight implements AnimatorInterface {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private text
  private color
  private fontSize
  private loop
  private textX = 0
  private textY = 0
  private canvasWidth: number = 0
  private canvasHeight: number = 0

  constructor(canvas: HTMLCanvasElement, params: AnimatorParams) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.text = params.text
    this.color = params.color
    this.fontSize = params.fontSize
    this.loop = params.loop
    this.textY = (this.canvas.height + this.fontSize) / 2
    this.canvasWidth = this.canvas.clientWidth
    this.canvasHeight = this.canvas.clientHeight
  }

  public animate(): void {
    this.drawText()
    this.runAnimation()
  }

  private drawText(): void {
    this.ctx.font = `${this.fontSize}px Arial`
    this.ctx.fillStyle = this.color
    this.ctx.fillText(this.text, this.textX, this.textY)
  }

  private runAnimation(): void {
    if (this.textX < this.canvasWidth) {
      requestAnimationFrame(this.nextFrame.bind(this))
    } else if (this.loop) {
      this.textX = 0
      this.runAnimation()
    }
  }

  private nextFrame(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.textX += 2
    this.drawText()
    this.runAnimation()
  }
}

