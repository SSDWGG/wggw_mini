import { IBiddingItem } from "@/apis/kunChart/model";
import { deleteMemo, updateMemo } from "@/apis/memo";
import { IMemo } from "@/apis/memo/model";
import { bindPhone, updateUser, wxLogin } from "@/apis/mine";
import { IResult } from "@/components/selectMedia";
import { defineStore } from "pinia";
import cloneDeep from "lodash/cloneDeep";
import { IUserInfo } from "@/apis/mine/model";

interface IState {
  biddingKunDefaultList: Array<IBiddingItem>; //竞拍本地列表（坤版）
  templeChoosePostList: IResult[]; //上传选择的临时资源
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
    templeChoosePostList: [],
    memoDataList: [],
    biddingKunDefaultList: [
      // {
      //   shopId:'1',
      //   imgSrc:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
      //   title:'野生kun',
      //   kcDesc:'守护最好的野生坤，把价格打下去家人们！！',
      //   priceLine:[
      //     {
      //       time:'2024-1-7 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:1
      //     },
      //     {
      //       time:'2024-1-8 2:30:00',
      //       uid:'2',
      //       uName:'护坤大使',
      //       price:100
      //     },
      //   ]
      // },
    ],
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
          const parmas = cloneDeep(memo);
          parmas.list = JSON.stringify(parmas.list);
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
