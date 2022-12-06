<template>
  <ShareButton v-if="album.currentIndex !== 1" @tap="e=>{ e.stopPropagation();}">
    <view class="bar-item" :style="{ marginBottom: ' 26px' }">
      <image
        class="icon"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EJIPNANG-1666754583136编组 3@2x.png"
      />
      分享
    </view>
  </ShareButton>
</template>
<script lang="ts" setup>
import ShareButton from '@/components/button/ShareButton';
import { useAlbumStore } from '@/stores/album';

const album = useAlbumStore();
</script>
