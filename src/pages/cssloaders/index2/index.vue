<template>
  <view :class="styles.myContainer">
    <navbar title="css-loaders" background-color="transparent" />
    <view class="title">Hope you liked this first collection of CSS loaders.</view>
    <scroll-view class="listBox" scroll-y="true"> <spinner />
        <bars />
        <classic />
        <continuous />
        <dots />
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from "mini-ui";
import styles from "./styles.scss";
import bars from "../bars/index.vue"
import classic from "../classic/index.vue"
import continuous from "../continuous/index.vue"
import dots from "../dots/index.vue"
definePageConfig({ backgroundColor: "#f3f3fe" });

</script>
