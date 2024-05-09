/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pre-break reminder</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Enabled</span>
          </Label>
          <Switch id="necessary" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            {/* <span>Duration</span> */}
            <span className="font-normal leading-snug text-muted-foreground">
              Show reminder before
            </span>
          </Label>
          <Select>
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
      </CardContent>
    </Card>
  );
}
