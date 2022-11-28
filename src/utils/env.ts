type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  baseApi: string; // 后端接口地址
  webHost: string; // webview 地址
  cdnHost: string; // cdn 图片上传地址，图片展示拼接地址
};

// eslint-disable-next-line no-unused-vars
const allConfigs: { [k in BUILD_ENV] : IEnvConfig } = {
  test: {
    baseApi: 'http://60.191.116.75:23792', // 测试环境
    webHost: 'http://192.168.4.173',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  release: {
    baseApi: 'https://saas-pre-app.91yunebao.com/api',
    webHost: 'https://h5-pre.91yunebao.com',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  prod: {
    baseApi: 'https://m-api.91yunebao.com',
    webHost: 'https://h5.91yunebao.com',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
};

export const config = allConfigs[process.env.BUILD_ENV] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const baseApi = config.baseApi;
export const webHost = config.webHost;
export const cdnHost = config.cdnHost;
