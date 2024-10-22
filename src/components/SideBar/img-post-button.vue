<template>
  <view @tap="handleChoose('image')">
    <image class="icon" src="@/assets/images/project/menuAdd.png"  />
  </view>
   <!-- toast提示 -->
   <my-toast-components ref="myToast" :duration="2500" />
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import Taro from '@tarojs/taro';
import type { IMediaType, IResult } from '@/components/selectMedia';
import selectMedia from '@/components/selectMedia';
import myToastComponents from '@/components/myToast/index.vue';


const myToast = ref<any>();

const account = useAccountStore();

interface IState {
  visible: boolean;
}

const state = reactive<IState>({
  visible: false,
});

const handleClose = () => {
  state.visible = false;
};

const handleChoose = async (type: IMediaType) => {
  handleClose();
  try {
    const list = await selectMedia(type);
    account.templeChoosePostList = list  as IResult[];
    Taro.navigateTo({
      url: `/pages/rrb/water-fall/post/index?type=${type}`
    });

  } catch (err) {
    myToast.value.myToastShow({
        icon: 'error',
        title: err.contentTips,
        duration: 2000,
      });
  }
};



</script>
