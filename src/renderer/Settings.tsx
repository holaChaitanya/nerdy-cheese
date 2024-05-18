/* eslint-disable @typescript-eslint/no-unused-vars */
import { Soup, Settings as SettingsIcon, Eye } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { StartupSettings } from './startupSettings';
// import { UpdateSettings } from './updateSettings';
// import { AnalyticSettings } from './analyticSettings';
import { FocusSettings } from './focusSettings';
import { TimeLabelSettings } from './timeLabelSettings';
import { IdleTimeSettings } from './idleTimeSettings';
// import { MeetingSetting } from './meetingSettings';
import { ShortBreakSettings } from './shortBreakSettings';
import { PreBreakSettings } from './preBreakSettings';
import { LongBreakSettings } from './longBreakSettings';
import { imgData } from '../constants';
import { AnalyticSettings } from './analyticSettings';
import { UpdateSettings } from './updateSettings';

function Settings() {
  const [activeMenu, setActiveMenu] = useState();

  return (
    <div className="grid min-h-screen w-full bg-muted/40">
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Tabs defaultValue="account" className="">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="flex items-center [&>div]:w-full">
                <FocusSettings />
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-center [&>div]:w-full">
                <ShortBreakSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <LongBreakSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <PreBreakSettings />
              </div>
            </TabsContent>
            <TabsContent value="system">
              <div className="flex items-center justify-center [&>div]:w-full">
                <StartupSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <TimeLabelSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <UpdateSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <AnalyticSettings />
              </div>
            </TabsContent>
          </Tabs>
          {activeMenu === 'general' && (
            <>
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <StartupSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <UpdateSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <AnalyticSettings />
              </div> */}
            </>
          )}
          {activeMenu === 'focus' && (
            <>
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <FocusSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <TimeLabelSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <IdleTimeSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <MeetingSetting />
              </div> */}
            </>
          )}
          {activeMenu === 'rest' && (
            <>
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <ShortBreakSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <LongBreakSettings />
              </div> */}
              {/* <div className="flex items-center justify-center [&>div]:w-full">
                <PreBreakSettings />
              </div> */}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;
