import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';

export const useTabBarStore = defineStore('tabbar', {
  state: () => ({
    selected: 0,
    visible: true,
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
      console.log('设置tab显隐',visible);
      
      this.visible = visible;
    }
  }
});

// 请同步 app.config.ts tabBar.list
export const tabList: Taro.TabBarItem[] = [
  {
    pagePath: 'pages/album/index', // 请确保 /pages/album/index.vue has definePageConfig.usingComponents
    text: 'Menu',
    iconPath: '../assets/images/tabbar/icon-tabbar-mine.png',
    selectedIconPath: '../assets/images/tabbar/icon-tabbar-mine-active.png',
  }, 
  {
    pagePath: 'pages/mine/index', // 请确保 /pages/mine/index has definePageConfig.usingComponents
    text: 'Mine',
    iconPath: '../assets/images/tabbar/icon-tabbar-mine.png',
    selectedIconPath: '../assets/images/tabbar/icon-tabbar-mine-active.png',
  },
];

/**
 * 修正 tabbar selected
 * the path: 'pages/home/index' || '/pages/home/index'
*/
export const adjustSelected = (path: string) => {
  const index = tabList.findIndex(i => i.pagePath === path || `/${i.pagePath}` === path);
  if (index >= 0) {
    const tabbarStore = useTabBarStore();
    tabbarStore.setSelected(index);
  }
};