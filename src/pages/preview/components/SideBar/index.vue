<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <view :class="styles.container">
    <!-- delete -->
    <delete-button
      v-if="hide(info.hideSideBarItem as any ?? [], 'delete')"
      v-bind="$attrs"
    />
    <!-- save -->
    <save-button
      v-if="hide(info.hideSideBarItem as any ?? [], 'save')"
      v-bind="$attrs"
    />
  </view>
</template>

<!-- 需要抛出，按钮的操作回调 -->
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import DeleteButton from './delete-button.vue';
import SaveButton from './save-button.vue';
import { useAttrs } from 'vue';

const info = useAttrs();
const hide = (arr: Array<any>, target: string) =>
  arr.findIndex(item => item === target) === -1 ? true : false;
</script>
