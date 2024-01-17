<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="()=> (attrsParams as unknown as  IAttrsParams).onfullButtonBack()">
    <view class="full" >
      息屏
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue';

const attrsParams = useAttrs();

interface IAttrsParams  {
  onfullButtonBack:()=>void
}


</script>
