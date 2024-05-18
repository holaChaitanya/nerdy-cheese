/* eslint-disable import/prefer-default-export */

import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function AnalyticSettings() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="necessary" className="flex flex-col space-y-1">
          <span>Share my usage analytics</span>
          <span className="font-normal leading-snug text-muted-foreground">
            Help us improve by allowing us to collect completely anonymous usage
            data
          </span>
        </Label>
        <Switch id="necessary" defaultChecked />
      </div>
    </div>
  );
}
