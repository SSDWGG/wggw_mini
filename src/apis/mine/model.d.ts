export interface IUserInfo { // 用户信息
  applyId:string, // 申请加入店铺的申请ID， 如申请记录处于待审批中，则该字段有值
  avatarurl: string, // 头像url
  expiredDay: string, // 会员截止日期
  expiredDayCount: number, // 会员到期天数
  gender: string, // 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知
  id: string, // 用户ID
  isExpired: boolean, // 会员是否已过期
  isMember: boolean, // 是否为会员
  memberType:number, // 会员类型：1.会员 2.试用
  name: string, // 用户姓名
  nick: string, // 用户昵称
  phone: string, // 手机号
  qrCode: string, // 二维码
  status: boolean, // 用户状态标识 0停用,1可用
  tenantId: string, // 商户ID
  tenantName: string, // 所属商户名称
  // 下面数据可酌情删除
  creatorId:number, // 创建者ID
  editorId:number, // 更新者ID
  gmtCreate: string, // 创建时间
  gmtModified: string, // 更新时间
  isDeleted: number, // 是否删除 0无效 1有效
  levelOneUserId: number, // 一级邀请用户ID
  levelTwoUserId: number, // 二级邀请用户ID
  loginTime: string, // 登录时间
  openId: string, // 微信opneid
  terminalSource: number, // 终端来源：1android 2ios 3pc 4h5 5yunying 6task 7wechat 待扩展
  unionid: string, // 游客unionid
  string: number, // 版本号
  inviteUserId: string, // 邀请人UserId
  inviteUserTenantId: string, // 邀请人所属企业ID
  inviteUserTenantName: string, // 邀请人所属企业名称
  type: number // 企业类型
  yebUserId: string // 绑定云e宝id
  yebTenantIsRetail: boolean // 是否零售版
  defaultAddress: string
  defaultAddressDetail: string
  addressId:string

  yebTenantId:string
  yebTenantName:string
  yebTenantPhone:string
  tenantBuyerFunctionEnable: number // 是否开启买手功能

  applyTenantTag:number
  tenantTag:number
  applyTenantName:string
}

export interface IUserItem  {
  userDetailDTO: IUserInfo; // 用户信息
  openId: string;  // 微信opneid
  token: string; // 登录凭证
}