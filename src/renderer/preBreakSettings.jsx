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

export function PreBreakSettings() {
  const preBreakReminderEnabledInStore = window.electron.store.get(
    'pre_break_reminder_enabled',
  );
  const preBreakReminderAtInStore = window.electron.store.get(
    'pre_break_reminder_at',
  );
  const [preBreakReminderEnabled, setPreBreakReminderEnabled] = useState(
    preBreakReminderEnabledInStore,
  );
  const [preBreakReminderAt, setPreBreakReminderAt] = useState(
    preBreakReminderAtInStore,
  );

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between space-x-2">
        <Label
          htmlFor="pre_break_reminder_enabled"
          className="flex flex-col space-y-1"
        >
          <span>Pre Break reminders</span>
        </Label>
        <Switch
          id="pre_break_reminder_enabled"
          key="pre_break_reminder_enabled"
          checked={preBreakReminderEnabled}
          onCheckedChange={(checked) => {
            setPreBreakReminderEnabled(checked);
            window.electron.store.set('pre_break_reminder_enabled', checked);
          }}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label
          htmlFor="pre_break_reminder_at"
          className="flex flex-col space-y-1"
        >
          <span className="font-normal leading-snug text-muted-foreground">
            Show reminder before
          </span>
        </Label>
        <Select
          key="pre_break_reminder_at"
          value={preBreakReminderAt}
          onValueChange={(val) => {
            setPreBreakReminderAt(val);
            window.electron.store.set('pre_break_reminder_at', val);
          }}
          disabled={!preBreakReminderEnabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={30} value={30}>
                30 secs
              </SelectItem>
              <SelectItem key={60} value={60}>
                1 min
              </SelectItem>
              <SelectItem key={120} value={120}>
                2 min
              </SelectItem>
              <SelectItem key={300} value={300}>
                5 min
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
