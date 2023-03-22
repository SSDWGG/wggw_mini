<template>
      <navbar title="css-loaders" background-color="#f3f3fe" />
    <view :class="styles.cssloaders"> 
    <scroll-view class="listBox" scroll-y="true">
      <view class="title">
      <view>
        这是一些特殊的动效css的加载样式<view/>
        希望你会中意其中的部分动效
      </view>
      <view> Hope you enjoy these  CSS loaders.</view>
    </view>
    <pulsing />

        <hypnotic/>
        <Spinnertwo/>
        <Wobbligntwo/>
        <arcade/>
      
        <shapes />
        <shuriken />
        <infinity />
        <progressloader />

        <bars />
        <classic />
        <continuous />
        <dots />

       
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';

import styles from "./styles.scss";
import infinity from "../infinity/index.vue"
import progressloader from "../progress/index.vue"
import pulsing from "../pulsing/index.vue"
import shapes from "../shapes/index.vue"
import shuriken from "../shuriken/index.vue"


import bars from "../bars/index.vue"
import classic from "../classic/index.vue"
import continuous from "../continuous/index.vue"
import dots from "../dots/index.vue"


import hypnotic from "../hypnotic/index.vue"
import Spinnertwo from "../Spinnertwo/index.vue"
import arcade from "../arcade/index.vue"
import Wobbligntwo from "../Wobbligntwo/index.vue"
definePageConfig({ backgroundColor: "#f3f3fe" });

</script>
