// details config doc: https://docs.taro.zone/docs/app-config
export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: ['pages/index/index', 'pages/login/index'],
  subpackages: [
    // 正式环境ip 则不展示切换ip
    // ...(process.env.BUILD_ENV === 'prod' ? [] :[{ root: 'pages/_dev', pages: ['index'] }]),
    { root: 'pages/webViewPage', pages: ['index'] },
    { root: 'pages/mine', pages: ['index'] },
    { root: 'pages/menu', pages: ['index'] },
  ],
  requiredBackgroundModes: ['audio'],
  window: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'tp',
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#ffffff',
  },
  // 为了保证低版本兼容以及区分哪些页面是 tab 页，tabBar 的相关配置项仍需完整声明
  tabBar: {
    custom: true,
    color: '#747474',
    selectedColor: '#7468F2',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/login/index',
        text: 'Login',
        iconPath: './assets/images/tabbar/icon-tabbar-mine.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-mine-active.png',
      },
      {
        pagePath: 'pages/index/index',
        text: 'Index',
        iconPath: './assets/images/tabbar/icon-tabbar-mine.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-mine-active.png',
      },
    ],
  },
  lazyCodeLoading: 'requiredComponents',
});
