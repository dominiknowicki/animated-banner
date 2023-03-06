import { newSpecPage } from '@stencil/core/testing';
import { AnimatedBannerComponent } from './animated-banner-component';

describe('animated-banner-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [AnimatedBannerComponent],
      html: '<animated-banner-component></animated-banner-component>',
    });
    expect(root).toEqualHtml(`
      <animated-banner-component>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </animated-banner-component>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [AnimatedBannerComponent],
      html: `<animated-banner-component first="Stencil" last="'Don't call me a framework' JS"></animated-banner-component>`,
    });
    expect(root).toEqualHtml(`
      <animated-banner-component first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </animated-banner-component>
    `);
  });
});
