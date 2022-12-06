<template>
  <view :class="styles.bottom">
    <view class="userInfo">
      <view>
        <image :src="account.avatarurl" class="avatar" />
      </view>
      <view class="nick" >{{ account.username }}</view>
    </view>
    <view class="content">{{ changeLongStr(props.itemInfo.content) }}</view>
  </view>
</template>
<script lang="ts" setup>
import { changeLongStr } from '@/utils/index';
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
