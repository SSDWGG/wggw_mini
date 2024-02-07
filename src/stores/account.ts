import { IBiddingItem } from "@/apis/kunChart/model";
import { deleteMemo, updateMemo } from "@/apis/memo";
import { IMemo } from "@/apis/memo/model";
import { bindPhone, updateUser, wxLogin } from "@/apis/mine";
import { IResult } from "@/components/selectMedia";
import { defineStore } from "pinia";
import cloneDeep from "lodash/cloneDeep";
import { IUserInfo } from "@/apis/mine/model";
import { IListDataItem } from "types/global";

interface IState {
  templeChoosePostList: IResult[]; //上传选择的临时资源
  editMemoData: IMemo; //前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; //前端缓存修改备忘录的内容
  memoDataList: IMemo[]; //前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo; //用户信息
  mainMenuList: IListDataItem[] //主菜单
  cxkMenuList: IListDataItem[] //cxk主菜单
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
    mainMenuList: [
      {
        title: "WGG",
        Ctitle: "wgg",
        router: "/pages/wgg/index",
      },
      {
        title: "ikun",
        Ctitle: "kunkun妙妙屋",
        router: "/pages/cxk/index/index",
        bgSrc:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/BEDKEKCP-1705543014391shakeKun.gif',
        opacity:1,
      },
      {
        title: "reaction rate",
        Ctitle: "速度反应",
        router: "/pages/speedTest/index",
      },
      {
        title: "Mood Memo",
        Ctitle: "心情记录",
        router: "/pages/memoAndMine/index",
      },
      {
        title: "Value Curve",
        Ctitle: "价值曲线",
        router: "/pages/bidding/index",
      },
      {
        title: "developer",
        Ctitle: "开发者专区",
        router: "/pages/developer/index",
      },
      {
        title: "Score Board",
        Ctitle: "计分板",
        router: "/pages/scoreboard/index",
      },
      
    ],
    cxkMenuList: [
      {
        title: "IKun",
        Ctitle: "小黑子",
        router: "/pages/cxk/cxk/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
      },
      {
        title: "IKun",
        Ctitle: "坤歌台",
        router: "/pages/cxk/cxk3/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
      },
      {
        title: "Shake Kun",
        Ctitle: "摇坤",
        router: "/pages/cxk/cxk2/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/BEDKEKCP-1705543014391shakeKun.gif",
        opacity: 1,
        linkUrl: "http://ikunqqq.ssdwgg.cn",
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FJHBFEAA-1706331358049ikunqqq.png'
      },
      {
        title: "Kun Str",
        Ctitle: "字符坤",
        router: "/pages/cxk/cxk4/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/IIOMLFKE-1705543014391strkun.gif",
        opacity: 1,
        linkUrl: "http://ikunstr.ssdwgg.cn",
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GIKJIPEA-1706331381805ikunstr.png'
      },
      {
        title: "Game",
        Ctitle: "消消乐旋转版本",
        router: "/pages/cxk/cxk5/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HEPJCNMO-1705543014391game1.gif",
        opacity: 1,
        linkUrl: "http://hextris.ssdwgg.cn",
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IMDCHDJP-1706331384525hextris.png'
      },
      {
        title: "Game",
        Ctitle: "兔了个兔",
        router: "/pages/cxk/cxk6/index",
        bgSrc:
          "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/NICPAEIK-1705543014391tlgt.gif",
        opacity: 1,
        linkUrl: "http://xlgx.ssdwgg.cn",
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MOCAPJJK-1706331446705xlgx.png'
      },
    ],
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
