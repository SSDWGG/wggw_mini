
// 相册详情
export interface IFmenuItem {
  smenu: ISmenuItem [];
  firstCdId: string; // 图片或视频地址
  openid: number;
  firstCdName: string; // 视频封面
}

export interface ISmenuItem {
  firstCdId: string; // 图片或视频地址
  secondCdId: string; // 图片或视频地址
  openid: number;
  secondCdName: string; // 视频封面
}
