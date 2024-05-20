/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Play,
  Settings,
  EyeOff,
  CirclePause,
  ChevronsRight,
} from 'lucide-react';
import { Button } from './components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { imgData } from '../constants';

export function getReadableTime(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let result = '';

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    result += `${formattedHours}h`;
  }

  if (minutes > 0) {
    result += `${formattedMinutes}m`;
  }

  if (seconds > 0) {
    result += `${formattedSeconds}s`;
  }

  return result;
}

function Overview({
  setShowSettings,
}: {
  setShowSettings: (arg0: boolean) => void;
}) {
  const sessionDurationInStore = window.electron.store.get('session_duration');
  const breakDurationInStore = window.electron.store.get('break_duration');
  const { pausedInStore, endTime } = window.electron.store.get('session');

  const [paused, setPaused] = useState(pausedInStore);

  const [breakDuration, setBreakDuration] = useState(breakDurationInStore);
  const [sessionDuration, setSessionDuration] = useState(
    sessionDurationInStore,
  );
  const [displayTime, setDisplayTime] = useState<string>();

  const isSessionActive = endTime && !paused;

  useEffect(() => {
    const id = setInterval(() => {
      const { endTime: currEndTime, paused: isPaused } =
        window.electron.store.get('session');

      if (isPaused) {
        setPaused(true);
      } else {
        setPaused(false);
        const remaining = new Date(currEndTime).getTime() - Date.now();
        const remainingInSecs = Math.floor(remaining / 1000);

        const timeString: string | undefined = `${getReadableTime(
          remainingInSecs,
        )}`;

        setDisplayTime(timeString);
      }
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center bg-zinc-900 text-white">
      {/* <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        Wave goodbye to eye strain!
      </div> */}
      {!endTime ? (
        <>
          <div className="text-2xl font-bold text-white text-center">
            Wave goodbye to eye strain!
          </div>
          <div className="font-xl text-center text-neutral-200 py-4">
            Subtle reminders for mindful breaks from screens without disturbing
            focus
            <br />
            Customize breaks for a journey to better eye health
          </div>
        </>
      ) : undefined}

      {endTime ? (
        <>
          <div className="font-xl text-center text-neutral-200 py-4">
            Take a break in action, your eyes will thank you!&nbsp;
            <img
              className="inline-block"
              src={imgData}
              alt="eyes"
              width={20}
              height={20}
            />
          </div>
          {isSessionActive && (
            <div className="text-2xl font-bold text-white text-center">
              Next break begins in&nbsp;
              <span className="font-mono">{displayTime}</span>
            </div>
          )}
          {paused && (
            <div className="text-2xl font-bold text-white text-center">
              Session paused
            </div>
          )}
          <div className="mt-8">
            {paused && (
              <Button
                variant="link"
                onClick={() => {
                  setPaused(false);
                  window.electron.ipcRenderer.sendMessage('start-session');
                }}
              >
                <Play width={20} height={20} />
                &nbsp;Resume Session
              </Button>
            )}
            {!paused && (
              <Button
                variant="link"
                onClick={() => {
                  window.electron.ipcRenderer.sendMessage('take-break-now');
                }}
              >
                <EyeOff width={20} height={20} />
                &nbsp;Start this break now
              </Button>
            )}
            {!paused && (
              <Button
                variant="link"
                onClick={() => {
                  window.electron.ipcRenderer.sendMessage('pause-session');
                }}
              >
                <CirclePause width={20} height={20} />
                &nbsp;Pause Session
              </Button>
            )}
            {!paused && (
              <Button
                variant="link"
                onClick={() => {
                  window.electron.ipcRenderer.sendMessage('skip-break');
                }}
              >
                <ChevronsRight width={20} height={20} />
                &nbsp;Skip this break
              </Button>
            )}
          </div>
        </>
      ) : undefined}

      {!endTime && (
        <button
          type="button"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('start-session');
          }}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <Play width={20} height={20} />
            &nbsp;Start Session
          </span>
        </button>
      )}

      <div className="font-xl text-center text-neutral-200 py-4 flex items-baseline mt-32">
        After every
        <Select
          value={sessionDuration}
          onValueChange={(val: number) => {
            setSessionDuration(val);
            window.electron.store.set('session_duration', val);
          }}
        >
          <SelectTrigger className="w-[100px] border-none">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={900} value={900}>
                15 mins
              </SelectItem>
              <SelectItem key={1200} value={1200}>
                20 mins
              </SelectItem>
              <SelectItem key={1500} value={1500}>
                25 mins
              </SelectItem>
              <SelectItem key={1800} value={1800}>
                30 mins
              </SelectItem>
              <SelectItem key={2100} value={2100}>
                35 mins
              </SelectItem>
              <SelectItem key={2400} value={2400}>
                40 mins
              </SelectItem>
              <SelectItem key={2700} value={2700}>
                45 mins
              </SelectItem>
              <SelectItem key={3000} value={3000}>
                50 mins
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        remind me to take breaks of
        <Select
          value={breakDuration}
          onValueChange={(val: number) => {
            setBreakDuration(val);
            window.electron.store.set('break_duration', val);
          }}
        >
          <SelectTrigger className="w-[100px] border-none">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={20} value={20}>
                20 secs
              </SelectItem>
              <SelectItem key={25} value={25}>
                25 secs
              </SelectItem>
              <SelectItem key={30} value={30}>
                30 secs
              </SelectItem>
              <SelectItem key={35} value={35}>
                35 secs
              </SelectItem>
              <SelectItem key={45} value={45}>
                45 secs
              </SelectItem>
              <SelectItem key={50} value={50}>
                50 secs
              </SelectItem>
              <SelectItem key={55} value={55}>
                55 secs
              </SelectItem>
              <SelectItem key={60} value={60}>
                1 min
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="link"
          className="pl-0"
          onClick={() => setShowSettings(true)}
        >
          Settings&nbsp; <Settings width={20} height={20} />
        </Button>
      </div>
    </div>
  );
}

export default Overview;
