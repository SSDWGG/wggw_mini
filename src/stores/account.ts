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
import { cdnHost,ossFilePrePath } from '@/utils/env';

interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  editMemoData: IMemo; // 前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; // 前端缓存修改备忘录的内容
  memoDataList: IMemo[]; // 前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo; // 用户信息
  mainMenuList: IListDataItem[]; // 主菜单
  technicalMenuList: IListDataItem[]; // 技术验证区菜单
  templateMiniMenuList: IListDataItem[]; // 小程序模板区菜单
  tooMenuList: IListDataItem[]; // 工具区菜单
  cxkMenuList: IListDataItem[]; // cxk主菜单
  rrbMenuList: IListDataItem[]; // rrb主菜单
  vistorDataList: IMemo[]; // 前端缓存备忘录的数据（列表+详情）

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
      // fjl入口
      {
        title: 'RRB',
        Ctitle: 'RRB',
        router: '/pages/rrb/index',
      },
      // 娱乐区入口
      {
        title: 'ikun',
        Ctitle: '娱乐区',
        router: '/pages/cxk/index/index',
        bgSrc: `${cdnHost}${ossFilePrePath}/BEDKEKCP-1705543014391shakeKun.gif`,
        opacity: 1,
      },

      {
        title: 'Technical',
        Ctitle: '技术验证',
        router: '/pages/technical/menu/index',
      },
      {
        title: 'Tool',
        Ctitle: '工具',
        router: '/pages/tool/menu/index',
      },
      {
        title: 'Template',
        Ctitle: '小程序模板',
        router: '/pages/template-mini/menu/index',
      },
    ],
    technicalMenuList:[
      {
        title: 'Dev',
        Ctitle: '修改IP',
        router: '/pages/technical/_dev/index',
      },
      {
        title: 'Time',
        Ctitle: '计时',
        router: '/pages/technical/time/index',
      },
      {
        title: 'PI',
        Ctitle: 'π的计算',
        router: '/pages/technical/pi/index',
      },
      {
        title: 'CSS Loaders',
        Ctitle: '动效css',
        router: '/pages/technical/cssloaders/index',
      },
      {
        title: 'E-CHART',
        Ctitle: '图表',
        router: '/pages/technical/editor/index',
      },

      {
        title: 'map',
        Ctitle: '足迹地图',
        router: '/pages/technical/map/index',
      },
      {
        title: 'mall',
        Ctitle: '通用商城',
        router: '/pages/technical/mall/shop/index',
      },
      {
        title: 'bluetooth',
        Ctitle: '蓝牙检测',
        router: '/pages/technical/bluetooth/index',
      },
    ],
    templateMiniMenuList:[
      {
        title: 'LPT',
        Ctitle: '旅拍通',
        router: '/pages/template-mini/lpt/shop/index',
      },
    ],
    tooMenuList:[
       // 价值曲线入口


      {
        title: 'random',
        Ctitle: '纠结终结者',
        router: '/pages/tool/random/index',
      },
      {
        title: 'Order Menu',
        Ctitle: '点菜',
        router: '/pages/tool/order-menu/index',
      },
      {
        title: 'reaction rate',
        Ctitle: '速度反应',
        router: '/pages/tool/speedTest/index',
      },
      {
        title: 'Score Board',
        Ctitle: '计分板',
        router: '/pages/tool/scoreboard/index',
      },
      {
        title: 'Value Curve',
        Ctitle: '价值曲线',
        router: '/pages/tool/bidding/index',
      },

    ],
    rrbMenuList:[
      {
        title: 'Photo wall',
        Ctitle: '照片墙',
        router: '/pages/rrb/water-fall/index',
      },
    ],
    cxkMenuList: [
      {
        title: 'IKun',
        Ctitle: '小黑子',
        router: '/pages/cxk/cxk/index',
        bgSrc: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
      },
      {
        title: 'IKun',
        Ctitle: '坤歌台',
        router: '/pages/cxk/cxk3/index',
        bgSrc: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
        isShow: isPermissionsToWx(),
      },
      {
        title: 'Shake Kun',
        Ctitle: '摇坤',
        bgSrc: `${cdnHost}${ossFilePrePath}/BEDKEKCP-1705543014391shakeKun.gif`,
        opacity: 1,
        linkUrl: 'http://ikunqqq.ssdwgg.cn',
        qrSrc: `${cdnHost}${ossFilePrePath}/FJHBFEAA-1706331358049ikunqqq.png`,
      },
      {
        title: 'Kun Str',
        Ctitle: '字符坤',
        bgSrc: `${cdnHost}${ossFilePrePath}/IIOMLFKE-1705543014391strkun.gif`,
        opacity: 1,
        linkUrl: 'http://ikunstr.ssdwgg.cn',
        qrSrc: `${cdnHost}${ossFilePrePath}/GIKJIPEA-1706331381805ikunstr.png`,
      },
      {
        title: 'Game',
        Ctitle: '坤了个坤',
        bgSrc: `${cdnHost}${ossFilePrePath}/NBFNNNPD-1709096485764klgk.gif`,
        opacity: 1,
        linkUrl: 'http://klgk.ssdwgg.cn',
        qrSrc: `${cdnHost}${ossFilePrePath}/CIDJDLID-1709096485764httpklgk.ssdwgg.cn.png`,
      },
      {
        title: 'Game',
        Ctitle: '消消乐旋转版本',
        bgSrc: `${cdnHost}${ossFilePrePath}/HEPJCNMO-1705543014391game1.gif`,
        opacity: 1,
        linkUrl: 'http://hextris.ssdwgg.cn',
        qrSrc: `${cdnHost}${ossFilePrePath}/IMDCHDJP-1706331384525hextris.png`,
      },
      {
        title: 'Game',
        Ctitle: '兔了个兔',
        bgSrc: `${cdnHost}${ossFilePrePath}/NICPAEIK-1705543014391tlgt.gif`,
        opacity: 1,
        linkUrl: 'http://xlgx.ssdwgg.cn',
        qrSrc: `${cdnHost}${ossFilePrePath}/MOCAPJJK-1706331446705xlgx.png`,
      },
    ],
    editMemoData: {} as IMemo,
    editBinddingData: {} as IBiddingItem,
    templeChoosePostList: [],
    memoDataList: [],
    vistorDataList: [],
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
