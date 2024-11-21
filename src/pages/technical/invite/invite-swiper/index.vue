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
import avatar1 from './imgs/1.jpg';
import avatar2 from './imgs/2.jpeg';
import avatar3 from './imgs/3.jpeg';
import avatar4 from './imgs/4.jpeg';
import avatar5 from './imgs/5.jpeg';
import avatar6 from './imgs/6.jpeg';
import avatar7 from './imgs/7.jpeg';

const data = reactive({
  swiperList: [

    {
      avatar: avatar1,
      text: 'tomasi 邀请*麦,领取到了80元返现'
    },
    {
      avatar: avatar2,
      text: 'M~ 邀请**嘉,领取到了150元返现'
    },
    {
      avatar: avatar3,
      text: 'Sypha 邀请**财,领取到了200元返现'
    },
    {
      avatar: avatar4,
      text: 'yoga 邀请*天,领取到了49.5元返现'
    },
    {
      avatar: avatar5,
      text: 'cool 邀请*凯,领取到了56元返现'
    },
    {
      avatar: avatar6,
      text: 'Qiu 邀请*明,领取到了134元返现'
    },
    {
      avatar: avatar7,
      text: '#Zero 邀请**薇,领取到了80元返现'
    },

  ]
});
</script>
