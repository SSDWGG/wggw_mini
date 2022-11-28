import { createRequest, ApiError } from 'taro-request';
import { debounce } from 'lodash';
import Taro from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import { baseApi } from './env';

/*****************************************************************************************************************
 *********************************************** 权限相关 ***********************************************
 ***************************************************************************************************************** **/
export const tokenKey = 'yunxiaoding-token';
export const tokenUtil = {
  set: (token) => Taro.setStorageSync(tokenKey, token),
  get: (): string => Taro.getStorageSync(tokenKey),
  clear: () => Taro.removeStorage({ key: tokenKey })
};

const unauthorized = debounce(() => {
  requestInstance.setConfig({ header: { token: '' }});
  tokenUtil.clear();
  useAccountStore().isLogined = false;
}, 3000, { leading: true, trailing: false });

const memberExpired = debounce(() => {
  useAccountStore().userInfo.isExpired = true;
}, 3000, { leading: true, trailing: false });

/**
 * create a global request instance
 * ****/
const requestInstance = createRequest({
  baseURL: baseApi,
  header: {
    'content-type': 'application/json',
    'appCode': 'saas_weapp',
    'token': tokenUtil.get() || '',
  },
  dataType: 'json',
  enableHttp2: true,
  enableQuic: true,
  enableCache: true,
});

requestInstance.interceptors.response.use((response, config) => {
  /**
   * 后端总是返回 200，他们在业务代码层包装了 ResponseData<T>
   * 且后端 response.data.status 报错时总是为 400，前端根据response.data.code 判断
   * 错误码定义：https://meipingmi.yuque.com/mpm/mf913e/tyzcmr
   * 前端统一将错误以异常的形式抛出（返回），并总是以 catch 处理异常
   * ***/
  if (response.statusCode === 200) {
    const responseData = response.data;
    if (responseData.status !== 200) { // It's seems always 400
      if (
        responseData.code === '0x00100003'
        || responseData.code === '0x00102501'
        || responseData.code === '0x00102502'
      ) { // 401
        unauthorized();
      }
      if (
        responseData.code === '0x00103101' // 会员已过期，无法进行该操作！
        || responseData.code === '0x00103102' // 试用会员已过期
      ) { // 会员过期
        memberExpired();
      }
      if (process.env.NODE_ENV === 'production')
        // eslint-disable-next-line max-len, no-console
        console.log(`%c ${config.method} ${config.url.replace(`${baseApi}/yxd/`, '').replace(/\?.+/g, '')}  ERROR \n参数: ${config.method === 'GET' ? JSON.stringify(config.params) : JSON.stringify(config.data)} \ntoken: ${config.header.token} \n返回: ${JSON.stringify(responseData)}`, 'color:red');
      throw new ApiError(responseData.message, responseData.code);
    }
    if (process.env.NODE_ENV === 'production')
      // eslint-disable-next-line no-console
      console.log(`%c ${config.method} ${config.url.replace(`${baseApi}/yxd/`, '').replace(/\?.+/g, '')}  OK`, 'color:green');
    return responseData.data; // 正确返回
  } else {
    // eslint-disable-next-line no-console
    const commonError = new Map<number, string>([
      [404, '404 Not Found'],
      [401, '401 Unanthorized'],
      [500, '500 Service Exception'],
      [502, '502 Service is Not Ready'],
    ]);
    throw new Error(commonError.get(response.statusCode) || '请求异常');
  }
}, (error: Error, { showErrorMsg }) => {
  if (error.errMsg === 'request:fail ') {
    console.log('%c 服务不可用，请确认服务是否存在', 'background: red; color: #fff; font-size: 24px');
    return error;
  }
  if (showErrorMsg) {
    Taro.showToast({
      title: error.message,
      icon: error.message.length > 6 ? 'none': 'error',
      duration: 2000,
    });
  }
  return error;
});

export default requestInstance;