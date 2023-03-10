import {Component, Prop, h, Element} from '@stencil/core'

@Component({
  tag: 'animated-banner-component',
  styleUrl: 'animated-banner-component.css',
  shadow: true,
})
export class AnimatedBannerComponent {

  @Element() el: HTMLElement
  @Prop({ mutable: true }) text: string = 'Hello'
  @Prop({ mutable: true }) fontSize: number = 20
  @Prop({ mutable: true }) color: string = 'black'
  @Prop({ mutable: true }) background: string = 'transparent'
  @Prop({ mutable: true }) width: number = 400
  @Prop({ mutable: true }) height: number = 200
  @Prop({ mutable: true }) loop: boolean = false
  @Prop({ mutable: true }) animation: string = 'slide-in-from-left'

  private canvas: HTMLCanvasElement

  render(): string {
    return <canvas id="canvas" ref={(el) => this.canvas = el}></canvas>
  }

  componentDidLoad(): void {
    this.canvas.style.background = this.background
    this.canvas.style.height = `${this.height}px`
    const params = {
      text: this.text,
      color: this.color,
      fontSize: this.fontSize,
      loop: this.loop
    }

    console.log('AnimatedBannerComponent - attempt to start animation:', this.animation)
    window.dispatchEvent(new CustomEvent(this.animation, {
      detail: {
        canvas: this.canvas, params
      }
    }))
  }
}
