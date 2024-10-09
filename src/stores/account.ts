/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { IBiddingItem } from '@/apis/kunChart/model';
import { deleteMemo, updateMemo } from '@/apis/memo';
import type { IMemo } from '@/apis/memo/model';
import { bindPhone, updateUser, wxLogin } from '@/apis/mine';
import type { IResult } from '@/components/selectMedia';
import { defineStore } from 'pinia';
import cloneDeep from 'lodash/cloneDeep';
import type { IUserInfo } from '@/apis/mine/model';
import type { IListDataItem } from 'types/global';
import { isPermissionsToWx } from '../utils';

interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  editMemoData: IMemo; // 前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; // 前端缓存修改备忘录的内容
  memoDataList: IMemo[]; // 前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo; // 用户信息
  mainMenuList: IListDataItem[]; // 主菜单
  cxkMenuList: IListDataItem[]; // cxk主菜单
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
      // 业主投票入口
      {
        title: 'ticket',
        Ctitle: '业主投票',
        router: '/pages/login/index',
      },


    ],
    cxkMenuList: [],
    editMemoData: {} as IMemo,
    editBinddingData: {} as IBiddingItem,
    templeChoosePostList: [],
    memoDataList: [],
  }),
  actions: {
    async bindPhone(phoneCode) {
      const res = await bindPhone(phoneCode);
      this.userInfo = res;
    },
    // 箭头函数中没有this，如果想使用this，请不要使用箭头函数
    async login() {
      const res = await wxLogin();
      this.userInfo = res;
    },
    // 函数不具备响应式，使用时需要注意不要在模板中使用
    isLogin() {
      return this.userInfo.openid.length !== 0;
    },
    async updateUser() {
      return await updateUser(this.userInfo);
    },
  },
});
