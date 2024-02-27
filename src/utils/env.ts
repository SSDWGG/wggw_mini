type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址，图片展示拼接地址
  baseApi: string; // https domain
  socketAllUserUrl: string; // socket
};

// eslint-disable-next-line no-unused-vars
const allConfigs: { [k in BUILD_ENV] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    baseApi: 'http://localhost:9051', 
    socketAllUserUrl:'ws://localhost:9051/v1/ws/publicWS/'
  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    baseApi: 'https://wggw.ssdwgg.cn', 
    // https自动会转换成wss
    socketAllUserUrl:'wss://wggw.ssdwgg.cn/v1/ws/publicWS/'
  },
};

export const config = allConfigs[process.env.BUILD_ENV] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
export const baseApi = config.baseApi;
export const socketAllUserUrl = config.socketAllUserUrl;
