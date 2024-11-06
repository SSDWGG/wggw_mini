<template>
  <scroll-view  :class="[styles.myContainer,'pageIn']"  scroll-y="true" @scroll="onScroll">
    <navbar title="Menu" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their
      end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night.
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video
        class="video"
        object-fit="contain"
        :show-bottom-progress="false"
        :initial-time="0"
        :autoplay="true"
        :controls="false"
        :show-fullscreen-btn="false"
        :show-center-play-btn="false"
        :show-play-btn="false"
        :loop="true"
        :muted="true"
        :enable-progress-gesture="false"
        style="width: 100%"
        objectFit="fill"
        :src="cdnHost + ossFilePrePath + '/032dd063570aee17.mp4'"
      />
    </view>

    <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu>

    <side-bar :show="show" :showFlags="[1, 3, 4]" />
  </scroll-view>

  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, ref } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';
import { cdnHost, ossFilePrePath } from '@/utils/env';

const { show, onScroll } = useListScroll();

const account = useAccountStore();
const systemInfo = useSystemInfoStore();

const myToast = ref<any>();


const h5 =
  '<h2 style="text-align: center;color: #333;opacity: .7;"><strong>去创造去改变</strong></h2><h2 style="text-align: center;color: #333;opacity: .7;"><strong>从想象到现象</strong></h2><h2 style="text-align: center;color: #333;opacity: .7;"><strong>即刻出发</strong></h2>';
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);






</script>
