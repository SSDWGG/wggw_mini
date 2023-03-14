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
      this.visible = visible;
    }
  }
});

export const tabList: Taro.TabBarItem[] = [
  {
    pagePath: 'pages/menu/index', 
    text: 'Memo',
   
  }, 
  {
    pagePath: 'pages/mine/index', 
    text: 'Mine',
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