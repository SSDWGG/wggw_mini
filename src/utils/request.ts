import { createRequest, ApiError } from './customRequest';
import Taro from '@tarojs/taro';
import { baseApi } from './env';
import { getToken } from '@/apis/mine';

const log = (message: string, style?: string) => {
  if (process.env.NODE_ENV !== 'production') return;
  console.log(`%c ${message}`, style); // eslint-disable-line no-console
};

export let baseURL = Taro.getStorageSync('wggw-dev-baseURL') || baseApi;

log(`baseAPI: ${baseURL}`, 'color: cyan');

/*****************************************************************************************************************
 *********************************************** 权限相关 ***********************************************
 ***************************************************************************************************************** **/
export const tokenKey = `WGGW-token-${process.env.BUILD_ENV}`;
export const tokenUtil = {
  set: (token) => Taro.setStorageSync(tokenKey, token),
  get: (): string => Taro.getStorageSync(tokenKey),
  clear: () => Taro.removeStorage({ key: tokenKey }),
};

//  退出登录逻辑
//  const unauthorized = debounce(() => {
//    requestInstance.setConfig({ header: { token: '' }});
//    tokenUtil.clear();
//  }, 3000, { leading: true, trailing: false });

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
    wxVersion: systemInfo.version,
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

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [] as any[];

requestInstance.interceptors.response.use(
  async (response, config) => {

    if (response.statusCode === 200) {
      const responseData = response.data;
      // 阿里云上的文件特殊处理
      if(response?.header?.Server==='AliyunOSS'){
        return response.data ; // 正确返回
      }

      if ((responseData.code as unknown as number) !== 200) {
        log(
          `${config.method} ${config.url
            .replace(`${config.baseURL}/`, '')
            .replace(/\?.+/g, '')}  ERROR \n参数: ${
            config.method === 'GET'
              ? JSON.stringify(config.params)
              : JSON.stringify(config.data)
          } \ntoken: ${config.header.token} \n返回: ${JSON.stringify(
            responseData
          )}`,
          'color:red'
        ); // eslint-disable-line max-len
        throw new ApiError(responseData.message, responseData.code);
      }
      log(
        `${config.method} ${config.url
          .replace(`${config.baseURL}/`, '')
          .replace(/\?.+/g, '')}  OK`,
        'color:green'
      );
      return responseData.data || (responseData.message as any); // 正确返回
    } else if (response.statusCode === 403) {
      const oldConfig = config;
       // 因为params的参数已经被拼接到url上了，这里防止二次拼接出现异常
       oldConfig.params = {};

      if (!isRefreshing) {
        // 重新请求token
        isRefreshing = true;
        try {
          const token = await getToken();
          // token在请求实例存储
          requestInstance.setConfig({ header: { token } });
          // 持久化存储
          tokenUtil.set(token);
          // 队列请求存储token
          oldConfig.header.token = token;
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach(cb => cb(token));
          // 重试完了别忘了清空这个队列
          requests = [];
          return requestInstance(oldConfig);
        } catch (error) {
          // 请求token失败抛出异常
          throw new Error('身份过期，请联系管理员');
        } finally {
          isRefreshing = false;
        }
      }
      else{
        // 正在刷新token，返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            oldConfig.header.token = token;
            resolve(requestInstance(oldConfig));
          });
        });
      }


    } else {
      // eslint-disable-next-line no-console
      const commonError = new Map<number, string>([
        [404, '404 Not Found'],
        [401, '401 Unanthorized'],
        [500, '500 Service Exception'],
        [502, '502 Service is Not Ready'],
      ]);
      log(
        `${config.method} ${config.url
          .replace(`${config.baseURL}/`, '')
          .replace(/\?.+/g, '')}  ERROR \n参数: ${
          config.method === 'GET'
            ? JSON.stringify(config.params)
            : JSON.stringify(config.data)
        } \ntoken: ${config.header.token} \n返回: ${commonError.get(
          response.statusCode
        )}`,
        'color:red'
      ); // eslint-disable-line max-len
      throw new Error(commonError.get(response.statusCode) || '请求异常');
    }
  },
  (error: Error & { errMsg?: string }, { showErrorMsg }) => {
    if (error.errMsg?.startsWith('request:fail')) {
      log(
        `${error.errMsg}  ${baseURL} 服务不可用`,
        'background: red; color: #fff; font-size: 24px'
      );
      return error;
    }
    if (showErrorMsg) {
      Taro.showToast({
        title: error.message,
        icon: error.message.length > 6 ? 'none' : 'error',
        duration: 2000,
      });
    }
    return error;
  }
);

export default requestInstance;
