/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function MeetingSetting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meetings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Pause during meetings or calls</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Take a Break will pause whenever your microphone or camera is in
              use
            </span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
