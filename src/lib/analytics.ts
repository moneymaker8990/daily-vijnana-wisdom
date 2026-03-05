type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

type AnalyticsEvent = {
  event: string;
  props: AnalyticsProps;
  ts: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, props?: AnalyticsProps) => void;
    };
  }
}

const MAX_QUEUE = 500;
const QUEUE_KEY = 'mindvanta_analytics_queue';

function readQueue(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: AnalyticsEvent[]): void {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE)));
}

function enqueue(event: AnalyticsEvent): void {
  const queue = readQueue();
  queue.push(event);
  writeQueue(queue);
}

export function track(eventName: string, props: AnalyticsProps = {}): void {
  const payload: AnalyticsEvent = {
    event: eventName,
    props: {
      ...props,
      app_version: import.meta.env.VITE_APP_VERSION ?? 'unknown',
      env: import.meta.env.MODE,
    },
    ts: new Date().toISOString(),
  };

  enqueue(payload);

  if (window.posthog?.capture) {
    window.posthog.capture(eventName, payload.props);
  }

  if (window.gtag) {
    window.gtag('event', eventName, payload.props);
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', payload.event, payload.props);
  }
}

export function getAnalyticsQueueSnapshot(): AnalyticsEvent[] {
  return readQueue();
}
