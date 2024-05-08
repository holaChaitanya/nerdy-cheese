/* eslint-disable import/prefer-default-export */

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

export function TimeLabelSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time label style</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Duration</span>
          </Label>
        </div> */}
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Elapsed Since
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Time left
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
