export interface BannerProps {
  heading: string;
  message: string;
  ctaLabel: string;
  ctaUrl: string;
  backgroundColor: string;
  textColor: string;
  layout: 'centered' | 'left-aligned' | 'split';
  showDismiss: boolean;
}

export function getStyles(props: BannerProps): string {
  const alignment = props.layout === 'centered' ? 'center' : 'flex-start';

  return `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
    }

    .banner {
      display: flex;
      align-items: center;
      justify-content: ${alignment};
      padding: 2rem 2.5rem;
      background-color: ${props.backgroundColor};
      color: ${props.textColor};
      border-radius: 8px;
      position: relative;
      gap: 1.5rem;
      ${props.layout === 'split' ? 'flex-direction: row;' : 'flex-direction: column;'}
    }

    .banner--hidden {
      display: none;
    }

    .banner__content {
      flex: 1;
      text-align: ${props.layout === 'centered' ? 'center' : 'left'};
    }

    .banner__heading {
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.3;
      color: inherit;
    }

    .banner__message {
      margin: 0 0 1.25rem 0;
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
      color: inherit;
    }

    .banner__cta {
      display: inline-block;
      padding: 0.625rem 1.5rem;
      background-color: ${props.textColor};
      color: ${props.backgroundColor};
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.9375rem;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .banner__cta:hover {
      opacity: 0.85;
    }

    .banner__dismiss {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: none;
      border: none;
      color: ${props.textColor};
      font-size: 1.25rem;
      cursor: pointer;
      opacity: 0.7;
      padding: 0.25rem;
      line-height: 1;
      transition: opacity 0.2s ease;
    }

    .banner__dismiss:hover {
      opacity: 1;
    }
  `;
}
