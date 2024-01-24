export type IMemoType = 0 | 1 | 2; // 记录内容类型 0图文类 1视频类 2纯文类
export type IMemoItemType = 0 | 1 ; // 记录内容类型 0图文 1视频


// 相册详情
export interface IMemoItem {
  memoItemType: IMemoItemType;
  memoResId: string;
  gmtCreate: string;
  gmtModified: string;
  picUrl: string; // 图片或视频地址
  sort: number;
  videoPicUrl: string; // 视频封面
}

// 相册
export interface IMemo {
  memoType: IMemoType;
  content: string; // 文案内容
  createTime: string;
  memoId: string;
  list: IMemoItem[]; // 相册详情

  // 前端属性
  TimeLineList:string|string[]
}
