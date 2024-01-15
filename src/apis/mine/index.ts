import request, { tokenUtil } from '@/utils/request';
import * as T from './model';
import Taro from '@tarojs/taro';
import projectConfig from '@root/project.config.json';

const { appid } = projectConfig;


// 测试接口
export const getUserApiTest = async ( test:number) => {
  let params = {};
  const { code } = await Taro.login();
  params = { appid, code,test };
  return request<number>({
    url: '/v1/user/test',
    method: 'GET',
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
}): Promise<T.IUserItem> => request<T.IUserItem>({
  url: '/yxd/wx/mini/user/login',
  method: 'POST',
  data: {
    appid,
    ...data,
  },
}).then(res => {
  request.setConfig({ header: { token: res.token }});
  tokenUtil.set(res.token);
  return res;
});
/**
 * 静默登录
*/
export const silentLoginApi = (data:{
  appid:string,
  inviteUserId:string,
  loginCode:string,
}) => request<T.IUserItem>({
  url: '/yxd/wx/mini/user/silentLogin',
  method: 'POST',
  data,
});