/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function IdleTimeSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Idle time</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Pause timer after 1 min of inactivity</span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Reset timer after 5 min of inactivity</span>
          </Label>
          <Switch id="functional" />
        </div>
      </CardContent>
    </Card>
  );
}
