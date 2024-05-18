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
  screen,
} from 'electron';
import Store from 'electron-store';
import { resolveHtmlPath, getReadableTime } from './util';
import {
  BREAK_NOTIFICATION_AT,
  DEFAULT_INTERVAL_DURATION,
  TIMER_STYLE,
} from './constants';
import { imgData } from '../constants';

type Schema = {
  session: {
    type: 'object';
    properties: {
      endTime: { type: 'string' };
      startTime: { type: 'string' };
      remainingTime: { type: 'string' };
      paused: { type: 'boolean' };
      pausedAt: { type: 'string' };
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
  pre_break_reminder_enabled: {
    type: 'boolean';
  };
  pre_break_reminder_at: {
    type: 'number';
  };
  reset_timer_enabled: {
    type: 'boolean';
  };
  toolbar_timer_style: {
    type: 'string';
  };
  long_break_enabled: {
    type: 'boolean';
  };
  long_break_duration: {
    type: 'number';
  };
  long_break_after: {
    type: 'number';
  };
  short_break_count: {
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
      pausedAt: { type: 'string' },
    },
  },
  launch_at_login: { type: 'boolean' },
  start_timer: { type: 'boolean' },
  session_duration: { type: 'number' },
  break_duration: { type: 'number' },
  pre_break_reminder_enabled: { type: 'boolean' },
  pre_break_reminder_at: { type: 'number' },
  reset_timer_enabled: { type: 'boolean' },
  toolbar_timer_style: { type: 'string' },
  long_break_enabled: { type: 'boolean' },
  long_break_duration: { type: 'number' },
  long_break_after: { type: 'number' },
  short_break_count: { type: 'number' },
} as Schema;

const store = new Store({
  schema,
  defaults: {
    session: {},
    launch_at_login: false,
    start_timer: false,
    session_duration: 1500,
    break_duration: 30,
    pre_break_reminder_enabled: true,
    pre_break_reminder_at: 60,
    reset_timer_enabled: true,
    toolbar_timer_style: TIMER_STYLE.elapsed,
    long_break_enabled: true,
    long_break_duration: 120,
    long_break_after: 2,
    short_break_count: 0,
  },
});

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

  const longBreakEnabled = store.get('long_break_enabled') as boolean;
  const longBreakAfter = store.get('long_break_after') as number;
  const shortBreakCount = store.get('short_break_count') as number;

  const isThisLongBreak = longBreakEnabled
    ? shortBreakCount === longBreakAfter
    : false;

  if (isThisLongBreak) {
    store.set('short_break_count', 0);
  } else {
    store.set('short_break_count', shortBreakCount + 1);
  }

  const displays = screen.getAllDisplays();
  displays.forEach((display) => {
    const { x, y } = display.bounds;

    mainWindow = new BrowserWindow({
      title: 'break',
      show: false,
      width: 1024,
      height: 728,
      fullscreen: true,
      frame: false,
      x,
      y,
      kiosk: true,
      // icon: getAssetPath('icon.png'),
      icon: nativeImage.createFromDataURL(imgData),
      webPreferences: {
        devTools: false,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    mainWindow.loadURL(
      resolveHtmlPath('index.html', isThisLongBreak ? 'long-break' : 'break'),
    );

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
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  // mainWindow.webContents.setWindowOpenHandler((edata) => {
  //   shell.openExternal(edata.url);
  //   return { action: 'deny' };
  // });
};

const createSettingsWindow = async () => {
  if (settingsWindow) {
    // If a Settings window is already open, bring it to focus
    settingsWindow.focus();
    settingsWindow.show();

    return;
  }

  if (isDebug) {
    await installExtensions();
  }

  settingsWindow = new BrowserWindow({
    title: 'settings',
    show: true,
    width: 1024,
    height: 728,
    fullscreen: false,
    frame: true,
    resizable: false,
    icon: nativeImage.createFromDataURL(imgData),
    webPreferences: {
      devTools: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  settingsWindow.loadURL(resolveHtmlPath('index.html', 'settings'));

  // eslint-disable-next-line promise/catch-or-return
  app.dock.show().then(() => {
    app.dock.setIcon(nativeImage.createFromDataURL(imgData));
  });

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
    app.dock.hide();
    settingsWindow = null;
  });

  // const menuBuilder = new MenuBuilder(settingsWindow);
  // menuBuilder.buildMenu();

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
  pausedAt: string;
}

let tray: Tray | null = null;

let trayMenu: any;

function startSession({
  additionalTimeInSeconds,
  reset,
}: {
  additionalTimeInSeconds?: number;
  reset?: boolean;
}) {
  let sessionDuration = DEFAULT_INTERVAL_DURATION * 1000; // in ms

  const { endTime: prevEndTime, remainingTime } = store.get(
    'session',
  ) as Session;

  const session_duration = store.get('session_duration') as number;

  if (session_duration) {
    sessionDuration = session_duration * 1000;
  }

  let finalDuration = sessionDuration;

  if (reset) {
    store.set('session', {
      ...(store.get('session') as Session),
      remainingTime: undefined,
    });
  } else if (remainingTime) {
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
    // const idleState = powerMonitor.getSystemIdleState(5);
    // const idleTime = powerMonitor.getSystemIdleTime();

    // console.log({ idleState, idleTime });

    const { endTime: currEndTime } = store.get('session') as Session;
    const remaining = new Date(currEndTime).getTime() - Date.now();

    const remainingInMins = Math.floor(remaining / (1000 * 60));
    const remainingInSecs = Math.floor(remaining / 1000);

    if (remainingInMins <= 0) {
      trayMenu[2].label = 'Break in less than a minute';
    } else {
      trayMenu[2].label = `Your break begins in ${remainingInMins} min`;
    }

    const preBreakReminderEnabled = store.get('pre_break_reminder_enabled');
    const preBreakReminderAt = store.get('pre_break_reminder_at') as number;

    let breakNotificationAt = BREAK_NOTIFICATION_AT;
    if (preBreakReminderEnabled && preBreakReminderAt) {
      breakNotificationAt = preBreakReminderAt;
    }

    if (
      preBreakReminderEnabled &&
      Math.floor(remaining / 1000) === breakNotificationAt
    ) {
      new Notification({
        icon: nativeImage.createFromDataURL(imgData),
        title: `Only ${
          breakNotificationAt / 60 > 1
            ? breakNotificationAt / 60
            : 'less than a'
        } min left`,
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

      const elapsedInSeconds = Math.floor(elapsed / 1000);

      if (remaining <= 0) {
        tray.setTitle('');
      } else {
        // bug here - this will also include the duration for which a session has been paused
        const showElapsedTime =
          store.get('toolbar_timer_style') === TIMER_STYLE.elapsed;

        tray.setTitle(
          `${getReadableTime(
            showElapsedTime ? elapsedInSeconds : remainingInSecs,
          )} ${showElapsedTime ? 'elapsed' : 'left'}`,
          { fontType: 'monospacedDigit' },
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
    paused: true,
    pausedAt: new Date(Date.now()).toISOString(),
  });

  trayMenu[2].visible = false;
  trayMenu[0].visible = true;
  trayMenu[0].label = 'Resume the session';

  const contextMenu = Menu.buildFromTemplate(trayMenu);
  if (tray) {
    // const { startTime: currStartTime } = store.get('session') as Session;
    // const startTime = new Date(currStartTime).getTime();
    // const elapsed = Date.now() - startTime;

    tray.setContextMenu(contextMenu);
    tray.setTitle(`Session paused`, {
      fontType: 'monospacedDigit',
    });
  }
}

function takeBreakNow() {
  trayMenu[0].visible = true;
  trayMenu[2].visible = false;
  clearInterval(sessionTimer!);
  sessionTimer = null;

  shell.beep();

  const contextMenu = Menu.buildFromTemplate(trayMenu);
  if (tray) {
    tray.setContextMenu(contextMenu);
    tray.setTitle('');
  }

  createWindow();
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
      {
        label: 'Start this break now',
        type: 'normal',
        click: () => takeBreakNow(),
      },
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
          startSession({
            additionalTimeInSeconds:
              (store.get('session_duration') as number) ||
              DEFAULT_INTERVAL_DURATION,
          }),
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
  tray.setToolTip('Take a Break');
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

app.dock.hide();

app
  .whenReady()
  .then(() => {
    createTray();
    if (store.get('start_timer')) {
      startSession({});
    }
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null && tray === null) {
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
  const { paused: wasSessionPaused } = store.get('session') as Session;

  const { pausedAt } = store.get('session') as Session;
  let pausedSinceInSecs = 0;
  if (pausedAt) {
    pausedSinceInSecs = (Date.now() - new Date(pausedAt).getTime()) / 1000;
  }

  if (wasSessionPaused) {
    store.set('session', {
      ...(store.get('session') as Session),
      pausedAt: undefined,
    });
  }

  if (wasSessionPaused) {
    if (pausedSinceInSecs < 5 * 60) {
      startSession({});
    } else {
      startSession({ reset: true });
      store.set('short_break_count', 0);
    }
  }
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

ipcMain.on('skip-break', async () => {
  let res: any = [];
  if (mainWindow) {
    res = BrowserWindow.getAllWindows();
    res = res.filter(({ title }: { title: string }) => title !== 'break');
    // todo: bug here which closes all the window and not just the break window
    res.forEach((win: any) => win.close());
  }
});
