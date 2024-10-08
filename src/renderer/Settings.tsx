/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Monitor,
  EyeOff,
  Footprints,
  BellRing,
  LogIn,
  CloudDownload,
  BarChart4,
  ArrowLeft,
  TimerReset,
} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { StartupSettings } from './startupSettings';
import { FocusSettings } from './focusSettings';
import { IdleTimeSettings } from './idleTimeSettings';
import { ShortBreakSettings } from './shortBreakSettings';
import { PreBreakSettings } from './preBreakSettings';
import { LongBreakSettings } from './longBreakSettings';
import { AnalyticSettings } from './analyticSettings';
import { UpdateSettings } from './updateSettings';

function Settings({
  setShowSettings,
}: {
  setShowSettings: (arg0: boolean) => void;
}) {
  return (
    <div className="grid min-h-screen w-full">
      {/* <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <img alt="Get a Break" src={imgData} width={24} height={24} />
              <span className="">Get a Break</span>
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
      <div className="flex flex-col px-40">
        <main className="flex flex-1 flex-col p-4 lg:p-6">
          <Tabs defaultValue="general">
            <ArrowLeft
              width={20}
              height={20}
              className="cursor-pointer fixed mt-2"
              onClick={() => setShowSettings(false)}
            />
            <TabsList className="justify-center">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="pt-4" />
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
              <div className="pt-4" />
              <Separator className="my-4" />
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <TimerReset className="self-center" width={20} height={20} />
                <IdleTimeSettings />
              </div>
            </TabsContent>
            <TabsContent value="system">
              <div className="pt-4" />
              <div className="flex items-center justify-center gap-x-8 [&>div]:w-full">
                <LogIn width={20} height={20} />
                <StartupSettings />
              </div>
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default Settings;
