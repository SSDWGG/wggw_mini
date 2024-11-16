<template>
  <nut-swiper :class="styles.swiper" loop auto-play="2000" direction="vertical" :touchable="false" >
      <nut-swiper-item v-for="(item, index) in data.swiperList" :key="index" class="swiper-item">
        <image class="avater" :src="item.avatar"></image>
        {{ item.text }}
      </nut-swiper-item>
  </nut-swiper>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
// @ts-ignore
import styles from './styles.scss';

const data = reactive({
  swiperList: [

    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NDOBPPNA-1666335570239lQDPJxbLpdPIhzHNAz3NAz2wdWec7chkt8YDTrkJCcBFAA_829_829.jpg_720x720g.jpg',
      text: 'tomasi 邀请*麦,领取到了80元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      text: 'M~ 邀请**嘉,领取到了150元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EAHHDJOO-1665731176017WechatIMG3876.jpeg',
      text: 'Sypha 邀请**财,领取到了200元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BBPJOFPC-1665731176017WechatIMG3872.jpeg',
      text: 'yoga 邀请*天,领取到了49.5元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CCGJELOF-1670468882402WechatIMG21.jpeg',
      text: 'cool 邀请*凯,领取到了56元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/OKBBKGEI-1665731176017WechatIMG3867.jpeg',
      text: 'Qiu 邀请*明,领取到了134元返现'
    },
    {
      avatar: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/HMJHMDJJ-1665731239440WechatIMG3875.jpeg',
      text: '#Zero 邀请**薇,领取到了80元返现'
    },

  ]
});
</script>
