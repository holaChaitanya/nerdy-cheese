/* eslint-disable import/prefer-default-export */

import { useState } from 'react';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { TIMER_STYLE } from '../main/constants';

export function TimeLabelSettings() {
  const timerStyleInStore = window.electron.store.get('toolbar_timer_style');
  const [timerStyle, setTimerStyle] = useState(timerStyleInStore);

  return (
    <div className="grid gap-6">
      <Label htmlFor="toolbar_timer_style" className="flex flex-col space-y-1">
        <span>Launch at login</span>
      </Label>
      <RadioGroup
        className="grid grid-cols-2 gap-4"
        value={timerStyle}
        onValueChange={(val) => {
          setTimerStyle(val);
          window.electron.store.set('toolbar_timer_style', val);
        }}
      >
        <div>
          <RadioGroupItem
            value={TIMER_STYLE.elapsed}
            id={TIMER_STYLE.elapsed}
            className="peer sr-only"
          />
          <Label
            htmlFor={TIMER_STYLE.elapsed}
            className="text-white text-[15px] leading-none pl-[15px]"
          >
            &nbsp;Elapsed Since
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value={TIMER_STYLE.remaining}
            id={TIMER_STYLE.remaining}
            className="peer sr-only"
          />
          <Label
            htmlFor={TIMER_STYLE.remaining}
            className="text-white text-[15px] leading-none pl-[15px]"
          >
            &nbsp;Time left
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
