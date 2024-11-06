type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址
  ossFilePrePath: string; // oss图片展示拼接地址
  ossFilePrePathSvga: string; // oss图片展示拼接地址(svga)
  baseApi: string; // https domain


};

export const allConfigs: { [K in BUILD_ENV as string] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'http://localhost:9060',


  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'https://allsever.ssdwgg.cn',


  },
};

export const config = allConfigs[process.env.BUILD_ENV as string] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
export const baseApi = config.baseApi;

export const ossFilePrePath = config.ossFilePrePath;

export const ossFilePrePathSvga = config.ossFilePrePathSvga;
