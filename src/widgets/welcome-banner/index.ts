import type { WidgetSDK } from '../../types/widget-sdk';
import { getStyles, type BannerProps } from './styles';

const DEFAULT_PROPS: BannerProps = {
  heading: 'Welcome to our Community!',
  message: 'Join the conversation, ask questions, and share your knowledge.',
  ctaLabel: 'Get Started',
  ctaUrl: '/getting-started',
  backgroundColor: '#4A90D9',
  textColor: '#FFFFFF',
  layout: 'centered',
  showDismiss: true,
};

function render(container: HTMLElement, props: BannerProps): void {
  const merged = { ...DEFAULT_PROPS, ...props };

  container.innerHTML = `
    <style>${getStyles(merged)}</style>
    <div class="banner" role="banner">
      ${merged.showDismiss ? '<button class="banner__dismiss" aria-label="Dismiss banner">&times;</button>' : ''}
      <div class="banner__content">
        <h2 class="banner__heading">${escapeHtml(merged.heading)}</h2>
        ${merged.message ? `<p class="banner__message">${escapeHtml(merged.message)}</p>` : ''}
        ${merged.ctaLabel ? `<a class="banner__cta" href="${escapeAttr(merged.ctaUrl)}">${escapeHtml(merged.ctaLabel)}</a>` : ''}
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Widget entry point — called automatically by the <third-party-widget-element>
 * when loaded as an ESM module.
 */
export async function init(sdk: WidgetSDK): Promise<void> {
  await sdk.whenReady();

  const container = sdk.getContainer();
  const props = sdk.getProps<BannerProps>();

  render(container, props);

  // Dismiss button handler
  const dismissBtn = sdk.$('.banner__dismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      const banner = sdk.$('.banner');
      if (banner) {
        banner.classList.add('banner--hidden');
      }
      sdk.emit('banner:dismissed', { widget: 'welcome_banner' });
    });
  }

  // CTA click tracking
  const ctaBtn = sdk.$('.banner__cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      sdk.emit('banner:cta-clicked', { url: props.ctaUrl });
    });
  }

  // React to config changes in real-time (e.g. from the widget configurator)
  sdk.on('propsChanged', (newProps: Record<string, unknown>) => {
    render(container, newProps as unknown as BannerProps);
  });

  // Cleanup on destroy
  sdk.on('destroy', () => {
    container.innerHTML = '';
  });
}
