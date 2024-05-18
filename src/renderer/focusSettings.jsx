/* eslint-disable import/prefer-default-export */

import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Switch } from './components/ui/switch';

export function FocusSettings() {
  const sessionDurationInStore = window.electron.store.get('session_duration');
  const resetTimerEnabledInStore = window.electron.store.get(
    'reset_timer_enabled',
  );
  const [sessionDuration, setSessionDuration] = useState(
    sessionDurationInStore,
  );
  const [resetTimerEnabled, setResetTimerEnabled] = useState(
    resetTimerEnabledInStore,
  );

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="necessary" className="flex flex-col">
          <span>Focus Duration</span>
          {/* <span className="font-normal leading-snug text-muted-foreground">
              This is how long you&apos;ll work before you&apos;re suggested a
              break. If you&apos;re in the middle of something, you can choose
              to delay it.
            </span> */}
        </Label>
        <Select
          value={sessionDuration}
          onValueChange={(val) => {
            setSessionDuration(val);
            window.electron.store.set('session_duration', val);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={900} value={900}>
                15 mins
              </SelectItem>
              <SelectItem key={1200} value={1200}>
                20 mins
              </SelectItem>
              <SelectItem key={1500} value={1500}>
                25 mins
              </SelectItem>
              <SelectItem key={1800} value={1800}>
                30 mins
              </SelectItem>
              <SelectItem key={2100} value={2100}>
                35 mins
              </SelectItem>
              <SelectItem key={2400} value={2400}>
                40 mins
              </SelectItem>
              <SelectItem key={2700} value={2700}>
                45 mins
              </SelectItem>
              <SelectItem key={3000} value={3000}>
                50 mins
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
    </div>
  );
}
