/* eslint-disable import/prefer-default-export */

import { useState } from 'react';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function StartupSettings() {
  const launchAtLoginInStore = window.electron.store.get('launch_at_login');
  const startTimerInStore = window.electron.store.get('start_timer');

  const [launchAtLogin, setLaunchAtLogin] = useState(launchAtLoginInStore);
  const [startTimer, setStartTimer] = useState(startTimerInStore);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="launch_at_login" className="flex flex-col space-y-1">
          <span>Launch at login</span>
        </Label>
        <Switch
          id="launch_at_login"
          key="launch_at_login"
          checked={launchAtLogin}
          onCheckedChange={(checked) => {
            setLaunchAtLogin(checked);
            window.electron.store.set('launch_at_login', checked);
          }}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="start_timer" className="flex flex-col space-y-1">
          <span>Start timer automatically on launch</span>
        </Label>
        <Switch
          id="start_timer"
          key="start_timer"
          checked={startTimer}
          onCheckedChange={(checked) => {
            setStartTimer(checked);
            window.electron.store.set('start_timer', checked);
          }}
        />
      </div>
    </div>
  );
}
