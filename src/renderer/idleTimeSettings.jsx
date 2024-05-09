/* eslint-disable import/prefer-default-export */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function IdleTimeSettings() {
  const resetTimerEnabledInStore = window.electron.store.get(
    'reset_timer_enabled',
  );
  const [resetTimerEnabled, setResetTimerEnabled] = useState(
    resetTimerEnabledInStore,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Idle time</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Pause timer after 1 min of inactivity</span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div> */}
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="reset_timer_enabled"
            className="flex flex-col space-y-1"
          >
            <span>Reset timer after 5 min of inactivity</span>
          </Label>
          <Switch
            id="reset_timer_enabled"
            key="reset_timer_enabled"
            checked={resetTimerEnabled}
            onCheckedChange={(checked) => {
              setResetTimerEnabled(checked);
              window.electron.store.set('reset_timer_enabled', checked);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
