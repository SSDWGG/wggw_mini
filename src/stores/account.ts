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
import { uuid } from '@/utils/index';

interface IState {
  templeChoosePostList: IResult[]; // 上传选择的临时资源
  editMemoData: IMemo; // 前端缓存修改备忘录的内容
  editBinddingData: IBiddingItem; // 前端缓存修改备忘录的内容
  memoDataList: IMemo[]; // 前端缓存备忘录的数据（列表+详情）
  userInfo: IUserInfo; // 用户信息
  mainMenuList: IListDataItem[]; // 主菜单
  cxkMenuList: IListDataItem[]; // cxk主菜单
  develeopMenuList: IListDataItem[]; // cxk主菜单
  randomSystemData:any
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
      {
        title: 'WGG',
        Ctitle: 'wgg',
        router: '/pages/wgg/index',
      },
      {
        title: 'Come on',
        Ctitle: '加油吧，少年',
        router: '/pages/going/index',
      },
      {
        title: 'ikun',
        Ctitle: 'kunkun妙妙屋',
        router: '/pages/cxk/index/index',
        bgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/BEDKEKCP-1705543014391shakeKun.gif',
        opacity: 1,
      },
      {
        title: 'random',
        Ctitle: '纠结终结者',
        router: '/pages/random/index',
      },
      {
        title: 'reaction rate',
        Ctitle: '速度反应',
        router: '/pages/speedTest/index',
      },
      {
        title: 'Mood Memo',
        Ctitle: '专属记录',
        router: '/pages/memo/index',
      },
      {
        title: 'Value Curve',
        Ctitle: '价值曲线',
        router: '/pages/bidding/index',
      },
      {
        title: 'developer',
        Ctitle: '开发者专区',
        router: '/pages/developer/index',
      },
      {
        title: 'Score Board',
        Ctitle: '计分板',
        router: '/pages/scoreboard/index',
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
      // {
      //   title: 'For NUT',
      //   Ctitle: '致谢NUT团队',
      //   router: '/pages/sign/index',
      // },
      {
        title: 'PI',
        Ctitle: 'π的计算',
        router: '/pages/pi/index',
       
      },
      // test page
      {
        title: 'Test Page',
        Ctitle: 'TEST PAGE',
        router: '/pages/test/index',
        // isShow: !process.env.buildInfo,
      },
      // dev page
      {
        title: 'Dev IP',
        Ctitle: 'DEVIP',
        router: '/pages/_dev/index',
        isShow: process.env.BUILD_ENV === 'test',
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
        qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CIDJDLID-1709096485764httpklgk.ssdwgg.cn.png'
      },
    ],
    develeopMenuList: [
      {
        title: 'CSS Loaders',
        Ctitle: '新奇的动效css',
        router: '/pages/developer/cssloaders/index',
      },
      {
        title: 'Clock',
        Ctitle: '进度计时',
        router: '/pages/developer/time/index',
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
      
    ],
    editMemoData: {} as IMemo,
    editBinddingData: {} as IBiddingItem,
    templeChoosePostList: [],
    memoDataList: [],
    randomSystemData:{
      浙江省内游: [
        {
          value: 1,
          name: '杭州市',
          id: uuid(),
          childList: [
            { value: 1, name: '千岛湖', id: uuid(), childList: [] },
            { value: 1, name: '西湖圈', id: uuid(), childList: [] },
            { value: 1, name: '灵隐寺', id: uuid(), childList: [] },
            { value: 1, name: '宋城', id: uuid(), childList: [] },
            { value: 1, name: '大运河', id: uuid(), childList: [] },
            { value: 1, name: '龙井村', id: uuid(), childList: [] },
            { value: 1, name: '天目山', id: uuid(), childList: [] },
            { value: 1, name: '大明山', id: uuid(), childList: [] },
            { value: 1, name: '青山湖', id: uuid(), childList: [] },
            { value: 1, name: '湘湖', id: uuid(), childList: [] },
            { value: 1, name: '瑶琳仙境', id: uuid(), childList: [] },
            { value: 1, name: '西溪湿地', id: uuid(), childList: [] },
            { value: 1, name: '南宋御街', id: uuid(), childList: [] },
            { value: 1, name: '龙门古镇', id: uuid(), childList: [] },
            { value: 1, name: '梅城古镇', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '丽水市',
          id: uuid(),
          childList: [
            { value: 1, name: '云和梯田', id: uuid(), childList: [] },
            { value: 1, name: '古堰画乡', id: uuid(), childList: [] },
            { value: 1, name: '缙云仙都', id: uuid(), childList: [] },
            { value: 1, name: '杨家堂村', id: uuid(), childList: [] },
            { value: 1, name: '松庄村', id: uuid(), childList: [] },
            { value: 1, name: '千佛山景区', id: uuid(), childList: [] },
            { value: 1, name: '畲乡之窗', id: uuid(), childList: [] },
            { value: 1, name: '中国青瓷小镇', id: uuid(), childList: [] },
            { value: 1, name: '遂昌金矿', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '宁波市',
          id: uuid(),
          childList: [
            { value: 1, name: '天一阁博物馆', id: uuid(), childList: [] },
            { value: 1, name: '宁波老外滩', id: uuid(), childList: [] },
            { value: 1, name: '东钱湖', id: uuid(), childList: [] },
            { value: 1, name: '四明山', id: uuid(), childList: [] },
            { value: 1, name: '雪窦山', id: uuid(), childList: [] },
            { value: 1, name: '象山影视城', id: uuid(), childList: [] },
            { value: 1, name: '石浦渔港', id: uuid(), childList: [] },
            { value: 1, name: '河姆渡遗', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '温州市',
          id: uuid(),
          childList: [
            { value: 1, name: '雁荡山', id: uuid(), childList: [] },
            { value: 1, name: '南麂岛', id: uuid(), childList: [] },
            { value: 1, name: '江心屿', id: uuid(), childList: [] },
            { value: 1, name: '楠溪江', id: uuid(), childList: [] },
            { value: 1, name: '五马街', id: uuid(), childList: [] },
            { value: 1, name: '廊桥文化', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '嘉兴市',
          id: uuid(),
          childList: [
            { value: 1, name: '嘉兴南湖', id: uuid(), childList: [] },
            { value: 1, name: '西塘', id: uuid(), childList: [] },
            { value: 1, name: '乌镇', id: uuid(), childList: [] },
            { value: 1, name: '月河历史街区', id: uuid(), childList: [] },
            { value: 1, name: '盐官古城', id: uuid(), childList: [] },
            { value: 1, name: '南北湖', id: uuid(), childList: [] },
            { value: 1, name: '子城', id: uuid(), childList: [] },
            { value: 1, name: '梅花洲', id: uuid(), childList: [] },
            { value: 1, name: '嘉兴博物馆', id: uuid(), childList: [] },
            { value: 1, name: '濮院古镇', id: uuid(), childList: [] },
            { value: 1, name: '九龙山', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '湖州市',
          id: uuid(),
          childList: [
            { value: 1, name: '南浔古镇', id: uuid(), childList: [] },
            { value: 1, name: '莫干山', id: uuid(), childList: [] },
            { value: 1, name: '下渚湖', id: uuid(), childList: [] },
            { value: 1, name: '太湖古镇', id: uuid(), childList: [] },
            { value: 1, name: '安吉余村', id: uuid(), childList: [] },
            { value: 1, name: '湖州博物馆', id: uuid(), childList: [] },
            { value: 1, name: '湖州影视城', id: uuid(), childList: [] },
            { value: 1, name: '浙北大峡谷', id: uuid(), childList: [] },
            { value: 1, name: '大竹海', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '绍兴市',
          id: uuid(),
          childList: [
            { value: 1, name: '鲁迅故里', id: uuid(), childList: [] },
            { value: 1, name: '沈园', id: uuid(), childList: [] },
            { value: 1, name: '大佛寺', id: uuid(), childList: [] },
            { value: 1, name: '兰亭', id: uuid(), childList: [] },
            { value: 1, name: '柯岩风景区', id: uuid(), childList: [] },
            { value: 1, name: '西施故里', id: uuid(), childList: [] },
            { value: 1, name: '安昌古镇', id: uuid(), childList: [] },
            { value: 1, name: '穿岩十九峰', id: uuid(), childList: [] },
            { value: 1, name: '诸暨五泄', id: uuid(), childList: [] },
            { value: 1, name: '覆卮', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '金华市',
          id: uuid(),
          childList: [
            { value: 1, name: '横店影视城', id: uuid(), childList: [] },
            { value: 1, name: '诸葛八卦村', id: uuid(), childList: [] },
            { value: 1, name: '百丈潭', id: uuid(), childList: [] },
            { value: 1, name: '双龙洞', id: uuid(), childList: [] },
            { value: 1, name: '牛头山', id: uuid(), childList: [] },
            { value: 1, name: '佛堂老街', id: uuid(), childList: [] },
            { value: 1, name: '仙华山', id: uuid(), childList: [] },
            { value: 1, name: '古子城', id: uuid(), childList: [] },
            { value: 1, name: '游埠古镇', id: uuid(), childList: [] },
            { value: 1, name: '大红岩风景区', id: uuid(), childList: [] },
            { value: 1, name: '方岩风景区', id: uuid(), childList: [] },
            { value: 1, name: '地下长河风景区', id: uuid(), childList: [] },
            { value: 1, name: '金兰古镇', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '衢州市',
          id: uuid(),
          childList: [
            { value: 1, name: '江郎山', id: uuid(), childList: [] },
            { value: 1, name: '廿八都古镇', id: uuid(), childList: [] },
            { value: 1, name: '根宫佛国', id: uuid(), childList: [] },
            { value: 1, name: '龙游石窟', id: uuid(), childList: [] },
            { value: 1, name: '桃源七里景区', id: uuid(), childList: [] },
            { value: 1, name: '仙霞关', id: uuid(), childList: [] },
            { value: 1, name: '药王山', id: uuid(), childList: [] },
            { value: 1, name: '天脊龙', id: uuid(), childList: [] },
            { value: 1, name: '钱江源森林公园', id: uuid(), childList: [] },
            { value: 1, name: '衢州博物馆', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '舟山市',
          id: uuid(),
          childList: [
            { value: 1, name: '普陀山', id: uuid(), childList: [] },
            { value: 1, name: '东极岛', id: uuid(), childList: [] },
            { value: 1, name: '朱家尖', id: uuid(), childList: [] },
            { value: 1, name: '岱山岛', id: uuid(), childList: [] },
            { value: 1, name: '衢山岛', id: uuid(), childList: [] },
            { value: 1, name: '花鸟岛', id: uuid(), childList: [] },
            { value: 1, name: '枸杞岛', id: uuid(), childList: [] },
            { value: 1, name: '嵊山岛', id: uuid(), childList: [] },
            { value: 1, name: '秀山岛', id: uuid(), childList: [] },
            { value: 1, name: '桃花岛', id: uuid(), childList: [] },
            { value: 1, name: '泗礁岛', id: uuid(), childList: [] },
          ],
        },
        {
          value: 1,
          name: '舟山市',
          id: uuid(),
          childList: [
            { value: 1, name: '紫阳街', id: uuid(), childList: [] },
            { value: 1, name: '天台山', id: uuid(), childList: [] },
            { value: 1, name: '神仙居', id: uuid(), childList: [] },
            { value: 1, name: '蛇蟠岛', id: uuid(), childList: [] },
            { value: 1, name: '大陈岛', id: uuid(), childList: [] },
            { value: 1, name: '温岭石塘', id: uuid(), childList: [] },
            { value: 1, name: '七彩小镇', id: uuid(), childList: [] },
            { value: 1, name: '水桶岙', id: uuid(), childList: [] },
            { value: 1, name: '括苍山', id: uuid(), childList: [] },
            { value: 1, name: '石梁飞瀑', id: uuid(), childList: [] },
          ],
        },
      ],
      仅是否: [
        { value: 1, name: '是', id: uuid(), childList: [] },
        { value: 1, name: '否', id: uuid(), childList: [] },
      ],
      早餐: [
        { value: 1, name: '拌面', id: uuid(), childList: [] },
        { value: 1, name: '油条', id: uuid(), childList: [] },
        { value: 1, name: '豆浆', id: uuid(), childList: [] },
        { value: 1, name: '面包', id: uuid(), childList: [] },
        { value: 1, name: '小笼包', id: uuid(), childList: [] },
        { value: 1, name: '包子', id: uuid(), childList: [] },
        { value: 1, name: '煎包', id: uuid(), childList: [] },
        { value: 1, name: '鸡蛋', id: uuid(), childList: [] },
        { value: 1, name: '粽子', id: uuid(), childList: [] },
        { value: 1, name: '粥类', id: uuid(), childList: [] },
        { value: 1, name: '煎饺', id: uuid(), childList: [] },
        { value: 1, name: '蛋饼', id: uuid(), childList: [] },
        { value: 1, name: '麻球', id: uuid(), childList: [] },
        { value: 1, name: '汤面', id: uuid(), childList: [] },
        { value: 1, name: 'kfc', id: uuid(), childList: [] },
        { value: 1, name: '麦当劳', id: uuid(), childList: [] },
      ],
      午餐: [
        { value: 1, name: '黄焖鸡米饭', id: uuid(), childList: [] },
        { value: 1, name: '小炒家常菜', id: uuid(), childList: [] },
        { value: 1, name: '煲仔饭', id: uuid(), childList: [] },
        { value: 1, name: '冒烤鸭', id: uuid(), childList: [] },
        { value: 1, name: '酸菜鱼', id: uuid(), childList: [] },
        { value: 1, name: '花甲米线', id: uuid(), childList: [] },
        { value: 1, name: '酸辣粉', id: uuid(), childList: [] },
        { value: 1, name: '口水鸡', id: uuid(), childList: [] },
        { value: 1, name: '轻食沙拉', id: uuid(), childList: [] },
        { value: 1, name: '盖饭', id: uuid(), childList: [] },
        { value: 1, name: '咬不得生煎', id: uuid(), childList: [] },
        { value: 1, name: '咖喱蛋包饭', id: uuid(), childList: [] },
        { value: 1, name: '麻辣烫', id: uuid(), childList: [] },
        { value: 1, name: '水饺', id: uuid(), childList: [] },
        { value: 1, name: '饿着不吃', id: uuid(), childList: [] },
        { value: 1, name: '疯狂星期四', id: uuid(), childList: [] },
        { value: 1, name: '必胜客', id: uuid(), childList: [] },
        { value: 1, name: '茶餐厅精选', id: uuid(), childList: [] },
      ],
      晚餐: [
        { value: 1, name: '黄焖鸡米饭', id: uuid(), childList: [] },
        { value: 1, name: '小炒家常菜', id: uuid(), childList: [] },
        { value: 1, name: '煲仔饭', id: uuid(), childList: [] },
        { value: 1, name: '冒烤鸭', id: uuid(), childList: [] },
        { value: 1, name: '酸菜鱼', id: uuid(), childList: [] },
        { value: 1, name: '花甲米线', id: uuid(), childList: [] },
        { value: 1, name: '酸辣粉', id: uuid(), childList: [] },
        { value: 1, name: '口水鸡', id: uuid(), childList: [] },
        { value: 1, name: '轻食沙拉', id: uuid(), childList: [] },
        { value: 1, name: '盖饭', id: uuid(), childList: [] },
        { value: 1, name: '咬不得生煎', id: uuid(), childList: [] },
        { value: 1, name: '咖喱蛋包饭', id: uuid(), childList: [] },
        { value: 1, name: '麻辣烫', id: uuid(), childList: [] },
        { value: 1, name: '水饺', id: uuid(), childList: [] },
        { value: 1, name: '饿着不吃', id: uuid(), childList: [] },
        { value: 1, name: '疯狂星期四', id: uuid(), childList: [] },
        { value: 1, name: '必胜客', id: uuid(), childList: [] },
        { value: 1, name: '茶餐厅精选', id: uuid(), childList: [] },
      ],
      奶茶咖啡: [
        { value: 1, name: '茶百道', id: uuid(), childList: [] },
        { value: 1, name: '古茗', id: uuid(), childList: [] },
        { value: 1, name: '蜜雪冰城', id: uuid(), childList: [] },
        { value: 1, name: '一点点', id: uuid(), childList: [] },
        { value: 1, name: '星巴克', id: uuid(), childList: [] },
        { value: 1, name: '霸王茶姬', id: uuid(), childList: [] },
        { value: 1, name: '喜茶', id: uuid(), childList: [] },
        { value: 1, name: '手打柠檬茶', id: uuid(), childList: [] },
        { value: 1, name: '手冲咖啡', id: uuid(), childList: [] },
        { value: 1, name: '库迪咖啡', id: uuid(), childList: [] },
        { value: 1, name: '瑞幸咖啡', id: uuid(), childList: [] },
        { value: 1, name: '茶话弄', id: uuid(), childList: [] },
        { value: 1, name: '乐乐茶', id: uuid(), childList: [] },
      ],
      下馆子: [
        { value: 1, name: '火锅类', id: uuid(), childList: [] },
        { value: 1, name: '烧烤类', id: uuid(), childList: [] },
        { value: 1, name: '烤肉类', id: uuid(), childList: [] },
        { value: 1, name: '自助类', id: uuid(), childList: [] },
        { value: 1, name: '川菜类', id: uuid(), childList: [] },
        { value: 1, name: '湘菜类', id: uuid(), childList: [] },
        { value: 1, name: '粤菜类', id: uuid(), childList: [] },
        { value: 1, name: '江浙菜类', id: uuid(), childList: [] },
        { value: 1, name: '西餐', id: uuid(), childList: [] },
        { value: 1, name: '日料', id: uuid(), childList: [] },
        { value: 1, name: '韩料', id: uuid(), childList: [] },
        { value: 1, name: '泰式类', id: uuid(), childList: [] },
        { value: 1, name: '新疆菜类', id: uuid(), childList: [] },
        { value: 1, name: '新加坡菜类', id: uuid(), childList: [] },
        { value: 1, name: '小炒类', id: uuid(), childList: [] },
        { value: 1, name: '烤鸭类', id: uuid(), childList: [] },
        { value: 1, name: '海鲜类', id: uuid(), childList: [] },
        { value: 1, name: '小龙虾', id: uuid(), childList: [] },
        { value: 1, name: '素食类', id: uuid(), childList: [] },
      ],
    }
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
