// details config doc: https://docs.taro.zone/docs/app-config
export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: [
    'pages/index/index',
    'pages/menu/index',
  ],
  subpackages: [
    // ,'memo/index','memo/post/index','mine/index'
    { root: 'pages/memoAndMine', pages: ['index','memo/post/index'] },
    { root: 'pages/preview', pages: ['index'] },
    { root: 'pages/wgg', pages: ['index'] },
    { root: 'pages/mine', pages: ['index'] },
    { root: 'pages/invite', pages: ['index'] },
    { root: 'pages/speedTest', pages: ['index'] },
    { root: 'pages/scoreboard', pages: ['index'] },
    { root: 'pages/bidding', pages: ['index','detail/index','post/index'] },
    { root: 'pages/cxk', pages: ['index/index','menu/index','cxk/index','cxk2/index','cxk3/index','cxk4/index','cxk5/index','cxk6/index'] },
    { root: 'pages/developer', pages: ['index','cssloaders/index','time/index','editor/index','waterfall/index'] },

  ],
  requiredBackgroundModes:["audio"],
  window: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WGGW',
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
        pagePath: 'pages/menu/index',
        text: 'Menu',
        iconPath: './assets/images/tabbar/icon-tabbar-mine.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-mine-active.png',
      }, 
      {
        pagePath: 'pages/index/index',
        text: 'index',
        iconPath: './assets/images/tabbar/icon-tabbar-mine.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-mine-active.png',
      },
    ],
  },
});
