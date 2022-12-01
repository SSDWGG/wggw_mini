<template>
    <image class="icon" src="@/assets/images/album/icon-album-add.png" @tap="state.visible = true"/>
  <root-portal>
    <nut-popup
      v-model:visible="state.visible"
      position="bottom"
      round
      close-on-click-overlay
      @click-overlay="handleClose"
    >
      <view :class="styles.post">
        <view class="share-content">
          <button id="share-my-album" class="share-content-item button-to-view" @tap="handleChoose('image')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FJGIHKKK-1665298354947post-i.png" />
            <text>图片</text>
          </button>
          <button class="share-content-item button-to-view video-text" @tap="handleChoose('video')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GAAJFNKF-1665298354947post-v.png" />
            <text>视频</text>
          </button>
        </view>
      </view>
    </nut-popup>
    <my-toast v-model="state.toastVisible" :contentTips="state.contentTips" />
  </root-portal>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import styles from './styles.scss';
import selectMedia, { IMediaType, IResult } from '../selectMedia';
import MyToast from '@/components/postFailToast/index.vue';
import { useAccountStore } from '@/stores/account';
import Taro from '@tarojs/taro';
const accountStore = useAccountStore();

interface IState {
  visible: boolean;
  toastVisible: boolean;
  contentTips: string
}

const state = reactive<IState>({
  visible: false,
  toastVisible: false,
  contentTips: '',
});

const handleClose = () => {
  state.visible = false;
};




const handleChoose = async (type: IMediaType) => {
  handleClose();
  try {
    const list = await selectMedia(type);
    console.log('选择的资源',list);
    accountStore.templeChoosePostList = list
    Taro.navigateTo({
      url: `/pages/memo/post/index?type=${type}`
    });
    
  } catch (err) {
    console.log('上传抛出异常', err);
    state.contentTips = err.contentTips;
    state.toastVisible = true;
  }
};

</script>
