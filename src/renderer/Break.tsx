import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_BREAK_DURATION } from '../main/constants';
import { AuroraBackground } from './components/ui/aurora-background';

function Break() {
  const [seconds, setSeconds] = useState(DEFAULT_BREAK_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      window.electron.ipcRenderer.sendMessage('start-session');
      window.close();
    }
  }, [seconds]);

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
          {seconds > 0 && <p>{seconds} seconds</p>}
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
          }}
        >
          Skip this break
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

export default Break;
