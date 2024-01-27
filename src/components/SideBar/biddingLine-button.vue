<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="()=> (attrsParams as unknown as  IAttrsParams).onbiddingLineButtonBack()">
    <view class="full" >
      报价
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue';

const attrsParams = useAttrs();

interface IAttrsParams  {
  onbiddingLineButtonBack:()=>void
}


</script>
