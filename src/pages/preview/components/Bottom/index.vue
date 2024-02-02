<template>
  <view :class="styles.bottom" @tap="e => e.stopPropagation()">
    <view class="userInfo">
      <view>
        <image :src="account.userInfo.avatarurl" class="avatar" />
      </view>
      <view class="nick">{{ account.userInfo.username }}</view>
    </view>
    <scroll-view scroll-y="true" class="scroll">
      <view class="content">
        {{ props.itemInfo.content }}
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { IMemo, IMemoItem } from '@/apis/memo/model';
import { useAccountStore } from '@/stores/account';


const props = defineProps({
  itemInfo: {
    default: {} as (IMemo & IMemoItem)
  }
});

const account = useAccountStore();

</script>
