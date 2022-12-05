<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- 插槽名称   #content -->
<template>
  <view class="stepsline" :class="styles.mpmStepsLine" >
    <view class="aside">
      <view class="point" />
    </view>
    <view class="mpmStepsLine-content">
      <slot name="content" />
    </view>
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
</script>
