<template>
  <view :class="styles.testContainer" id="parent">
    <navbar title="加油吧，少年" background-color="transparent" :style="{position: 'absolute'}" />

    <view class="dtitle"> Keep going </view>
    <view class="contentText">
      <!-- <view >
        Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their
      end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night. 
      </view> -->
      <view>
        请不要相信胜利就像山坡上的蒲公英一样唾手可得。但是请相信，世上总有一些美好值得你全力以赴，哪怕粉身碎骨！
        人生当中成功只是一时的，失败却是主旋律。但是如何面对失败，却把人分成了不同的样子。
        有的人会被失败击垮，有的人能够不断地爬起来继续向前。
        我想真正的成熟并不是追求完美，而是直面自己的缺憾，这才是生活的本质。
        罗曼·罗兰说过，这个世上只有一种真正的英雄主义，那就是认清生活的真相，并且仍然热爱它。
        加油吧，少年！难道向上攀爬的那条路不是比站在顶峰更让人热血澎湃吗？
      </view>
    </view>
    <view class="bg" id="child1" :style="{backgroundPosition}">
      <span>WGGW</span>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';

// @ts-ignore
import styles from './styles.scss';
import { usePageScroll } from "@tarojs/taro";
import { computed, ref } from 'vue';

const scrollY = ref(0);

const backgroundPosition = computed(()=>`calc(50% + ${scrollY.value}px) calc(50% + ${scrollY.value}px)`)

usePageScroll((res) => {
  scrollY.value = res.scrollTop
})
</script>
