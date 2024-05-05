import { ConfigProvider, theme, Layout, Menu, Switch } from 'antd';

const { Sider, Content, Header } = Layout;

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
            defaultSelectedKeys={['1']}
            mode="vertical"
            items={SideBarItems}
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
              <h1>Startup</h1>
              Launch at login&nbsp;
              <Switch key="launch_at_login" />
              <br />
              Start timer automatically on launch&nbsp;
              <Switch key="start_timer" />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Settings;
