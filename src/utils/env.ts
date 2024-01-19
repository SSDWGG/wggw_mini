type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址，图片展示拼接地址
  baseApi: string; // https domain
};

// eslint-disable-next-line no-unused-vars
const allConfigs: { [k in BUILD_ENV] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    baseApi: 'http://localhost:9051', 
  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    baseApi: 'https://wggw.ssdwgg.cn', 

  },
};

export const config = allConfigs[process.env.BUILD_ENV] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
export const baseApi = config.baseApi;

