import { useState, useEffect } from 'react';
import { DEFAULT_BREAK_DURATION } from '../main/constants';

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
    <div>
      <h2>{seconds > 0 && <p>Timer: {seconds} seconds</p>}</h2>
      <h1>Your eyes need rest :)</h1>
      <div className="Hello">
        World looks more beautiful when your eyes are healthy
      </div>
      <button
        type="button"
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('start-session');
          window.close();
        }}
      >
        Skip the break
      </button>
    </div>
  );
}

export default Break;
