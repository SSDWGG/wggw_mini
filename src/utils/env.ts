type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址
  ossFilePrePath: string; // oss图片展示拼接地址
  ossFilePrePathRrb: string; // oss图片展示拼接地址(rrb)
  ossFilePrePathSvga: string; // oss图片展示拼接地址(svga)
  ossFilePrePathNormalWaterFall: string; // oss图片展示拼接地址(svga)
  baseApi: string; // https domain
  socketAllUserUrl: string; // socket
};

export const allConfigs: { [K in BUILD_ENV as string] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathRrb: '/yunxiaoding-mini/other/waterFallRRB',
    ossFilePrePathNormalWaterFall: '/yunxiaoding-mini/other/waterFall',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'http://localhost:9060',
    socketAllUserUrl:'ws://localhost:9060/v1/ws/publicWS/'
  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathRrb: '/yunxiaoding-mini/other/waterFallRRB',
    ossFilePrePathNormalWaterFall: '/yunxiaoding-mini/other/waterFall',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'https://allsever.ssdwgg.cn',
    // https自动会转换成wss
    socketAllUserUrl:'wss://allsever.ssdwgg.cn/v1/ws/publicWS/'
  },
};

export const config = allConfigs[process.env.BUILD_ENV as string] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
export const baseApi = config.baseApi;
export const ossFilePrePath = config.ossFilePrePath;
export const ossFilePrePathRrb = config.ossFilePrePathRrb;
export const ossFilePrePathSvga = config.ossFilePrePathSvga;
export const ossFilePrePathNormalWaterFall = config.ossFilePrePathNormalWaterFall;
export const socketAllUserUrl = config.socketAllUserUrl;
