<template>
  <view :class="styles.bottom" @tap="e => e.stopPropagation()">
    <view class="userInfo">
      <view>
        <image :src="account.avatarurl" class="avatar" />
      </view>
      <view class="nick">{{ account.username }}</view>
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
import { useAttrs } from 'vue';
import { IMemo, IMemoItem } from '@/apis/memo/model';
import { useAccountStore } from '@/stores/account';


const props = defineProps({
  itemInfo: {
    default: {} as (IMemo & IMemoItem)
  }
});

const account = useAccountStore();


const info = useAttrs();

</script>
