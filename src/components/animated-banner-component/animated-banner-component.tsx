import {Component, Prop, h, Element} from '@stencil/core'

@Component({
  tag: 'animated-banner-component',
  styleUrl: 'animated-banner-component.css',
  shadow: true,
})
export class AnimatedBannerComponent {

  @Element() el: HTMLElement
  @Prop() text: string
  @Prop() fontSize: number
  @Prop() width: number
  @Prop() height: number
  @Prop() color: string
  @Prop() background: string
  @Prop() loop: boolean
  @Prop() animation: string

  private canvas: HTMLCanvasElement
  private default = {
    background: 'transparent',
    height: 200,
    color: 'black',
    text: 'Hello form Animated Banner!',
    fontSize: 20,
  }

  render(): string {
    return <canvas id="canvas" ref={(el) => this.canvas = el}></canvas>
  }

  componentDidLoad(): void {
    this.canvas.style.background = this.background || this.default.background
    this.canvas.style.height = `${this.height || this.default.height}px`
    const params = {
      text: this.text || this.default.text,
      color: this.color || this.default.text,
      fontSize: this.fontSize || this.default.text,
      loop: this.loop || false
    }

    console.log('AnimatedBannerComponent - attempt to start animation:', this.animation)
    window.dispatchEvent(new CustomEvent(this.animation, {
      detail: {
        canvas: this.canvas, params
      }
    }))
  }
}
