/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Soup,
  Settings as SettingsIcon,
  Eye,
  Monitor,
  EyeOff,
  Footprints,
  BellRing,
  LogIn,
  Tag,
  CloudDownload,
  BarChart4,
  ArrowLeft,
} from 'lucide-react';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { StartupSettings } from './startupSettings';
import { FocusSettings } from './focusSettings';
import { IdleTimeSettings } from './idleTimeSettings';
// import { MeetingSetting } from './meetingSettings';
import { ShortBreakSettings } from './shortBreakSettings';
import { PreBreakSettings } from './preBreakSettings';
import { LongBreakSettings } from './longBreakSettings';
import { imgData } from '../constants';
import { AnalyticSettings } from './analyticSettings';
import { UpdateSettings } from './updateSettings';

function Settings({
  setShowSettings,
}: {
  setShowSettings: (arg0: boolean) => void;
}) {
  const [activeMenu, setActiveMenu] = useState();

  return (
    <div className="grid min-h-screen w-full bg-zinc-900">
      {/* <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <img alt="Take a Break" src={imgData} width={24} height={24} />
              <span className="">Take a Break</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                onClick={() => setActiveMenu('general')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'general' ? 'bg-muted text-primary' : ''
                }`}
              >
                <SettingsIcon className="h-4 w-4" />
                General
              </Link>
              <Link
                to="/"
                onClick={() => setActiveMenu('focus')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'focus' ? 'bg-muted text-primary' : ''
                }`}
              >
                <Eye className="h-4 w-4" />
                Focus mode
              </Link>
              <Link
                to="/"
                onClick={() => setActiveMenu('rest')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'rest' ? 'bg-muted text-primary' : ''
                }`}
              >
                <Soup className="h-4 w-4" />
                Rest mode
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and enjoy your productivity
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col p-4 lg:p-6">
          <Tabs defaultValue="general">
            <TabsList className="justify-center">
              {/* <Button variant="link">Back</Button> */}
              <ArrowLeft
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setShowSettings(false)}
              />
              {/* <div className="inline-flex h-9 items-center text-muted-foreground justify-start rounded-none border-b bg-transparent p-0">
                <ArrowLeft width={20} height={20} />
              </div> */}

              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              {/* <Card className="mt-8">
                <CardContent className="space-y-2"> */}
              <div className="flex items-start gap-x-8 [&>div]:w-full">
                <Monitor className="self-center" width={20} height={20} />
                <FocusSettings />
              </div>
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center gap-x-8 [&>div]:w-full">
                <EyeOff className="self-center" width={20} height={20} />
                <ShortBreakSettings />
              </div>
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <Footprints className="self-center" width={20} height={20} />
                <LongBreakSettings />
              </div>
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <BellRing className="self-center" width={20} height={20} />
                <PreBreakSettings />
              </div>
              {/* </CardContent>
              </Card> */}
            </TabsContent>
            <TabsContent value="system">
              {/* <Card className="mt-8">
                <CardContent className="space-y-2"> */}
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <LogIn width={20} height={20} />
                <StartupSettings />
              </div>
              {/* <div className="pt-4" />
                  <Separator className="my-4" />
                  <div className="pt-4" /> */}
              {/* <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                    <Tag width={20} height={20} />
                    <TimeLabelSettings />
                  </div> */}
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <CloudDownload width={20} height={20} />
                <UpdateSettings />
              </div>
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <BarChart4 width={20} height={20} />
                <AnalyticSettings />
              </div>
              {/* </CardContent>
              </Card> */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default Settings;
