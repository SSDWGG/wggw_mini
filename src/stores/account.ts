/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { IResult } from '@/components/selectMedia';
import { defineStore } from 'pinia';
import type { IListDataItem } from 'types/global';
interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  mainMenuList: IListDataItem[]; // 主菜单
}

export const useAccountStore = defineStore('account', {
  // eslint-disable-next-line max-lines-per-function
  state: (): IState => ({

    mainMenuList: [
      {
        title: 'going',
        Ctitle: 'going',
        router: '/pages/going/index',
      },
    ],

    templeChoosePostList: [],
  }),
  actions: {},
});
