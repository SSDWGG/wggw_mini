<template>
  <cover-view v-show="store.visible" :class="styles.tabbar">
    <cover-view :class="styles.topBorder" />
    <cover-view :class="styles.container">
      <cover-view
        v-for="(item, index) in tabList"
        :key="index"
        :class="styles.item"
        @tap="switchTab(index, item.pagePath)"
      >
        <cover-image
          :class="styles.icon"
          :src="store.selected === index ? item.selectedIconPath : item.iconPath"
        />
        <cover-view
          :class="styles.text"
          :style="{ color: store.selected === index ? selectedColor : color }"
        >
          {{ item.text }}
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view :class="styles.bottomArea" />
  </cover-view>
</template>
<script lang="ts" setup>
/**
 * 微信小程序自定义 Tabbar https://taro-docs.jd.com/taro/docs/custom-tabbar/
 * 第一次加载 TabBar 页时 TabBar 会闪烁：自定义 TabBar 在各个 TabBar 页面初始化时都会创建一个新的组件实例导致
 * https://github.com/NervJS/taro/issues/7302
 * 
 * ⚠️ selected 不能通过组件自己的 state（ref/reactive）触发渲染，与小程序setData不同步，可通过状态管理
 * 不能使用 pinia 的函数写法（类似于一个组件setup(), 内部同样使用ref/reactive）这种情况将在真机上无效
 * 
 * tabbar实例存在每一个页面？？ https://developers.weixin.qq.com/community/develop/doc/000e6081cacf6058ac082094656000
*/
import Taro from '@tarojs/taro';
import { useTabBarStore, tabList } from './useTabBarStore';
import styles from './styles.scss';
import { useAccountStore } from '@/stores/account';


const color = '#747474';
const selectedColor = '#7468F2';
const store = useTabBarStore();
const account = useAccountStore();


const switchTab = (index, url) => {
  

  if (index === store.selected) return;

  account.getStorage(account.$state)

  store.setSelected(index);
  Taro.switchTab({ url: `/${url}` });
};

</script>