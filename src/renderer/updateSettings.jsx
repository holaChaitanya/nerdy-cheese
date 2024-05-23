/* eslint-disable import/prefer-default-export */

import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function UpdateSettings() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="necessary" className="flex flex-col space-y-1">
          <span>Automatically check for updates</span>
        </Label>
        <Switch id="necessary" defaultChecked />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span>Automatically download updates</span>
        </Label>
        <Switch id="functional" />
      </div>
      <Button
        variant="outline"
        className="w-[120px]"
        style={{ justifySelf: 'baseline' }}
      >
        Check for updates
      </Button>
    </div>
  );
}
