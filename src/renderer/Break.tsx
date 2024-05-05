import { useState, useEffect } from 'react';
import { ConfigProvider, theme, Button, Layout } from 'antd';
import { DEFAULT_BREAK_DURATION } from '../main/constants';

const { Content } = Layout;

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

function Break() {
  const breakDurationInStore = window.electron.store.get('break_duration');
  const [seconds, setSeconds] = useState<number>(
    breakDurationInStore ?? DEFAULT_BREAK_DURATION,
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#eaf1fa',
          colorInfo: '#eaf1fa',
          fontSize: 14,
          wireframe: false,
          borderRadius: 6,
          colorTextBase: '#f3efda',
          colorBgBase: '#064483',
          colorBgSpotlight: '#dee3e9',
          colorBgContainer: '#2f6397',
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Content>
        <h2>{seconds > 0 && <p>Timer: {getReadableTime(seconds)}</p>}</h2>
        <h1>Your eyes need rest :)</h1>
        <h2>World looks more beautiful when your eyes are less tired</h2>
        <Button
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('start-session');
            window.close();
          }}
        >
          Skip the break
        </Button>
      </Content>
    </ConfigProvider>
  );
}

export default Break;
