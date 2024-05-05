/* eslint-disable camelcase */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
  Notification,
  powerMonitor,
} from 'electron';
import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { BREAK_NOTIFICATION_AT, DEFAULT_INTERVAL_DURATION } from './constants';

type Schema = {
  session: {
    type: 'object';
    properties: {
      endTime: { type: 'string' };
      startTime: { type: 'string' };
      remainingTime: { type: 'string' };
      paused: { type: 'boolean' };
    };
  };
  launch_at_login: {
    type: 'boolean';
  };
  start_timer: {
    type: 'boolean';
  };
  session_duration: {
    type: 'number';
  };
  break_duration: {
    type: 'number';
  };
};

const schema = {
  session: {
    type: 'object',
    properties: {
      endTime: { type: 'string' },
      startTime: { type: 'string' },
      remainingTime: { type: 'string' },
      paused: { type: 'boolean' },
    },
  },
  launch_at_login: { type: 'boolean' },
  start_timer: { type: 'boolean' },
  session_duration: { type: 'number' },
  break_duration: { type: 'number' },
} as Schema;

const store = new Store({
  schema,
  defaults: {
    session: {},
    launch_at_login: false,
    start_timer: false,
    session_duration: 1500,
    break_duration: 30,
  },
});

const imgData =
  'data:image/png;base64,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';

let mainWindow: BrowserWindow | null = null;

let settingsWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    fullscreen: true,
    frame: false,
    // icon: getAssetPath('icon.png'),
    icon: nativeImage.createFromDataURL(imgData),
    webPreferences: {
      devTools: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html', 'break'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const createSettingsWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  settingsWindow = new BrowserWindow({
    show: true,
    width: 1024,
    height: 728,
    fullscreen: false,
    frame: true,
    icon: nativeImage.createFromDataURL(imgData),
    webPreferences: {
      devTools: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  settingsWindow.loadURL(resolveHtmlPath('index.html', 'settings'));

  settingsWindow.on('ready-to-show', () => {
    if (!settingsWindow) {
      throw new Error('"settingsWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      settingsWindow.minimize();
    } else {
      settingsWindow.show();
    }
  });

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });

  const menuBuilder = new MenuBuilder(settingsWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  settingsWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

let sessionTimer: ReturnType<typeof setTimeout> | null = null;

interface Session {
  endTime: string;
  startTime: string;
  remainingTime: string;
  paused: boolean;
}

let tray: Tray | null = null;

let trayMenu: any;

function startSession({
  additionalTimeInSeconds,
}: {
  additionalTimeInSeconds?: number;
}) {
  // createWindow();

  let sessionDuration = DEFAULT_INTERVAL_DURATION * 1000; // in ms

  const { endTime: prevEndTime, remainingTime } = store.get(
    'session',
  ) as Session;

  const session_duration = store.get('session_duration') as number;

  if (session_duration) {
    sessionDuration = session_duration * 1000;
  }

  let finalDuration = sessionDuration;

  if (remainingTime) {
    if (!Number.isNaN(Number(remainingTime))) {
      finalDuration = Number(remainingTime);
      store.set('session', {
        ...(store.get('session') as Session),
        remainingTime: undefined,
      });
    }
  } else if (additionalTimeInSeconds && prevEndTime) {
    finalDuration =
      additionalTimeInSeconds * 1000 +
      new Date(prevEndTime).getTime() -
      Date.now();
  }

  const endTime = new Date(Date.now() + finalDuration).toISOString();

  store.set('session', {
    ...(store.get('session') as Session),
    endTime,
    paused: false,
  });

  if (!additionalTimeInSeconds) {
    console.log('setting start time');
    store.set('session', {
      ...(store.get('session') as Session),
      startTime: new Date(Date.now()).toISOString(),
    });
  }

  trayMenu[0].visible = false;
  trayMenu[2].visible = true;

  if (sessionTimer) {
    clearInterval(sessionTimer);
  }

  sessionTimer = setInterval(() => {
    const { endTime: currEndTime } = store.get('session') as Session;
    const remaining = new Date(currEndTime).getTime() - Date.now();

    const remainingInMins = Math.floor(remaining / (1000 * 60));

    if (remainingInMins <= 0) {
      trayMenu[2].label = 'Break in less than a minute';
    } else {
      trayMenu[2].label = `Your break begins in ${remainingInMins} min`;
    }

    if (Math.floor(remaining / 1000) === BREAK_NOTIFICATION_AT) {
      new Notification({
        icon: nativeImage.createFromDataURL(imgData),
        title: 'Only a min left',
        body: 'Get ready for a break!!',
      }).show();
    }

    if (remaining <= 0) {
      trayMenu[0].visible = true;
      trayMenu[2].visible = false;
      clearInterval(sessionTimer!);
      sessionTimer = null;

      shell.beep();
      createWindow();
    }

    const contextMenu = Menu.buildFromTemplate(trayMenu);
    if (tray) {
      const { startTime: currStartTime } = store.get('session') as Session;
      const startTime = new Date(currStartTime).getTime();
      const elapsed = Date.now() - startTime;

      if (remaining <= 0) {
        tray.setTitle('');
      } else {
        // bug here - this will also include the duration for which a session has been paused
        tray.setTitle(
          `Session active: ${Math.floor(elapsed / 1000)} seconds elapsed`,
        );
      }

      tray.setContextMenu(contextMenu);
    }
  }, 1000);

  const contextMenu = Menu.buildFromTemplate(trayMenu);
  if (tray) {
    tray.setContextMenu(contextMenu);
  }
}

function pauseSession() {
  if (sessionTimer) {
    clearInterval(sessionTimer);
    sessionTimer = null;
  }

  const { endTime: currEndTime } = store.get('session') as Session;
  const remaining = new Date(currEndTime).getTime() - Date.now();
  // store.set('remainingTime', remaining);
  store.set('session', {
    ...(store.get('session') as Session),
    remainingTime: remaining.toString(),
  });

  trayMenu[2].visible = false;
  trayMenu[0].visible = true;
  trayMenu[0].label = 'Resume the session';

  const contextMenu = Menu.buildFromTemplate(trayMenu);
  if (tray) {
    const { startTime: currStartTime } = store.get('session') as Session;
    const startTime = new Date(currStartTime).getTime();
    const elapsed = Date.now() - startTime;

    tray.setContextMenu(contextMenu);
    tray.setTitle(`Session paused at ${Math.floor(elapsed / 1000)} secs`);
  }
}

trayMenu = [
  {
    label: 'Start session',
    type: 'normal',
    click: () => startSession({}),
    visible: sessionTimer === null,
  },
  { label: 'Resume session', type: 'normal', visible: false },
  {
    label: `Your break begins in ...`,
    visible: sessionTimer !== null,
    type: 'submenu',
    submenu: Menu.buildFromTemplate([
      { label: 'Start this break now', type: 'normal' },
      { type: 'separator' },
      {
        label: 'Add 1 minute',
        type: 'normal',
        click: () => startSession({ additionalTimeInSeconds: 60 }),
      },
      {
        label: 'Add 5 minutes',
        type: 'normal',
        click: () => startSession({ additionalTimeInSeconds: 60 * 5 }),
      },
      { type: 'separator' },
      { label: 'Pause session', type: 'normal', click: () => pauseSession() },
      {
        label: 'Skip this break',
        type: 'normal',
        click: () =>
          startSession({ additionalTimeInSeconds: DEFAULT_INTERVAL_DURATION }),
      },
    ]),
  },
  { type: 'separator' },
  { label: 'Settings', type: 'normal', click: () => createSettingsWindow() },
  { type: 'separator' },
  { label: 'Quit', role: 'quit', type: 'normal', click: () => app.quit() },
];

const createTray = () => {
  const icon = nativeImage.createFromDataURL(imgData);
  tray = new Tray(icon.resize({ width: 16, height: 16 }));
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  tray.setToolTip('holaChaitanya');
  tray.setContextMenu(contextMenu);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.dock.setIcon(nativeImage.createFromDataURL(imgData));

app
  .whenReady()
  .then(() => {
    // createWindow();
    createTray();
    if (store.get('start_timer')) {
      startSession({});
    }
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null && tray === null) {
        // createWindow();
        createTray();
      }
    });
  })
  .catch(console.log);

powerMonitor.on('lock-screen', () => {
  if (sessionTimer) {
    pauseSession();
  }
});

powerMonitor.on('unlock-screen', () => {
  console.log('unlock...');

  startSession({});
});

// IPC Listeners
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (_, key, val) => {
  if (key === 'session_duration') {
    const prevSessionDuration = store.get('session_duration') as number;
    const diffInSecs = val - prevSessionDuration;
    if (diffInSecs > 0) {
      startSession({ additionalTimeInSeconds: diffInSecs });
    }
  }
  store.set(key, val);
  if (key === 'launch_at_login') {
    app.setLoginItemSettings({ openAtLogin: val });
  }
});

ipcMain.on('start-session', async () => {
  shell.beep();
  startSession({});
});
