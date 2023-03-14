<template>
      <navbar title="css-loaders" background-color="transparent" />

  <view :class="styles.myContainer">
    <view class="title">Hope you liked this first collection of CSS loaders.</view>
    <scroll-view class="listBox" scroll-y="true">
     
        <hypnotic/>
        <Spinnertwo/>
        <Wobbligntwo/>
        <arcade/>
     
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
import styles from "./styles.scss";
import hypnotic from "../hypnotic/index.vue"
import Spinnertwo from "../Spinnertwo/index.vue"
import arcade from "../arcade/index.vue"
import Wobbligntwo from "../Wobbligntwo/index.vue"
definePageConfig({ backgroundColor: "#f3f3fe" });
</script>
