/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { IResult } from '@/components/selectMedia';
import { defineStore } from 'pinia';
import type { IUserInfo } from '@/apis/mine/model';
import type { IListDataItem } from 'types/global';
interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  userInfo: IUserInfo; // 用户信息
  mainMenuList: IListDataItem[]; // 主菜单
}

export const useAccountStore = defineStore('account', {
  // eslint-disable-next-line max-lines-per-function
  state: (): IState => ({
    userInfo: {
      username: '',
      avatarurl: '',
      openid: '',
      phone: '',
      email: '',
    },
    mainMenuList: [
      // wgg个人主页
      {
        title: 'WGG',
        Ctitle: 'wgg',
        router: '/pages/wgg/index',
      },
    ],

    templeChoosePostList: [],
  }),
  actions: {},
});
