/**
 * 接入方式：https://help.aliyun.com/document_detail/103992.html?spm=a2c4g.11186623.0.0.76c365d3q9PaH1
 * 阿里云 arms 后台：https://arms.console.aliyun.com/retcode?pid=dwbfnbxk5a%4018125241555a349#/index
 * **/
import WXLogger from './wxLogger.js';
import packageJson from '../../../package.json';

const envMap = {
    'prod': 'prod',
    'release': 'pre',
    'test': 'daily',
};

const Monitor = WXLogger.init({
    pid: 'dwbfnbxk5a@18125241555a349',
    region: 'cn',    // 指定应用部署的地域：中国设为cn，海外地区靠近新加坡的设为sg。
    behavior: true,
    enableConsole: true,
    release: packageJson.version,
    environment: process.env.NODE_ENV === 'development' ? 'local' : envMap[process.env.BUILD_ENV],
});

export default Monitor;