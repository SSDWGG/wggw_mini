<template>
  <view v-if="isPermissionsToWx()" class="icon fcc" style="margin-top: 8rpx" @tap="()=> (attrsParams as unknown as  IAttrsParams).onbiddingButtonBack()">
    <view class="full" >
      创建
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue';
import { isPermissionsToWx } from '@/utils/index';

const attrsParams = useAttrs();

interface IAttrsParams  {
  onbiddingButtonBack:()=>void
}


</script>
