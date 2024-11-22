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
import { cdnHost, ossFilePrePath } from '@/utils/env';

const data = reactive({
  swiperList: [

    {
      avatar: `${cdnHost + ossFilePrePath }/FMELMEPB-17321801235001.jpg`,
      text: 'tomasi 邀请*麦,领取到了80元返现'
    },
    {
      avatar: `${cdnHost + ossFilePrePath }/KFONONAO-17321801235002.jpeg`,
      text: 'M~ 邀请**嘉,领取到了150元返现'
    },
    {
      avatar: `${cdnHost + ossFilePrePath }/IOIIDJMH-17321801235003.jpeg`,
      text: 'Sypha 邀请**财,领取到了200元返现'
    },
    {
      avatar: `${cdnHost + ossFilePrePath }/BCJAGHKA-17321801235004.jpeg`,
      text: 'yoga 邀请*天,领取到了49.5元返现'
    },
    {
      avatar: `${cdnHost + ossFilePrePath }/JOIENPBC-17321801235005.jpeg`,
      text: 'cool 邀请*凯,领取到了56元返现'
    }

  ]
});
</script>
