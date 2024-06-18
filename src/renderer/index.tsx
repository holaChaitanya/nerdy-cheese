import { createRoot } from 'react-dom/client';
import mixpanel from 'mixpanel-browser';
import * as Sentry from '@sentry/electron/renderer';
import { init as reactInit } from '@sentry/react';
import App from './App';

Sentry.init(
  {
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  },
  reactInit,
);

mixpanel.init('fb10e8ad642b8be1d8f8f57f13b28d92', {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
