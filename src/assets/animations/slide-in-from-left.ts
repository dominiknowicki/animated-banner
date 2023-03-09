import {AnimatorParams} from "../../models/AnimatorParams"
import {AnimatorInterface} from "../../models/AnimatorInterface"

window.addEventListener("slide-in-from-left", (event: CustomEvent) => {
  abSlideInFromLeft(event.detail.canvas, event.detail.params)
  console.log('Animation started: slide-in-from-left')
})
console.log('Animation registered: slide-in-from-left')

export function abSlideInFromLeft(canvas: HTMLCanvasElement, params: AnimatorParams) {
  const animator = new ABSlideInFromLeft(canvas, params)
  animator.animate()
}

class ABSlideInFromLeft implements AnimatorInterface {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private text
  private color
  private fontSize
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
    this.textX = -this.canvas.clientWidth
    this.textY = (this.canvas.height + this.fontSize) / 2
    this.canvasWidth = this.canvas.clientWidth
    this.canvasHeight = this.canvas.clientHeight
    console.log('textX', this.textX)
  }

  public animate(): void {
    this.drawText()
    this.runAnimation()
  }

  private drawText(): void {
    this.ctx.font = "" + this.fontSize + "px Arial"
    this.ctx.fillStyle = this.color
    this.ctx.fillText(this.text, this.textX, this.textY)
  }

  private runAnimation(): void {
    if (this.textX < 0) {
      console.log('text', this.textX)
      requestAnimationFrame(this.nextFrame.bind(this))
    }
  }

  private nextFrame(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.textX += 2
    this.drawText()
    this.runAnimation()
  }
}

