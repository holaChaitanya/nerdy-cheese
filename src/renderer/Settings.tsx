import { Button, ConfigProvider, theme } from 'antd';

function Settings() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0a3e89',
          colorInfo: '#0a3e89',
          fontSize: 14,
          wireframe: false,
          borderRadius: 6,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <p>This is Setting</p>
      <Button onClick={() => {}}>click me </Button>
    </ConfigProvider>
  );
}

export default Settings;
