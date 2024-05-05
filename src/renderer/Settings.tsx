import {
  ConfigProvider,
  theme,
  Layout,
  Menu,
  Switch,
  Select,
  Radio,
} from 'antd';
import { useState } from 'react';
import { TIMER_STYLE } from '../main/constants';

const { Sider, Content } = Layout;
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
];

function Settings() {
  const launchAtLoginInStore = window.electron.store.get('launch_at_login');
  const startTimerInStore = window.electron.store.get('start_timer');
  const sessionDurationInStore = window.electron.store.get('session_duration');
  const breakDurationInStore = window.electron.store.get('break_duration');
  const preBreakReminderEnabledInStore = window.electron.store.get(
    'pre_break_reminder_enabled',
  );
  const preBreakReminderAtInStore = window.electron.store.get(
    'pre_break_reminder_at',
  );
  const resetTimerEnabledInStore = window.electron.store.get(
    'reset_timer_enabled',
  );
  const timerStyleInStore = window.electron.store.get('toolbar_timer_style');

  const [activeMenu, setActiveMenu] = useState('general');
  const [launchAtLogin, setLaunchAtLogin] = useState(launchAtLoginInStore);
  const [startTimer, setStartTimer] = useState(startTimerInStore);
  const [sessionDuration, setSessionDuration] = useState(
    sessionDurationInStore,
  );
  const [breakDuration, setBreakDuration] = useState(breakDurationInStore);
  const [preBreakReminderEnabled, setPreBreakReminderEnabled] = useState(
    preBreakReminderEnabledInStore,
  );
  const [preBreakReminderAt, setPreBreakReminderAt] = useState(
    preBreakReminderAtInStore,
  );
  const [resetTimerEnabled, setResetTimerEnabled] = useState(
    resetTimerEnabledInStore,
  );
  const [timerStyle, setTimerStyle] = useState(timerStyleInStore);

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
          <Content style={{ margin: '0 16px' }}>
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
                  <Option key={6} value={6}>
                    6 secs
                  </Option>
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
                <h3>
                  Reset timer on inactivity - screen locked for more than 5
                  minutes
                </h3>
                &nbsp;
                <Switch
                  key="reset_timer_enabled"
                  checked={resetTimerEnabled}
                  onChange={(checked) => {
                    setResetTimerEnabled(checked);
                    window.electron.store.set('reset_timer_enabled', checked);
                  }}
                />
                <br />
                <h3>Timer style in tool bar</h3>
                <Radio.Group
                  value={timerStyle}
                  defaultValue={TIMER_STYLE.elapsed}
                  onChange={(e) => {
                    setTimerStyle(e.target.value);
                    window.electron.store.set(
                      'toolbar_timer_style',
                      e.target.value,
                    );
                  }}
                >
                  <Radio.Button value={TIMER_STYLE.elapsed}>
                    Elapsed time
                  </Radio.Button>
                  <Radio.Button value={TIMER_STYLE.remaining}>
                    Remaining time
                  </Radio.Button>
                </Radio.Group>
              </div>
            )}
            {activeMenu === 'rest_mode' && (
              <div>
                <h1>Short breaks</h1>
                Duration&nbsp;
                <Select
                  value={breakDuration}
                  onChange={(val) => {
                    setBreakDuration(val);
                    window.electron.store.set('break_duration', val);
                  }}
                >
                  <Option key={20} value={20}>
                    20 secs
                  </Option>
                  <Option key={25} value={25}>
                    25 secs
                  </Option>
                  <Option key={30} value={30}>
                    30 secs
                  </Option>
                  <Option key={35} value={35}>
                    35 secs
                  </Option>
                  <Option key={45} value={45}>
                    45 secs
                  </Option>
                  <Option key={50} value={50}>
                    50 secs
                  </Option>
                  <Option key={55} value={55}>
                    55 secs
                  </Option>
                  <Option key={60} value={60}>
                    1 min
                  </Option>
                </Select>
                <h1>Pre-break reminder</h1>
                Enabled&nbsp;
                <Switch
                  key="pre_break_reminder_enabled"
                  checked={preBreakReminderEnabled}
                  onChange={(checked) => {
                    setPreBreakReminderEnabled(checked);
                    window.electron.store.set(
                      'pre_break_reminder_enabled',
                      checked,
                    );
                  }}
                />
                <h3>Pre break notification before ending of session</h3>&nbsp;
                <Select
                  value={preBreakReminderAt}
                  onChange={(val) => {
                    setPreBreakReminderAt(val);
                    window.electron.store.set('pre_break_reminder_at', val);
                  }}
                >
                  <Option key={2} value={2}>
                    2 secs
                  </Option>
                  <Option key={30} value={30}>
                    30 secs
                  </Option>
                  <Option key={60} value={60}>
                    1 min
                  </Option>
                  <Option key={120} value={120}>
                    2 min
                  </Option>
                  <Option key={300} value={300}>
                    5 min
                  </Option>
                </Select>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Settings;
