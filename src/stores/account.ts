import { IBiddingItem } from "@/apis/kunChart/model";
import { deleteMemo, updateMemo } from "@/apis/memo";
import { IMemo } from "@/apis/memo/model";
import { bindPhone, updateUser, wxLogin } from "@/apis/mine";
import { IResult } from "@/components/selectMedia";
import { defineStore } from "pinia";
import cloneDeep from "lodash/cloneDeep";
import { IUserInfo } from "@/apis/mine/model";

interface IState {
  templeChoosePostList: IResult[]; //上传选择的临时资源
  editMemoData: IMemo; //前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; //前端缓存修改备忘录的内容
  memoDataList: IMemo[]; //前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo;
}

export const useAccountStore = defineStore("account", {
  state: (): IState => ({
    userInfo: {
      username: "",
      avatarurl: "",
      openid: "",
      phone: "",
      email: "",
    },
    editMemoData:{} as IMemo ,
    editBinddingData:{} as IBiddingItem ,
    templeChoosePostList: [],
    memoDataList: []
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
    // 函数不具备响应式，使用时需要注意
    isLogin() {
      return this.userInfo.openid.length !== 0;
    },
    async updateUser() {
      return await updateUser(this.userInfo);
    },
    /**
     * 移除一个 image / video
     * @param {string} firstId 外层
     * @param {string} secondId 详细id 内层 (不传该参数则删除整条记录)
     */
    removeMemoItem(firstId: string, secondId = "") {
      const memo = this.memoDataList.find((i) => i.memoId === firstId)!;
      if (!!secondId) {
        const index = memo.list.findIndex((i) => i.memoResId === secondId);
        memo.list.splice(index, 1);
        // 如果删完后无内容，则进行删除相册
        if (!memo.list.length) {
          const memoIndex = this.memoDataList.findIndex(
            (i) => i.memoId === memo.memoId
          );
          if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
          deleteMemo({ memoId: firstId });
        } else {
          const parmas = cloneDeep(memo) as IMemo;
          (parmas.list as any )= JSON.stringify(parmas.list);
          updateMemo(parmas);
        }
      } else {
        const memoIndex = this.memoDataList.findIndex(
          (i) => i.memoId === memo.memoId
        );
        if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
        deleteMemo({ memoId: firstId });
      }
    },
  },
});
