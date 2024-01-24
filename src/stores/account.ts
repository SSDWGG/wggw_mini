import { IBiddingItem } from "@/apis/kunChart/model";
import { deleteMemo, updateMemo } from "@/apis/memo";
import { IMemo } from "@/apis/memo/model";
import { wxLogin } from "@/apis/mine";
import { IResult } from "@/components/selectMedia";
import { defineStore } from "pinia";
import cloneDeep from 'lodash/cloneDeep';



interface IState {
  
  biddingDefaultList:Array<IBiddingItem>; //竞拍本地列表
  biddingKunDefaultList:Array<IBiddingItem>; //竞拍本地列表（坤版）
  
  templeChoosePostList: IResult[]; //上传选择的临时资源
  memoDataList: IMemo[]; //前端缓存备忘录的数据（列表+详情）


  openid:string; //是否登录
  username:string,//用户名
  waterMark:string,//水印
  avatarurl:string, //用户头像
  NoticeBarText: string; //头部公告栏自定义内容

  

}

export const useAccountStore = defineStore("account", {
  state: (): IState => ({
    username:'WGG的妙妙屋',
    waterMark:'WGGW',
    avatarurl:"https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg",
    templeChoosePostList: [],
    NoticeBarText: `
    Do not go gentle into that good night,
    Old age should burn and rave at close of day;
    Rage, rage against the dying of the light.
    Though wise men at their end know dark is right,
    Because their words had forked no lightning they
    Do not go gentle into that good night.`,
    memoDataList: [], 

    openid:'',
    biddingDefaultList:[
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
      //     {
      //       time:'2024-1-9 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-800
      //     },
      //     {
      //       time:'2024-1-10 2:30:00',
      //       uid:'2',
      //       uName:'护坤大使',
      //       price:300
      //     },
      //     {
      //       time:'2024-1-11 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-100

      //     },
      //     {
      //       time:'2024-1-12 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-800
      //     },
      //     {
      //       time:'2024-1-13 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-1800
      //     },
      //     {
      //       time:'2024-1-14 2:30:00',
      //       uid:'2',
      //       uName:'护坤大使',
      //       price:800

      //     },
      //     {
      //       time:'2024-1-15 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-2800
      //     },
      //     {
      //       time:'2024-1-16 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-1100

      //     },
      //     {
      //       time:'2024-1-17 2:30:00',
      //       uid:'1',
      //       uName:'小黑子',
      //       price:-2600
      //     }
      //   ]
      // },
    ],
    biddingKunDefaultList:[],
  }),
  actions: {
    // 箭头函数中没有this，如果想使用this，请不要使用箭头函数
   async login(){
      const res =  await wxLogin()
      this.openid = res.openid
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
          deleteMemo({ memoId: firstId })
        }else{
         const  parmas = cloneDeep(memo);
         parmas.list = JSON.stringify(parmas.list )
          updateMemo(parmas)
        }
      }else{
        const memoIndex = this.memoDataList.findIndex(i => i.memoId === memo.memoId);
        if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
        deleteMemo({ memoId: firstId })
      }
    },
  },
});
