
export interface IFmenuItem {
  smenu: ISmenuItem [];
  firstCdId: string;
  openid: number;
  firstCdName: string;
}

export interface ISmenuItem {
  firstCdId: string;
  secondCdId: string;
  openid: number;
  secondCdName: string;
  firstCdName: string;
}

export interface ICmenuItem {
  cCdId: string;
  backImg: string;
  secondCdId: string;
  catName: string;
  content: string;
}
