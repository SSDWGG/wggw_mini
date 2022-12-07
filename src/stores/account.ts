import { IMemo } from "@/apis/memo/model";
import { IProgress } from "@/apis/progress/model";
import { IResult } from "@/components/selectMedia";
import Taro from "@tarojs/taro";
import { defineStore } from "pinia";

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

}

export const useAccountStore = defineStore("account", {
  state: (): IState => ({
    username:'WGG',
    waterMark:'WGGW',
    uuid: "0",
    avatarurl:"https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg",
    showTabs: true,
    showfirstTimePageNoticeBar: true,
    templeChoosePostList: [],
    NoticeBarText: `Do not go gentle into that good night,
    Old age should burn and rave at close of day;
    Rage, rage against the dying of the light.
    Though wise men at their end know dark is right,
    Because their words had forked no lightning they
    Do not go gentle into that good night.`,
    NoticeBarDataSaveText:`
    wggw小程序一个数据高度封闭的私密空间，可以用来记录您所想记录的内容，
    您的账号数据内容只存储在您的设备硬件上，他人以及其他设备无法访问，
    如果您将本小程序删除，微信团队将会清空本程序内的所有的记录数据，
    请妥善保存您的数据 （By———wggw小程序开发者）`,
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
     * @param {string} albumId 相册 id，外层
     * @param {string} pictureId 照片或视频 id，详细id 内层
    */
     removeMemoItem(firstId: string, secondId: string) {
      const memo  =  this.memoDataList.find(i => i.memoId === firstId)!;      
      const index = memo.list.findIndex(i => i.memoResId === secondId);
      memo.list.splice(index, 1);
      // 如果删完后无内容，则进行删除相册
      if(!memo.list.length){
        const memoIndex = this.memoDataList.findIndex(i => i.memoId === memo.memoId);
        if (memoIndex !== -1) this.memoDataList.splice(memoIndex, 1);
      }
      // 同步storage
      this.setStorage(this.$state)

    },
  },
});
