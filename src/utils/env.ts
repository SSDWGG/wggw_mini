type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  cdnHost: string; // cdn 图片上传地址，图片展示拼接地址
};

// eslint-disable-next-line no-unused-vars
const allConfigs: { [k in BUILD_ENV] : IEnvConfig } = {
  test: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  release: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  prod: {
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
};

export const config = allConfigs[process.env.BUILD_ENV] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const cdnHost = config.cdnHost;
