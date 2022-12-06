<template>
  <view v-if="accStore.userInfo.id===info.creatorId" class="bar-item"
    @tap="e => handleDelete(e)"
    ><image
      class="icon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JABPLIME-1666754579994编组 6@2x.png"
    />
    删除</view
  >
</template>
<script lang="ts" setup>
import { IAlbumListItem, IPictureInfo } from '@/apis/album/model';
import Taro from '@tarojs/taro';
import { useAttrs } from 'vue';
import { useAlbumStore } from '@/stores/album';
import { useAccountStore } from '@/stores/account';



const store = useAlbumStore();

const info = useAttrs().itemInfo as IAlbumListItem & IPictureInfo;
const accStore = useAccountStore();

const handleOkDelete =  useAttrs().onOkDelete  ;

const handleDelete = e => {  
  e.stopPropagation();
  Taro.showModal({
    content: `删除该${info.albumType===0?'照片':'视频'}？`,
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    confirmText: '删除',
    success: async res => {
      if (res.confirm) {
        await  store.removePicture(info.albumId, info.id);
          handleOkDelete();

      }
    }
  });
};
</script>
