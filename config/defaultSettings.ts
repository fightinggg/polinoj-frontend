import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Polin OJ 在线评测系统',
  pwa: false,
  logo: 'https://icpc.global/static/media/icpc-medium5.5c857487.png',
  iconfontUrl: '//at.alicdn.com/t/font_2497915_9c0hkkems39.js',
};

export default Settings;
