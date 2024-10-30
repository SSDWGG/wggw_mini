<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <view :class="styles.container">
    <!-- delete -->
    <!-- <delete-button
      v-bind="$attrs"
    /> -->
    <!-- svga -->
    <!-- <svga-button
      v-if="hide(info.hideSideBarItem as any ?? [], 'svga')&& (info.itemInfo as any).memoItemType===1"
      v-bind="$attrs"
    /> -->
    <!-- save -->
    <save-button
      v-bind="$attrs"
    />
  </view>
</template>

<!-- 需要抛出，按钮的操作回调 -->
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import SaveButton from './save-button.vue';

</script>
