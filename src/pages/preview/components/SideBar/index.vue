<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <view :class="styles.container">
    <!-- share -->
    <share-button
      v-if="hide(info.hideSideBarItem as any ?? [], 'share')"
      v-bind="$attrs"
    />
    <!-- heart -->
    <heart-button
      v-if="hide(info.hideSideBarItem as any ?? [], 'heart')"
      v-bind="$attrs"
    />
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
import styles from './styles.scss';
import ShareButton from './share-button.vue';
import DeleteButton from './delete-button.vue';
import SaveButton from './save-button.vue';
import HeartButton from './heart-button.vue';
import { useAttrs } from 'vue';

const info = useAttrs();
const hide = (arr: Array<any>, target: string) =>
  arr.findIndex(item => item === target) === -1 ? true : false;
</script>
