import request from '@/utils/request';
import Taro from '@tarojs/taro';
import type * as T from './model';

/**
 * 微信登录  获取userdata
 */

export const wxLogin = async () => {
  let params = {};
  const { code } = await Taro.login();
  params = { code, hasToken: true,miniType:'dlb' };
  return request<T.IUserInfo>({
    url: '/v1/user/getOpenid',
    method: 'GET',
    params,
  });
};

// 获取token
export const getToken = () =>
  Taro.login()
    .then((res) => request<string>({
        url: '/v1/user/getOpenid',
        method: 'GET',
        params: {
          code: res.code,
          hasToken: false,
        },
      }));

// 发送验证码
export const sendCode = (params: { email: string }) =>
  request<boolean>({
    url: '/v1/verification/sendEmail',
    method: 'GET',
    params,
  });

// 验证验证码
export const testCode = (params: { email: string; code: string }) =>
  request<boolean>({
    url: '/v1/verification/testCode',
    method: 'GET',
    params,
  });

// 修改user
export const updateUser = (data: T.IUserInfo) =>
  request<boolean>({
    url: '/v1/user/updateUser',
    method: 'POST',
    data,
  });

// 绑定手机号
export const bindPhone = async (phoneCode: string) => {
  let params = {};
  const { code } = await Taro.login();
  params = { code, phoneCode };
  return request<T.IUserInfo>({
    url: '/v1/user/bindPhone',
    method: 'GET',
    params,
  });
};



// 获取random的快捷系统提示项的json文件
export const getRandomJson = () =>
  request({
    url: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/randomSystem.json',
    method: 'GET'
  });
