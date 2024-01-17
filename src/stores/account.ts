import { IMemo } from "@/apis/memo/model";
import { IProgress } from "@/apis/progress/model";
import { IResult } from "@/components/selectMedia";
import Taro from "@tarojs/taro";
import { defineStore } from "pinia";
  
export interface IPriceLineItem {
  // 报价时间
  time:string,
  // 报价人唯一Id
  uid:string,
  // 报价人名称
  uName:string,
  // 价格
  price:Number
}

interface IBiddingItem {
  shopId:string
  imgSrc:string
  title:string
  dec:string
  priceLine:Array< IPriceLineItem >
}

interface IState {
  username:string,
  waterMark:string,
  uuid: string; //账号唯一id
  avatarurl:string, //用户头像
  showTabs: boolean; //是否展示底部tabs
  showfirstTimePageNoticeBar: boolean; //是否展示头部公告栏tabs
  templeChoosePostList: IResult[]; //上传选择的临时资源
  NoticeBarText: string; //头部公告栏自定义内容
  NoticeBarDataSaveText:string,//memo数据安全提示公告栏
  memoDataList: IMemo[]; //备忘录的数据
  selfProgress:IProgress; //用户设置的个性化时间进度


  isLogined:boolean; //是否登录
  biddingDefaultList:Array<IBiddingItem>; //竞拍本地列表
}

export const useAccountStore = defineStore("account", {
  state: (): IState => ({
    username:'WGG的妙妙屋',
    waterMark:'WGGW',
    uuid: "0",
    avatarurl:"https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg",
    showTabs: true,
    showfirstTimePageNoticeBar: true,
    templeChoosePostList: [],
    NoticeBarText: `
    Do not go gentle into that good night,
    Old age should burn and rave at close of day;
    Rage, rage against the dying of the light.
    Though wise men at their end know dark is right,
    Because their words had forked no lightning they
    Do not go gentle into that good night.`,
    NoticeBarDataSaveText:`您的账号数据内容只存储在您的设备硬件上，他人以及其他设备无法访问，
    如果您将本小程序删除，微信团队将会清空本程序内的所有的记录数据，
    请妥善保存您的数据——wggw开发者 `,
    memoDataList: [], 
    selfProgress:{
      progressId:'',          //唯一id
      computedNum:0,        //计算的单位
      contentBgImg:'',        //背景图片
      onAfterText:'',        //结束后的回调事件展示的内容文案  
      gradientColorStart:'',  //进度条渐变颜色start
      gradientColorEnd:'',  //进度条渐变颜色end
      strokeWidth:0,      //进度条粗细
      format:'',           //时间展示形式
      contentOverText: '', //内容区域结束后的文案
      contentTitleText: '',  //title文案
    },

    isLogined:false,
    biddingDefaultList:[
      {
       
        shopId:'1',
        imgSrc:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
        title:'野生kun',
        dec:'守护最好的坤，把价格打下去家人们！！',
        priceLine:[
          {
            time:'2024-1-7 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:1
          },
          {
            time:'2024-1-8 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:100

          },
          {
            time:'2024-1-9 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-800
          },
          {
            time:'2024-1-10 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:300
          },
          {
            time:'2024-1-11 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-100

          },
          {
            time:'2024-1-12 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-800
          },
          {
            time:'2024-1-13 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-1800
          },
          {
            time:'2024-1-14 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:800

          },
          {
            time:'2024-1-15 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-2800
          },
          {
            time:'2024-1-16 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-1100

          },
          {
            time:'2024-1-17 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-2600
          }
        ]
      },
      {
       
        shopId:'2',
        imgSrc:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
        title:'野生kun',
        dec:'守护最好的坤，把价格打下去家人们！！',
        priceLine:[
          {
            time:'2024-1-7 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:1
          },
          {
            time:'2024-1-8 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:100

          },
          {
            time:'2024-1-9 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-800
          },
          {
            time:'2024-1-10 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:300
          },
          {
            time:'2024-1-11 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-100

          },
          {
            time:'2024-1-12 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-800
          },
          {
            time:'2024-1-13 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-1800
          },
          {
            time:'2024-1-14 2:30:00',
            uid:'2',
            uName:'护坤大使',
            price:800

          },
          {
            time:'2024-1-15 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-2800
          },
          {
            time:'2024-1-16 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-1100

          },
          {
            time:'2024-1-17 2:30:00',
            uid:'1',
            uName:'小黑子',
            price:-2600
          }
        ]
      },
    ]
  }),
  actions: {
    // 同步strore数据到Storage
    setStorage: (state: IState) => {
      for (var key in state) {
        Taro.setStorage({
          key: key,
          data: state[key],
        });
      }
    },
    // 同步Storage数据到strore
    getStorage:(state: IState) => {
      for (var key in state) {
        try {
          var value = Taro.getStorageSync(key)
          if (value) {
            // Do something with return value
            state[key] = value
          }
        } catch (e) {
          // Do something when catch error
          console.log(e);
          
        }
      }


     
    },

    /**
     * 移除一个 image / video
     * @param {string} firstId 外层
     * @param {string} secondId 详细id 内层 (不传该参数则删除整条记录)
    */
     removeMemoItem(firstId: string, secondId='') {

      const memo  =  this.memoDataList.find(i => i.memoId === firstId)!;  
      if(!!secondId){
        const index = memo.list.findIndex(i => i.memoResId === secondId);
        memo.list.splice(index, 1);
        // 如果删完后无内容，则进行删除相册
        if(!memo.list.length){
          const memoIndex = this.memoDataList.findIndex(i => i.memoId === memo.memoId);
          if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
        }
      }else{
        const memoIndex = this.memoDataList.findIndex(i => i.memoId === memo.memoId);
        if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
      }
      
      // 同步storage
      this.setStorage(this.$state)

    },
  },
});
