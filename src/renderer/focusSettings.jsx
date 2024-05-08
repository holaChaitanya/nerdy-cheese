/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function FocusSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus mode</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Duration</span>
            <span className="font-normal leading-snug text-muted-foreground">
              This is how long you&apos;ll work before you&apos;re suggested a
              break. If you&apos;re in the middle of something, you can choose
              to delay it.
            </span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
