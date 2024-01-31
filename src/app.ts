import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@nutui/nutui-taro/dist/style.css';
import alIconfont from '@/components/alIconfont';
import { IconFont } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import { useSystemInfoStore } from '@/stores/systemInfo';

/**
 * 初始化 app 做的事情。如果代码逻辑过于冗长，可以拆分出去
 * **/
const initApp = (options: Taro.getLaunchOptionsSync.LaunchOptions ) => {

  const systemInfoStore = useSystemInfoStore();
  // 获取系统信息
  systemInfoStore.getSystemInfo();
  console.log('init app',options);

  // 内存占用警告
  Taro.onMemoryWarning(() => {
    const data = {
      brand: systemInfoStore.brand,
      model: systemInfoStore.model,
      system: systemInfoStore.system,
    };
    console.warn('memory-warning', data); // eslint-disable-line no-console
  });
};

console.log('小程序打包信息', process.env.buildInfo); // eslint-disable-line no-console

const App = createApp({
  onShow: initApp,
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.component('IconFont', IconFont);

App.use(createPinia()).use(alIconfont);

export default App;
