<template>
  <view @tap="post">
    <image class="icon" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CNJBBHDF-1706331733330icon-menu-add.png"  />
  </view>
  <root-portal>
    <nut-popup v-model:visible="state.visible" position="bottom" round close-on-click-overlay
      @click-overlay="handleClose">
      <view :class="styles.post">
        <view class="share-content">
          <button id="share-my-album" class="share-content-item button-to-view" @tap="handleChooseText">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FJGIHKKK-1665298354947post-i.png" />
            <text>文本</text>
          </button>
          <button class="share-content-item button-to-view video-text" @tap="handleChoose('video')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GAAJFNKF-1665298354947post-v.png" />
            <text>视频</text>
          </button>
          <button id="share-my-album" class="share-content-item button-to-view" @tap="handleChoose('image')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FJGIHKKK-1665298354947post-i.png" />
            <text>图片</text>
          </button>
        </view>
      </view>
    </nut-popup>
  </root-portal>
   <!-- toast提示 -->
   <my-toast-components ref="myToast" :duration="2500" />
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue';
import styles from './styles.scss';
import { useAccountStore } from '@/stores/account';
import Taro from '@tarojs/taro';
import selectMedia, { IMediaType, IResult } from '@/components/selectMedia';
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
    account.templeChoosePostList = list  as IResult[]
    Taro.navigateTo({
      url: `/pages/memoAndMine/memo/post/index?type=${type}`
    });

  } catch (err) {
    myToast.value.myToastShow({
        icon: 'error',
        title: err.contentTips,
        duration: 2000,
      });
  }
};

const handleChooseText = () => {
  handleClose();
  account.templeChoosePostList = []
  Taro.navigateTo({
    url: `/pages/memoAndMine/memo/post/index?type=${'image'}`
  });
}


const post = () => {
  state.visible = true
}

</script>
