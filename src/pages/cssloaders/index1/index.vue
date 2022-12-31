<template>
  <view :class="styles.myContainer">
    <navbar title="css-loaders" background-color="transparent" />
    <view class="title">Hope you liked this first collection of CSS loaders.</view>
    <scroll-view class="listBox" scroll-y="true">
        <pulsing />
        <shapes />
        <shuriken />
        <infinity />
        <progressloader />
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from "mini-ui";
import styles from "./styles.scss";
import infinity from "../infinity/index.vue"
import progressloader from "../progress/index.vue"
import pulsing from "../pulsing/index.vue"
import shapes from "../shapes/index.vue"
import shuriken from "../shuriken/index.vue"
definePageConfig({ backgroundColor: "#f3f3fe" });

</script>
