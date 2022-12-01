import { defineStore } from 'pinia';

interface IState {
  uuid:string,//账号唯一id
  showTabs:boolean, //是否展示底部tabs
  showfirstTimePageNoticeBar:boolean, //是否展示头部公告栏tabs
  templeChoosePostList:any,//上传选择的临时资源
  NoticeBarText:string, //头部公告栏自定义内容
  memoDataList:any,//备忘录的数据
}

export const useAccountStore = defineStore('account', {
  state: (): IState => ({
    uuid:'',
    showTabs:true,
    showfirstTimePageNoticeBar:true,
    templeChoosePostList:[],
    NoticeBarText:`|||                   
    Do not go gentle into that good night,
    Old age should burn and rave at close of day;
    Rage, rage against the dying of the light.
    Though wise men at their end know dark is right,
    Because their words had forked no lightning they
    Do not go gentle into that good night.
                   |||`,
    // 您的账号数据信息存储在您的设备硬件上，他人以及其他设备无法访问，
    // 您可以在这个封闭的私密空间记录您所想记录的内容，
    // 如果您将本小程序删除，微信将会清空本程序内的所有的记录数据，
    // 请妥善保存您的数据 
    memoDataList:[]
  }),
  actions: {
  },
});
