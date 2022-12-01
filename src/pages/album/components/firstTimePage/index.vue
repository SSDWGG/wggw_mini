<template>
  <view :class="styles.myContainer" v-if="account.showTabs" :style="{ height: '200vh' }">
    <view class="pagehead">
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
      {{account.NoticeBarText}}
      </nut-notice-bar>
      <!-- day progress -->
     <MyCircleProgress  @tap="switchTabs" format="MM-DD hh:mm"/>
      <!-- begin button  -->
      <view class="pulldown">Pulldown</view>
    </view>
    <view class="menu">
      <view class="menu-item" @tap="goto(item)" v-for="(item, index) in data.menuList" :key="index">
        <view class="title">
          {{ item.title }}
        </view>
      </view>
    </view>
  </view>
  <view :class="styles.myContainer" v-else :style="{ height: '100vh' }">
    <view class="pagehead">
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
       {{account.NoticeBarText}}
      </nut-notice-bar>
      <!-- day progress -->
      <MyCircleProgress  @tap="switchTabs" format="MM-DD hh:mm"/>
    </view>
  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import {
  NoticeBar as NutNoticeBar,
} from '@nutui/nutui-taro';
import {  reactive } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useTabBarStore } from '../../../../custom-tab-bar/useTabBarStore';
import Taro from '@tarojs/taro';
import MyCircleProgress from '@/components/MyCircleProgress/index.vue';



definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const tabbarstore = useTabBarStore();

const account = useAccountStore();

const data = reactive({
  menuList: [
    {
      title: "MEMO",
      router: '/pages/memo/index'
    },
    {
      title: "TIME",
      router: '/pages/time/index'
    },
  ]
})

const switchTabs = () => {
  account.showTabs = !account.showTabs
  tabbarstore.setVisible(account.showTabs);
}

const goto = (item) => {
  Taro.navigateTo({ url: item.router });
}





</script>