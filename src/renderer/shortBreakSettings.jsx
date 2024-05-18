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

export function ShortBreakSettings() {
  const breakDurationInStore = window.electron.store.get('break_duration');
  const [breakDuration, setBreakDuration] = useState(breakDurationInStore);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="necessary" className="flex flex-col space-y-1">
          <span>Short Break Duration</span>
          {/* <span className="font-normal leading-snug text-muted-foreground">
            During this period, your device will blur the screen to give your
            eyes a rest
          </span> */}
        </Label>
        <Select
          value={breakDuration}
          onValueChange={(val) => {
            setBreakDuration(val);
            window.electron.store.set('break_duration', val);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={20} value={20}>
                20 secs
              </SelectItem>
              <SelectItem key={25} value={25}>
                25 secs
              </SelectItem>
              <SelectItem key={30} value={30}>
                30 secs
              </SelectItem>
              <SelectItem key={35} value={35}>
                35 secs
              </SelectItem>
              <SelectItem key={45} value={45}>
                45 secs
              </SelectItem>
              <SelectItem key={50} value={50}>
                50 secs
              </SelectItem>
              <SelectItem key={55} value={55}>
                55 secs
              </SelectItem>
              <SelectItem key={60} value={60}>
                1 min
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
