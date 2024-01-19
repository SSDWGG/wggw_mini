import { createRequest, ApiError } from './customRequest';
import { debounce } from 'lodash';
import Taro from '@tarojs/taro';
import { baseApi } from './env';

const log = (message: string, style?: string) => {
  if (process.env.NODE_ENV !== 'production') return;
  console.log(`%c ${message}`, style); // eslint-disable-line no-console
};


// export let baseURL = Taro.getStorageSync('yunxiaoding-dev-baseURL') || baseApi;
export let baseURL =  baseApi;

log(`baseAPI: ${baseURL}`, 'color: cyan');

/*****************************************************************************************************************
 *********************************************** 权限相关 ***********************************************
 ***************************************************************************************************************** **/
export const tokenKey = `wggw-token-${process.env.BUILD_ENV}`;
export const tokenUtil = {
  set: (token) => Taro.setStorageSync(tokenKey, token),
  get: (): string => Taro.getStorageSync(tokenKey),
  clear: () => Taro.removeStorage({ key: tokenKey })
};

// 退出登录
const unauthorized = debounce(() => {
  requestInstance.setConfig({ header: { token: '' }});
  tokenUtil.clear();
}, 3000, { leading: true, trailing: false });

const memberExpired = debounce(() => {
  console.log('会员过期');
  
}, 3000, { leading: true, trailing: false });

const systemInfo = Taro.getSystemInfoSync();

/**
 * create a global request instance
 * ****/
const requestInstance = createRequest({
  baseURL,
  header: {
    // @ts-ignore
    ...(process.env.buildInfo || {}),
    'content-type': 'application/json',
    token: tokenUtil.get() || '',
    appName: 'wggw-mini',
    platform: systemInfo.platform,
    model: systemInfo.model,
    system: systemInfo.system,
    wxVersion: systemInfo.version
  },
  dataType: 'json',
  enableHttp2: true,
  enableQuic: true,
  enableCache: true,
});

export const setBaseURL = (url) => {
  requestInstance.setConfig({ baseURL: url });
  baseURL = url;
};

requestInstance.interceptors.response.use((response, config) => {  
  /**
   * 后端总是返回 200，他们在业务代码层包装了 ResponseData<T>
   * 且后端 response.data.status 报错时总是为 400，前端根据response.data.code 判断
   * 错误码定义：https://meipingmi.yuque.com/mpm/mf913e/tyzcmr
   * 前端统一将错误以异常的形式抛出（返回），并总是以 catch 处理异常
   * ***/
  // if (response.statusCode === 200) {
  //   const responseData = response.data;
  //   if (responseData.status !== 200) { // It's seems always 400
  //     if (
  //       responseData.code === '0x00100003'
  //       || responseData.code === '0x00102501'
  //       || responseData.code === '0x00102502'
  //       || responseData.code === '0x00102616'
  //     ) { // 401
  //       unauthorized();
  //     }
  //     if (
  //       responseData.code === '0x00103101' // 会员已过期，无法进行该操作！
  //       || responseData.code === '0x00103102' // 试用会员已过期
  //     ) { // 会员过期
  //       memberExpired();
  //     }
  //     log(`${config.method} ${config.url.replace(`${config.baseURL}/yxd/`, '').replace(/\?.+/g, '')}  ERROR \n参数: ${config.method === 'GET' ? JSON.stringify(config.params) : JSON.stringify(config.data)} \ntoken: ${config.header.token} \n返回: ${JSON.stringify(responseData)}`, 'color:red'); // eslint-disable-line max-len
  //     throw new ApiError(responseData.message, responseData.code);
  //   }
  //   log(`${config.method} ${config.url.replace(`${config.baseURL}/yxd/`, '').replace(/\?.+/g, '')}  OK`, 'color:green');
  //   return responseData.data; // 正确返回
  // } else {
  //   // eslint-disable-next-line no-console
  //   const commonError = new Map<number, string>([
  //     [404, '404 Not Found'],
  //     [401, '401 Unanthorized'],
  //     [500, '500 Service Exception'],
  //     [502, '502 Service is Not Ready'],
  //   ]);
  //   log(`${config.method} ${config.url.replace(`${config.baseURL}/yxd/`, '').replace(/\?.+/g, '')}  ERROR \n参数: ${config.method === 'GET' ? JSON.stringify(config.params) : JSON.stringify(config.data)} \ntoken: ${config.header.token} \n返回: ${commonError.get(response.statusCode)}`, 'color:red'); // eslint-disable-line max-len
  //   throw new Error(commonError.get(response.statusCode) || '请求异常');
  // }
  
return response.data.data

}, (error: Error & { errMsg?: string }, { showErrorMsg }) => {
  if (error.errMsg?.startsWith('request:fail')) {
    log(`${error.errMsg}  ${baseURL} 服务不可用`, 'background: red; color: #fff; font-size: 24px');
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
