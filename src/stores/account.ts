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

interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  editMemoData: IMemo; // 前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; // 前端缓存修改备忘录的内容
  memoDataList: IMemo[]; // 前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo; // 用户信息
  mainMenuList: IListDataItem[]; // 主菜单
  cxkMenuList: IListDataItem[]; // cxk主菜单
  develeopMenuList: IListDataItem[]; // cxk主菜单
  toolMenuList: IListDataItem[]; // tool主菜单
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
      // 励志主页
      {
        title: 'Come on',
        Ctitle: '加油吧，少年',
        router: '/pages/going/index',
      },
       // 备忘录入口
       {
        title: 'Mood Memo',
        Ctitle: '专属记录',
        router: '/pages/memo/index',
      },
      // 价值曲线入口
      {
        title: 'Value Curve',
        Ctitle: '价值曲线',
        router: '/pages/bidding/index',
      },
       // 娱乐区入口
       {
        title: 'ikun',
        Ctitle: '娱乐区',
        router: '/pages/cxk/index/index',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/BEDKEKCP-1705543014391shakeKun.gif',
        opacity: 1,
      },
      // 工具入口
      {
        title: 'tool',
        Ctitle: '工具区',
        router: '/pages/tool/index',
      },
      // 开发者入口
      {
        title: 'developer',
        Ctitle: '开发者区',
        router: '/pages/developer/index',
      },
    ],
    toolMenuList: [
      {
        title: 'Score Board',
        Ctitle: '计分板',
        router: '/pages/tool/scoreboard/index',
      },
      {
        title: 'PI',
        Ctitle: 'π的计算',
        router: '/pages/tool/pi/index',
      },
      {
        title: 'random',
        Ctitle: '纠结终结者',
        router: '/pages/tool/random/index',
      },
      {
        title: 'reaction rate',
        Ctitle: '速度反应',
        router: '/pages/tool/speedTest/index',
      },
    ],
    cxkMenuList: [
      {
        title: 'IKun',
        Ctitle: '小黑子',
        router: '/pages/cxk/cxk/index',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
      },
      {
        title: 'IKun',
        Ctitle: '坤歌台',
        router: '/pages/cxk/cxk3/index',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
      },
      {
        title: 'Shake Kun',
        Ctitle: '摇坤',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/BEDKEKCP-1705543014391shakeKun.gif',
        opacity: 1,
        linkUrl: 'http://ikunqqq.ssdwgg.cn',
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FJHBFEAA-1706331358049ikunqqq.png',
      },
      {
        title: 'Kun Str',
        Ctitle: '字符坤',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IIOMLFKE-1705543014391strkun.gif',
        opacity: 1,
        linkUrl: 'http://ikunstr.ssdwgg.cn',
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GIKJIPEA-1706331381805ikunstr.png',
      },
      {
        title: 'Game',
        Ctitle: '坤了个坤',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NBFNNNPD-1709096485764klgk.gif',
        opacity: 1,
        linkUrl: 'http://klgk.ssdwgg.cn',
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CIDJDLID-1709096485764httpklgk.ssdwgg.cn.png',
      },
      {
        title: 'Game',
        Ctitle: '消消乐旋转版本',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HEPJCNMO-1705543014391game1.gif',
        opacity: 1,
        linkUrl: 'http://hextris.ssdwgg.cn',
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IMDCHDJP-1706331384525hextris.png',
      },
      {
        title: 'Game',
        Ctitle: '兔了个兔',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NICPAEIK-1705543014391tlgt.gif',
        opacity: 1,
        linkUrl: 'http://xlgx.ssdwgg.cn',
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/MOCAPJJK-1706331446705xlgx.png',
      },
    ],
    develeopMenuList: [
      // dev page
      {
        title: 'Dev IP',
        Ctitle: 'DEVIP',
        router: '/pages/developer/_dev/index',
        isShow: process.env.BUILD_ENV === 'test',
      },
      {
        title: 'CSS Loaders',
        Ctitle: '新奇的动效css',
        router: '/pages/developer/cssloaders/index',
      },
      {
        title: 'More Plugin',
        Ctitle: '多种组件',
        router: '/pages/developer/editor/index',
      },
      {
        title: 'Water Fall',
        Ctitle: '瀑布流照片墙',
        router: '/pages/developer/waterfall/index',
      },
      {
        title: 'map',
        Ctitle: '足迹地图',
        router: '/pages/developer/map/index',
      },
      // {
      //   title: 'mall',
      //   Ctitle: '通用商城',
      //   router: '/pages/developer/mall/index',
      // },
      {
        title: 'bluetooth',
        Ctitle: '蓝牙检测',
        router: '/pages/developer/bluetooth/index',
      },
      {
        title: 'For NUT',
        Ctitle: '致谢NUT团队',
        router: '/pages/developer/sign/index',
      },
    ],
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
    /**
     * 移除一个 image / video
     * @param {string} firstId 外层
     * @param {string} secondId 详细id 内层 (不传该参数则删除整条记录)
     */
    removeMemoItem(firstId: string, secondId = '') {
      const memo = this.memoDataList.find((i) => i.memoId === firstId)!;
      if (secondId) {
        const index = memo.list.findIndex((i) => i.memoResId === secondId);
        memo.list.splice(index, 1);
        // 如果删完后无内容，则进行删除相册
        if (!memo.list.length) {
          const memoIndex = this.memoDataList.findIndex((i) => i.memoId === memo.memoId);
          if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
          deleteMemo({ memoId: firstId });
        } else {
          const parmas = cloneDeep(memo) as IMemo;
          (parmas.list as any) = JSON.stringify(parmas.list);
          updateMemo(parmas);
        }
      } else {
        const memoIndex = this.memoDataList.findIndex((i) => i.memoId === memo.memoId);
        if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
        deleteMemo({ memoId: firstId });
      }
    },
  },
});
