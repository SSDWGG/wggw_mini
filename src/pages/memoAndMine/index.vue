<template>
  <view :class="styles.memoAndMine">
    <navbar title="我的多媒体记录" background-color="transparent" />
    <view class="content"  :style="{ height }">
     <memo v-if="store.selected===0"/>
     <mine v-if="store.selected===1"/>
    </view>
    <tabbar class="tab"/>
  </view>
  <side-bar />

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import tabbar from './custom-tab-bar/index.vue'
import memo from './memo/index.vue'
import mine from './mine/index.vue'
import { Navbar } from '@fishui/taro-vue';
import { useTabBarStore } from './custom-tab-bar/useTabBarStore';
import { computed } from 'vue';
import { useSystemInfoStore } from '@/stores/systemInfo';

const store = useTabBarStore();
const systemInfo = useSystemInfoStore();



// 100% - tabsHeader.height - tabBar.height - safeArea.bottom.height
const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx - ${store.height} - env(safe-area-inset-bottom))`
);




</script>