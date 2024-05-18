/* eslint-disable import/prefer-default-export */

import { useState } from 'react';
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

export function LongBreakSettings() {
  const longBreakEnabledInStore =
    window.electron.store.get('long_break_enabled');
  const longBreakDurationInStore = window.electron.store.get(
    'long_break_duration',
  );
  const longBreakAfterInStore = window.electron.store.get('long_break_after');
  const [longBreakEnabled, setLongBreakEnabled] = useState(
    longBreakEnabledInStore,
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    longBreakDurationInStore,
  );
  const [longBreakAfter, setLongBreakAfter] = useState(longBreakAfterInStore);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="long_break_enabled" className="flex flex-col space-y-1">
          <span>Long Breaks</span>
        </Label>
        <Switch
          id="long_break_enabled"
          key="long_break_enabled"
          checked={longBreakEnabled}
          onCheckedChange={(checked) => {
            setLongBreakEnabled(checked);
            window.electron.store.set('long_break_enabled', checked);
          }}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label
          htmlFor="long_break_duration"
          className="flex flex-col space-y-1"
        >
          <span className="font-normal leading-snug text-muted-foreground">
            Duration
          </span>
        </Label>
        <Select
          key="long_break_duration"
          value={longBreakDuration}
          onValueChange={(val) => {
            setLongBreakDuration(val);
            window.electron.store.set('long_break_duration', val);
          }}
          disabled={!longBreakEnabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={60} value={60}>
                1 min
              </SelectItem>
              <SelectItem key={120} value={120}>
                2 min
              </SelectItem>
              <SelectItem key={300} value={300}>
                5 min
              </SelectItem>
              <SelectItem key={600} value={600}>
                10 min
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor="long_break_after" className="flex flex-col space-y-1">
          <span className="font-normal leading-snug text-muted-foreground">
            Repeat after number of short breaks
          </span>
        </Label>
        <Select
          key="long_break_after"
          value={longBreakAfter}
          onValueChange={(val) => {
            setLongBreakAfter(val);
            window.electron.store.set('long_break_after', val);
          }}
          disabled={!longBreakEnabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={2} value={2}>
                2
              </SelectItem>
              <SelectItem key={3} value={3}>
                3
              </SelectItem>
              <SelectItem key={4} value={4}>
                4
              </SelectItem>
              <SelectItem key={5} value={5}>
                5
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
