<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="handleClick">
    <view class="full" >
      {{ pageData.loadingStatus?'取消选择':'批量下载' }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useAttrs,reactive } from 'vue';

const attrsParams = useAttrs();

const pageData= reactive({
  loadingStatus:false
});

interface IAttrsParams  {
  onDownloadAll:(Boolean)=>void
}

const handleClick = ()=>{
  pageData.loadingStatus = !pageData.loadingStatus;
  (attrsParams as unknown as  IAttrsParams).onDownloadAll(pageData.loadingStatus);
};

</script>
