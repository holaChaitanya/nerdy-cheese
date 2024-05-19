import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DEFAULT_BREAK_DURATION } from '../main/constants';
import { AuroraBackground } from './components/ui/aurora-background';
import { COPIES } from './constants';

function getTime(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  const result = { hrs: 0, mins: 0, secs: 0 };

  if (hours > 0) {
    // result += `${hours}h`;
    result.hrs = hours;
  }

  if (minutes > 0) {
    // result += `${minutes}m`;
    result.mins = minutes;
  }

  if (seconds > 0) {
    // result += `${seconds}s`;
    result.secs = seconds;
  }

  return result;
}

const copy = COPIES[Math.floor(Math.random() * COPIES.length)];

function Break({ isLongBreak }: { isLongBreak: boolean }) {
  const breakDurationInStore = window.electron.store.get('break_duration');
  const longBreakDurationInStore = window.electron.store.get(
    'long_break_duration',
  );
  const [seconds, setSeconds] = useState<number>(
    isLongBreak
      ? longBreakDurationInStore ?? DEFAULT_BREAK_DURATION
      : breakDurationInStore ?? DEFAULT_BREAK_DURATION,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      window.electron.ipcRenderer.sendMessage('start-session');
      window.close();
    }
  }, [seconds]);

  useEffect(() => {
    const end = Date.now() + 1.5 * 1000;

    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end && isLongBreak) {
        requestAnimationFrame(frame);
      }
    })();
  }, [isLongBreak]);

  const { mins, secs } = getTime(seconds);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          {mins ? (
            <div className="flex flex-col p-2 rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': mins }} />
              </span>
              mins
            </div>
          ) : undefined}
          {secs ? (
            <div className="flex flex-col p-2 rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ '--value': secs }} />
              </span>
              secs
            </div>
          ) : undefined}
        </div>
        {/* <div className="text-3xl md:text-7xl font-bold text-white text-center">
          {isLongBreak ? 'Long break' : 'Short break'}
        </div> */}
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          {copy.title}
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          {copy.subtitle}
        </div>
        <button
          type="button"
          className="bg-white rounded-full w-fit text-black px-4 py-2"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('start-session');
            window.close();
            window.electron.ipcRenderer.sendMessage('skip-break');
          }}
        >
          Skip this break
        </button>
        <button
          type="button"
          className=" bg-white rounded-full w-fit text-black px-4 py-2"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('start-session', {
              snoozedForInSecs: 5 * 60,
            });
            window.close();
            window.electron.ipcRenderer.sendMessage('skip-break');
          }}
        >
          Snooze for 5 minutes
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

export default Break;
