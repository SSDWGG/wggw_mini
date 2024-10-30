type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址
  ossFilePrePath: string; // oss图片展示拼接地址
  ossFilePrePathRrb: string; // oss图片展示拼接地址(rrb)
  ossFilePrePathSvga: string; // oss图片展示拼接地址(svga)
  ossFilePrePathNormalWaterFall: string; // oss图片展示拼接地址(svga)
  baseApi: string; // https domain
  socketAllUserUrl: string; // socket

  baseApiLpt: string; // lpt https domain
  imgHostLpt:string;
  ossImgHostLpt:string;
  ossImgLowQualityParamsLpt:string;
};

export const allConfigs: { [K in BUILD_ENV as string] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathRrb: '/yunxiaoding-mini/other/waterFallRRB',
    ossFilePrePathNormalWaterFall: '/yunxiaoding-mini/other/waterFall',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'http://localhost:9060',
    socketAllUserUrl:'ws://localhost:9060/v1/ws/publicWS/',

    baseApiLpt: 'https://lpt.wuchuangroup.com/w/m/v1',
    imgHostLpt:'https://lpt.wuchuangroup.com/img',
    ossImgHostLpt:'https://webplus-cn-beijing-s-5f2444d1fbb9ae7ab21bb224.oss-cn-beijing.aliyuncs.com',
    ossImgLowQualityParamsLpt:'?x-oss-process=image/quality,q_10'
  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
    ossFilePrePath: '/yunxiaoding-mini/other/wggw',
    ossFilePrePathRrb: '/yunxiaoding-mini/other/waterFallRRB',
    ossFilePrePathNormalWaterFall: '/yunxiaoding-mini/other/waterFall',
    ossFilePrePathSvga: '/yunxiaoding-mini/other/wggSVGA',
    baseApi: 'https://allsever.ssdwgg.cn',
    // https自动会转换成wss
    socketAllUserUrl:'wss://allsever.ssdwgg.cn/v1/ws/publicWS/',

    baseApiLpt: 'https://lpt.wuchuangroup.com/w/m/v1',
    imgHostLpt:'https://lpt.wuchuangroup.com/img',
    ossImgHostLpt:'https://webplus-cn-beijing-s-5f2444d1fbb9ae7ab21bb224.oss-cn-beijing.aliyuncs.com',
    ossImgLowQualityParamsLpt:'?x-oss-process=image/quality,q_10'
  },
};

export const config = allConfigs[process.env.BUILD_ENV as string] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
export const baseApi = config.baseApi;

export const baseApiLpt = config.baseApiLpt;
export const imgHostLpt = config.imgHostLpt;
export const ossImgHostLpt = config.ossImgHostLpt;
export const ossImgLowQualityParamsLpt = config.ossImgLowQualityParamsLpt;

export const ossFilePrePath = config.ossFilePrePath;
export const ossFilePrePathRrb = config.ossFilePrePathRrb;
export const ossFilePrePathSvga = config.ossFilePrePathSvga;
export const ossFilePrePathNormalWaterFall = config.ossFilePrePathNormalWaterFall;
export const socketAllUserUrl = config.socketAllUserUrl;
