import { createRoot } from 'react-dom/client';
import mixpanel from 'mixpanel-browser';
import App from './App';

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
