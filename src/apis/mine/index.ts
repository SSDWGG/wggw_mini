import request from "@/utils/request";
import Taro from "@tarojs/taro";
import * as T from "./model";

/**
 * 微信登录  wxLogin
 */
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

export const wxLogin = async () => {
  let params = {};
  const { code } = await Taro.login();
  params = { code };
  return request<T.IUserInfo>({
    url: "/v1/user/getOpenid",
    method: "GET",
    params,
  });
};
// .then((res) => {
//   request.setConfig({ header: { token: res.token } });
//   tokenUtil.set(res.token);
//   return res;
// });

// 发送验证码
export const sendCode = (params: { email: string }) =>
  request<boolean>({
    url: "/v2/code/sendEmail",
    method: "GET",
    params,
  });

// 修改user
export const updateUser = (data: T.IUserInfo) =>
  request<boolean>({
    url: "/v1/user/updateUser",
    method: "POST",
    data,
  });


  // 绑定手机号
  export const bindPhone = async (phoneCode:string) => {
    let params = {};
    const { code } = await Taro.login();
    params = { code,phoneCode };
    return request<T.IUserInfo>({
      url: "/v1/user/bindPhone",
      method: "GET",
      params,
    });
  };

