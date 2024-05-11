import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DEFAULT_BREAK_DURATION } from '../main/constants';
import { AuroraBackground } from './components/ui/aurora-background';

function getReadableTime(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    result += `${minutes}m`;
  }

  if (seconds > 0) {
    result += `${seconds}s`;
  }

  return result;
}

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
        <div className="text-2xl font-medium text-white text-center">
          {seconds > 0 && <p>{getReadableTime(seconds)}</p>}
        </div>
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          {isLongBreak ? 'Long break' : 'Short break'}
        </div>
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          Your eyes need rest :)
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          World looks more beautiful when your eyes are healthy
        </div>
        <button
          type="button"
          className=" bg-white rounded-full w-fit text-black px-4 py-2"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('start-session');
            window.close();
            window.electron.ipcRenderer.sendMessage('skip-break');
          }}
        >
          Skip this break
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

export default Break;
