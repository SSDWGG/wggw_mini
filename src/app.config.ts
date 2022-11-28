// details config doc: https://docs.taro.zone/docs/app-config
export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  // 除了首页和tabbar页，其他页面全部放入 subpackages（小程序分包数量没限制）
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/album/index'
  ],
  subpackages: [
  ],
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
        pagePath: 'pages/album/index',
        text: '相册',
        iconPath: './assets/images/tabbar/icon-tabbar-album.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-album-active.png',
      }, 
      {
        pagePath: 'pages/mine/index',
        text: '个人',
        iconPath: './assets/images/tabbar/icon-tabbar-mine.png',
        selectedIconPath: './assets/images/tabbar/icon-tabbar-mine-active.png',
      },
    ],
  },
});
