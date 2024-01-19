import request, { tokenUtil } from "@/utils/request";
import * as T from "./model";
import Taro from "@tarojs/taro";
import projectConfig from "@root/project.config.json";

const { appid } = projectConfig;

// 测试接口
export const getUserApiTest = async (test: number) => {
  let params = {};
  const { code } = await Taro.login();
  params = {  code };
  return request<number>({
    url: "/v1/user/test",
    method: "GET",
    params,
  });
};

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

/**
 * 登录
 */
export const userLogin = (data: {
  loginCode: string;
  phoneCode: string;
  inviteUserId?: string;
  registerSource?: number;
}): Promise<T.IUserItem> =>
  request<T.IUserItem>({
    url: "/yxd/wx/mini/user/login",
    method: "POST",
    data: {
      appid,
      ...data,
    },
  }).then((res) => {
    request.setConfig({ header: { token: res.token } });
    tokenUtil.set(res.token);
    return res;
  });
