// details config doc: https://docs.taro.zone/docs/app-config
export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: ['pages/index/index', 'pages/menu/index'],
  subpackages: [
    // 正式环境ip 则不展示切换ip
    { root: 'pages/memo', pages: ['index', 'memo/post/index'] },
    { root: 'pages/preview', pages: ['index'] },
    { root: 'pages/wgg', pages: ['index'] },
    { root: 'pages/going', pages: ['index'] },
    { root: 'pages/webViewPage', pages: ['index'] },
    { root: 'pages/mine', pages: ['index'] },
    { root: 'pages/cxk', pages: ['index/index', 'menu/index', 'cxk/index', 'cxk3/index'] },
    { root: 'pages/rrb', pages: ['index', 'water-fall/index', 'water-fall/post/index'] },
    { root: 'pages/test', pages: ['index'] },
    // ...(process.env.BUILD_ENV === 'prod' ? [] :[{ root: 'pages/_dev', pages: ['index'] }]),
    {
      root: 'pages/technical',
      pages: [
        'mall/shop/index',
        'mall/mine/index',
        'pi/index',
        'time/index',
        'menu/index',
        '_dev/index',
        'bluetooth/index',
        'cssloaders/index',
        'editor/index',
        'map/index',
      ],
    },
    {
      root: 'pages/template-mini',
      pages: [
        'menu/index',
        'lpt/shop/index',
        'lpt/mine/index',
        'lpt/mine-edit/index',
        // 'lpt/order/index',
        'lpt/scenery-item-list/index',
        'lpt/scenery-item-detail/index',
        'lpt/ticket/index',
        'lpt/visitor/index',
        'lpt/preview/index',
      ],
    },
    {
      root: 'pages/tool',
      pages: ['menu/index','order-menu/index','order-menu/edit/index','order-menu/post/index','order-menu/car/index', 'bidding/index', 'bidding/detail/index', 'bidding/post/index', 'scoreboard/index', 'random/index', 'speedTest/index'],
    },
  ],
  requiredPrivateInfos: [
    // 'chooseLocation',
    // 'choosePoi',
    // 'chooseAddress',
    // 'getLocation',
    // 'onLocationChange',
    // 'startLocationUpdate',
    // 'startLocationUpdateBackground',
  ],
  permission: {
    // 'scope.userLocation': {
    //   desc: '你的位置信息将用于小程序内地图功能的位置效果展示',
    // },
  },
  requiredBackgroundModes: ['audio'],
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
  lazyCodeLoading: 'requiredComponents',
});
