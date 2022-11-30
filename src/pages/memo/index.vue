<template>
  <navbar title="Memo" />
  <view :class="styles.myContainer">
    <side-bar />

  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { Navbar } from 'mini-ui';
import SideBar from './components/SideBar/index.vue';




</script>