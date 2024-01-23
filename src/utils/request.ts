import { createRequest,ApiError } from './customRequest';
import Taro from '@tarojs/taro';
import { baseApi } from './env';

const log = (message: string, style?: string) => {
  if (process.env.NODE_ENV !== 'production') return;
  console.log(`%c ${message}`, style); // eslint-disable-line no-console
};

export let baseURL =  baseApi;

log(`baseAPI: ${baseURL}`, 'color: cyan');


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
 
  if (response.statusCode === 200) {
    const responseData = response.data;
    if (responseData.code  as unknown as number!== 200) { 
      log(`${config.method} ${config.url.replace(`${config.baseURL}/`, '').replace(/\?.+/g, '')}  ERROR \n参数: ${config.method === 'GET' ? JSON.stringify(config.params) : JSON.stringify(config.data)} \ntoken: ${config.header.token} \n返回: ${JSON.stringify(responseData)}`, 'color:red'); // eslint-disable-line max-len
      throw new ApiError(responseData.message, responseData.code);
    }
    log(`${config.method} ${config.url.replace(`${config.baseURL}/`, '').replace(/\?.+/g, '')}  OK`, 'color:green');
    return responseData.data; // 正确返回
  } else {
    // eslint-disable-next-line no-console
    const commonError = new Map<number, string>([
      [404, '404 Not Found'],
      [401, '401 Unanthorized'],
      [500, '500 Service Exception'],
      [502, '502 Service is Not Ready'],
    ]);
    log(`${config.method} ${config.url.replace(`${config.baseURL}/`, '').replace(/\?.+/g, '')}  ERROR \n参数: ${config.method === 'GET' ? JSON.stringify(config.params) : JSON.stringify(config.data)} \ntoken: ${config.header.token} \n返回: ${commonError.get(response.statusCode)}`, 'color:red'); // eslint-disable-line max-len
    throw new Error(commonError.get(response.statusCode) || '请求异常');
  }
  
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
