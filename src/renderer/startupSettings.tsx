/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function StartupSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Startup</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Launch at login</span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Start timer automatically on launch</span>
          </Label>
          <Switch id="functional" />
        </div>
      </CardContent>
    </Card>
  );
}
