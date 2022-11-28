## 项目介绍

WGGW 小程序空间测试项目


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


### VS Code 插件安装

- [ESLint](vscode:extension/dbaeumer.vscode-eslint): 代码检查
- [Volar](vscode:extension/Vue.volar): Vue3 插件，在当前项目禁用 Vuter
- [TypeScript Vue Plugin](vscode:extension/Vue.vscode-typescript-vue-plugin)： 可选[Volar Takeover 模式](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)
- [CSS Modules](vscode:extension/clinyong.vscode-css-modules): 只对jsx智能识别
