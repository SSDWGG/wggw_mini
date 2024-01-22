import request from "@/utils/request";
import Taro from "@tarojs/taro";


/**
 * 微信登录  wxLogin
 */
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

export const wxLogin = async () => {
  let params = {};
  const { code } = await Taro.login();
  params = {  code };
  return request<{
    openid: string;
    session_key: string;
  }>({
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
