import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';

type TState = Taro.getSystemInfo.Result;

export const useSystemInfoStore = defineStore('systemInfo', {
  state: (): TState => ({
    SDKVersion: '',
    benchmarkLevel: 0,
    bluetoothEnabled: true,
    brand: '',
    cameraAuthorized: true,
    deviceOrientation: 'portrait',
    enableDebug: false,
    errMsg: '',
    fontSizeSetting: 16,
    language: 'zh_CN',
    locationAuthorized: true,
    locationEnabled: true,
    microphoneAuthorized: true,
    model: 'iPhone X',
    notificationAuthorized: true,
    pixelRatio: 3,
    platform: 'devtools',
    safeArea: {
      bottom: 778,
      height: 734,
      left: 0,
      right: 375,
      top: 44,
      width: 375,
    },
    screenHeight: 812,
    screenWidth: 375,
    statusBarHeight: 44,
    system: 'iOS 10.0.1',
    version: '8.0.5',
    wifiEnabled: true,
    windowHeight: 642,
    windowWidth: 375,
  }),
  actions: {
    getSystemInfo() {
      Taro.getSystemInfo().then(res => {
        this.$state = res;
      });
    },
  },
});
