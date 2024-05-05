import { ConfigProvider, theme, Layout, Menu, Switch, Select } from 'antd';
import { useState } from 'react';

const { Sider, Content, Header } = Layout;
const { Option } = Select;

const SideBarItems = [
  {
    key: 'general',
    // icon: <MailOutlined />,
    label: 'General',
  },
  {
    key: 'focus_mode',
    // icon: <CalendarOutlined />,
    label: 'Focus mode',
  },
  {
    key: 'rest_mode',
    label: 'Rest mode',
    // icon: <AppstoreOutlined />,
  },
  {
    key: 'menu_bar',
    label: 'Menu bar',
    // icon: <SettingOutlined />,
  },
];

function Settings() {
  const launchAtLoginInStore = window.electron.store.get('launch_at_login');
  const startTimerInStore = window.electron.store.get('start_timer');
  const sessionDurationInStore = window.electron.store.get('session_duration');

  const [activeMenu, setActiveMenu] = useState('general');
  const [launchAtLogin, setLaunchAtLogin] = useState(launchAtLoginInStore);
  const [startTimer, setStartTimer] = useState(startTimerInStore);
  const [sessionDuration, setSessionDuration] = useState(
    sessionDurationInStore,
  );

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
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu
            activeKey={activeMenu}
            mode="vertical"
            items={SideBarItems}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {activeMenu === 'general' && (
                <div>
                  <h1>Startup</h1>
                  Launch at login&nbsp;
                  <Switch
                    key="launch_at_login"
                    checked={launchAtLogin}
                    onChange={(checked) => {
                      setLaunchAtLogin(checked);
                      window.electron.store.set('launch_at_login', checked);
                    }}
                  />
                  <br />
                  Start timer automatically on launch&nbsp;
                  <Switch
                    key="start_timer"
                    checked={startTimer}
                    onChange={(checked) => {
                      setStartTimer(checked);
                      window.electron.store.set('start_timer', checked);
                    }}
                  />
                </div>
              )}
              {activeMenu === 'focus_mode' && (
                <div>
                  <h1>Focus</h1>
                  Duration&nbsp;
                  <Select
                    value={sessionDuration}
                    onChange={(val) => {
                      setSessionDuration(val);
                      window.electron.store.set('session_duration', val);
                    }}
                  >
                    <Option key={900} value={900}>
                      15 mins
                    </Option>
                    <Option key={1200} value={1200}>
                      20 mins
                    </Option>
                    <Option key={1500} value={1500}>
                      25 mins
                    </Option>
                    <Option key={1800} value={1800}>
                      30 mins
                    </Option>
                    <Option key={2100} value={2100}>
                      35 mins
                    </Option>
                    <Option key={2400} value={2400}>
                      40 mins
                    </Option>
                    <Option key={2700} value={2700}>
                      45 mins
                    </Option>
                    <Option key={3000} value={3000}>
                      50 mins
                    </Option>
                  </Select>
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Settings;
