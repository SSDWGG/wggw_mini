// 账号数据相关
import { defineStore } from 'pinia';

interface IState {
  showGuidePop:boolean,
}

export const useAccountStore = defineStore('account', {
  state: (): IState => ({
  
    showGuidePop:true,
  }),
  actions: {
    // 初始化 检测登录
    // checkLogin() {
    //   const isLogined = Boolean(getStorageSync('yunxiaoding-token'));
    //   if (isLogined) {
    //     this.isLogined = true;
    //     this.showfreePop = false;
    //     this.getAccountInfo(true);
    //   }
    //   setTimeout(() =>{
    //     this.checkMember();
    //   },200);
    //   this.trendsMember();
    // },

  },
});
