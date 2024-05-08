/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';

export function AnalyticSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Share my usage analytics</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Help us improve by allowing us to collect completely anonymous
              usage data
            </span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
