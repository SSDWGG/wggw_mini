
// 进度表
export interface IProgress {
  progressId:string,          //唯一id
  computedNum:number;         //计算的单位
  contentBgImg:string;        //背景图片
  onAfterText:string;         //结束后的回调事件展示的内容文案  
  gradientColorStart:string;   //进度条渐变颜色start
  gradientColorEnd:string;   //进度条渐变颜色end
  strokeWidth:number;       //进度条粗细
  format:string;            //时间展示形式
  contentOverText: string;  //内容区域结束后的文案
  contentTitleText: string;  //title文案
}
