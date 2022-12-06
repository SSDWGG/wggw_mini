<template>
  <view class="bar-item"
    @tap="e => handleDelete(e)"
    ><image
      class="icon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JABPLIME-1666754579994编组 6@2x.png"
    />
    删除</view
  >
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { useAttrs } from 'vue';
import { useAccountStore } from '@/stores/account';
import { IMemo, IMemoItem } from '@/apis/memo/model';


const info = useAttrs().itemInfo as (IMemo & IMemoItem);
const store = useAccountStore();


const handleDelete = e => {  
  e.stopPropagation();
  Taro.showModal({
    content: `删除该${info.memoItemType===0?'照片':'视频'}？`,
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    confirmText: '删除',
    success: async res => {
      if (res.confirm) {
        await  store.removeMemoItem(info.memoId, info.memoResId);
      }
    }
  });
};
</script>
