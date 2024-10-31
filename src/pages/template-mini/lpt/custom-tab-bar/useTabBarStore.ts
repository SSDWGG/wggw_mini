import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import icon1 from '@/assets/images/tabbar/icon-tabbar-album.png';
import icon1active from '@/assets/images/tabbar/icon-tabbar-album-active.png';
import icon2 from '@/assets/images/tabbar/icon-tabbar-mine.png';
import icon2active from '@/assets/images/tabbar/icon-tabbar-mine-active.png';

// 请同步 app.config.ts tabBar.list
export const tabList: Taro.TabBarItem[] = [

  {
    pagePath: 'pages/template-mini/lpt/shop/index',
    text: '商城',
    iconPath: icon1,
    selectedIconPath: icon1active,
  },
  {
    pagePath: 'pages/template-mini/lpt/mine/index',
    text: '个人中心',
    iconPath: icon2,
    selectedIconPath:icon2active,
  },
];

export const useTabBarStore = defineStore('tabbarLpt', {
  state: () => ({
    selected: 0,
    visible: true,
    tabList: tabList,
    isWatching: false, // 辅助工具变量，内部使用
  }),
  getters: {
    height: (state) => state.visible ? Taro.pxTransform(50) : '0px',
  },
  actions: {
    setSelected(index: number) {
      if (this.selected === index) return;
      this.selected = index;
    },
    setVisible(visible: boolean) {
      this.visible = visible;
    },
    /**
     * 修正 tabbar selected
     * the path: 'pages/home/index' || '/pages/home/index'
    */
    adjustSelected(path: string) {
      const index = this.tabList.findIndex(i => i.pagePath === path || `/${i.pagePath}` === path);
      if (index >= 0) {
        this.setSelected(index);
      }
    },
    watchIdentity() {
      if (this.isWatching) return; // 只监听一次，custom-tab-bar 作为组件 使用在多个页面，防止每个页面都监听这里做下处理
      this.isWatching = true;
    },
  }
});

/**
 * 修正 tabbar selected
 * the path: 'pages/home/index' || '/pages/home/index'
*/
export const adjustSelected = (path: string) => {
  const tabbarStore = useTabBarStore();
  const index = tabbarStore.tabList.findIndex(i => i.pagePath === path || `/${i.pagePath}` === path);
  if (index >= 0) {
    tabbarStore.setSelected(index);
  }
};
