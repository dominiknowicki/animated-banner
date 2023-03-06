import {Component, Prop, h, Element} from '@stencil/core'
import {Animator} from "../../utils/Animator"

@Component({
  tag: 'animated-banner-component',
  styleUrl: 'animated-banner-component.css',
  shadow: true,
})
export class AnimatedBannerComponent {

  @Element() el: HTMLElement;
  @Prop() text: string;
  @Prop() fontSize: number;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() color: string;
  @Prop() background: string;
  @Prop() loop: boolean;

  private canvas: HTMLCanvasElement

  render(): string {
    return <canvas id="canvas" ref={(el) => this.canvas = el} ></canvas>;
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
    const animator = new Animator(this.canvas, params)
    animator.animate()
  }
}
