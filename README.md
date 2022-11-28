## 项目介绍

云小叮小程序

### 产品prd：
- [云小叮1.0：— 商品相册功能迁移及优化、会员邀请](https://www.yuque.com/docs/share/d0e33084-f0ec-4efa-a413-f84a4d11bc1b?#)
- [云小叮1.1：买手功能 原型初版](https://app.mockplus.cn/s/a-hF4jTvKC0ta)


### UI设计稿
- [云相册 - 云小叮1.0](https://lanhuapp.com/web/#/item/project/stage?pid=b2804fa7-00fa-43b4-9a74-caa8d4e3b7a7&type=share_mark&teamId=f257a096-1aff-4052-837a-89f2031dfadf)

## 开发须知

- 以设计稿`375px`宽度为标准，使用 `px` 单位，点击事件使用 `@tap`
- 使用 [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy) 规范
- 页面pages统一使用[单文件组件 \<script setup\>](https://cn.vuejs.org/api/sfc-script-setup.html)：[TypeScript 与组合式 API](https://cn.vuejs.org/guide/typescript/composition-api.html)，组件可选使用JSX
- [vue style scoped 在小程序中无效](https://github.com/NervJS/taro/issues/6662)，使用css modules 替代方案。统一在vue组件中最外层使用 `:style="styles.className"` 子元素样式包裹在`:global{ .child-class {} }` 中
- 使用 [nutui](https://nutui.jd.com/#/zh-CN/component/button) UI 组件库，组件按需引入，不在全局注册。碰到与原生组件同名如 Button， 使用 `import { Button as NutButton } from '@nutui/nutui-taro'` 重命名，统一以 **Nut** 开头
- 请求异常报错统一用 catch 去处理：在接口请求中，返回的数据总是预知(正确)的
- 🚫 不要全局引入lodash `import _ from 'lodash'`，推荐 `import debounce from 'lodash/debounce'`；目前用了 babel-plugin-import 做了简单引入转换，`import { debounce } from 'lodash'`，如果编译报错 找不到，请使用前者引入；
- 🚫 [TS: 不支持类型导入与API一起使用](https://github.com/vuejs/core/issues/4294)
- 🚫 [TS: withDefaults(defineProps<Props>(), {}) 写法直接编译报错](https://github.com/vuejs/core/issues/5830)
- ⚠️ NutUI 有些组件交互 初始化依赖实际的尺寸边界，放入弹窗(不可见)可能会导致无法获得实际需要的size,rect，比如 Swipe 放在Popup 中



## 打包上传

```bash
npm run build:test # 测试
npm run build:release # 预发
npm run build:prod # 线上
```
打包好的代码，Taro已经做过转化/压缩处理，所以在微信开发者工具中，我们关闭它对代码转化的功能

![alt 微信开发者工具 - 本地配置](https://cdn.nlark.com/yuque/0/2022/jpeg/750264/1663210225696-b1384608-5792-431b-b5a1-bb06e5e4ae06.jpeg)


## 前端图片统一使用oss地址
 目前前端静态资源手动上传方案，图片资源使用oss  browser来上传到指定位置
 ![](https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/ossBrowser.png)
 ![](https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/upload_show.png)


### VS Code 插件安装

- [ESLint](vscode:extension/dbaeumer.vscode-eslint): 代码检查
- [Volar](vscode:extension/Vue.volar): Vue3 插件，在当前项目禁用 Vuter
- [TypeScript Vue Plugin](vscode:extension/Vue.vscode-typescript-vue-plugin)： 可选[Volar Takeover 模式](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)
- [CSS Modules](vscode:extension/clinyong.vscode-css-modules): 只对jsx智能识别

### 组件问题记录
-[nut-popup] nut-popup中嵌套nut-swipe时，需要将pop的初始visible设为ture，且不早于onMounted生命周期还原为为默认初始状态，否则nut-swipe滑动失效

### 写法问题记录
组件传递属性的时候   :xxxx = 'true'  不要简写  xxxx         使用完整写法，部分组件和标签无法识别简写写法
