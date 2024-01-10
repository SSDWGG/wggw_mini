<template>
  <!-- 直接复制url，通过浏览器打开，给予提示 -->
  <view :class="styles.wgg">
    <view class="bg">
      <navbar  background-color="transparent" />
      <view class="content">
        <view class="tips"> ❤️ Welcome to star SSDWGG on github ❤️</view>
        <view class="project">
          <view v-for="item in data.dataList" :key="item.href" class="a" @tap="copyStr(item.href, {
            icon: 'none',
            title: `${item.showName} 网址链接复制成功`,
            duration: 2000
          })">
            {{item.showName}}</view>
        </view>
        <view class="tips">❤️ thanks for your attention ❤️</view>
        <person-card/>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { copyStr } from '@/utils/index';
import styles from './styles.scss';
import PersonCard from './components/PersonCard/index.vue';
import { Navbar } from '@fishui/taro-vue';
import { reactive } from 'vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});


const data = reactive({
    dataList: [
      {
        showName: 'GitHub(开源仓库)',
        href: 'https://github.com/SSDWGG',
      },
      {
        showName: 'MP_V2（个人中后台管理系统pc）',
        href: 'http://todo.ssdwgg.cn',
      },
      {
        showName: '云小叮微信小程序、wggw微信小程序',
        href: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/IFCAICKK-1683525307009WechatIMG25.png',
      },
      {
        showName: '诗文卡片',
        href: 'http://poem.ssdwgg.cn',
      },
      {
        showName: 'MRTK（流媒体视频项目）',
        href: 'https://ssdwgg.cn:8693',
      },
      {
        showName: 'GAME_hextris（游戏娱乐项目）',
        href: 'http://hextris.ssdwgg.cn',
      },
      {
        showName: 'RabbitMall（商城项目pc）',
        href: 'http://mall.ssdwgg.cn',
      },
      {
        showName: 'MGJ（练习项目pc）',
        href: 'http://mgj.ssdwgg.cn',
      },
      {
        showName: 'wgg_project（个人项目简介pc、移动端）',
        href: 'http://wgg.ssdwgg.cn',
      },
      {
        showName: 'IKUN_SHAKE（娱乐项目）',
        href: 'http://ikunqqq.ssdwgg.cn',
      },
      {
        showName: 'IKUN_STR（娱乐项目_移动端）',
        href: 'http://ikunstr.ssdwgg.cn',
      },
    ],
  });

</script>