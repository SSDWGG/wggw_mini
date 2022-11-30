import { defineStore } from 'pinia';

interface IState {
  showTabs:boolean, //是否展示底部tabs
  showfirstTimePageNoticeBar:boolean, //是否展示头部公告栏tabs

  test:string
}

export const useAccountStore = defineStore('account', {
  state: (): IState => ({
    showTabs:true,
    showfirstTimePageNoticeBar:true,
    test:''
  }),
  actions: {
  },
});
