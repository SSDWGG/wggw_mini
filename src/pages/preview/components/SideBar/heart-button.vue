<template>
    <view  class="bar-item"
    @tap="e => handleWant(e)"
    >
    <image
    v-if="info.heart"
      class="icon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/KMBMCIII-1667183567902编组 11@2x.png"
    />
    <image
    v-else
      class="icon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EEIIMCOL-1667183567902编组 11 2@2x.png"
    />
    喜欢</view
  >
 
</template>
<script lang="ts" setup>
import { IAlbumListItem, IPictureInfo } from '@/apis/album/model';

// import Taro from '@tarojs/taro';
import { useAttrs } from 'vue';
// import { useAlbumStore } from '@/stores/album';



// const store = useAlbumStore();

const info = useAttrs().itemInfo as IAlbumListItem & IPictureInfo;
console.log(info);


// const handleOkDelete =  useAttrs().onOkDelete  ;

const handleWant = e => {  
  e.stopPropagation();
  // 判断登录态 发送接口 修改store中的字段
  // await  store.removePicture(info.albumId, info.id);
  //         handleOkDelete();
};
  
</script>
