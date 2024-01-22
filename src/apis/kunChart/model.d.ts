export interface IPriceLineItem {
  // 报价时间
  time:string,
  // 报价人唯一Id(openId)
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
  kcDesc:string
  priceLine:Array< IPriceLineItem >
}