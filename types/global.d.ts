/* eslint-disable no-unused-vars */
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq';
    NODE_ENV: 'development' | 'production';
    BUILD_ENV: 'test'|'prod';
    FIX_ENV: 'nofix'|'fix';
    [key: string]: any;
  }
};


// 通用type
export interface IListDataItem {
  title: string,
  Ctitle: string,
  router: string,
  bgSrc?:string,
  opacity?:number,
  isShow?:boolean,
  linkUrl?:string,
  qrSrc?:string,
}

// declare module '@tarojs/components' {
//   export * from '@tarojs/components/types/index.vue3';
// }
