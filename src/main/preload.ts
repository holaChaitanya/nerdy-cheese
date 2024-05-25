// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  nativeImage,
} from 'electron';

import { Titlebar, TitlebarColor } from 'custom-electron-titlebar';
import { imgData } from '../constants';

window.addEventListener('DOMContentLoaded', (e) => {
  // Title bar implementation

  if (e?.target?.location?.search !== '?break') {
    const t = new Titlebar({
      backgroundColor: TitlebarColor.BLACK,
      icon: nativeImage.createFromDataURL(imgData),
      iconSize: 20,
      maximizable: false,
    });
  }
});

export type Channels =
  | 'ipc-example'
  | 'start-session'
  | 'skip-break'
  | 'take-break-now'
  | 'pause-session'
  | 'skip-break';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
