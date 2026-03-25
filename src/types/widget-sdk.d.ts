/**
 * Type definitions for the InSided Widget SDK.
 * The SDK is injected at runtime by the <third-party-widget-element> host.
 */

export interface WidgetSDK {
  /** Wait for the widget to be fully initialized */
  whenReady(): Promise<WidgetSDK>;

  /** Read the current configuration props */
  getProps<T = Record<string, unknown>>(): T;

  /** Update props programmatically */
  setProps(props: Record<string, unknown>): void;

  /** Get the Shadow DOM container to render into */
  getContainer(): HTMLElement;

  /** Scoped querySelector within the shadow root */
  $(selector: string): HTMLElement | null;

  /** Scoped querySelectorAll within the shadow root */
  $$(selector: string): NodeListOf<HTMLElement>;

  /** Scoped document proxy confined to the shadow root */
  document: DocumentFragment;

  /** Subscribe to SDK events */
  on(event: 'propsChanged', callback: (newProps: Record<string, unknown>) => void): void;
  on(event: 'destroy', callback: () => void): void;
  on(event: string, callback: (...args: unknown[]) => void): void;

  /** Unsubscribe from SDK events */
  off(event: string, callback: (...args: unknown[]) => void): void;

  /** Emit custom events to the host */
  emit(event: string, data?: unknown): void;

  /** Signal that the widget is ready */
  widgetReady(): void;
}

/** Global function available inside the widget element scope */
declare function getCurrentWidgetSDK(): WidgetSDK;
