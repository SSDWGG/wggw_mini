<template>
  <image class="icon" src="@/assets/images/menu/icon-menu-add.png" @tap="post" />
  <root-portal>
    <nut-popup v-model:visible="state.visible" position="bottom" round close-on-click-overlay
      @click-overlay="handleClose">
      <view :class="styles.post">
        <view class="share-content">
          <button id="share-my-album" class="share-content-item button-to-view" @tap="handleChooseText">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FJGIHKKK-1665298354947post-i.png" />
            <text>文本</text>
          </button>
          <button class="share-content-item button-to-view video-text" @tap="handleChoose('video')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GAAJFNKF-1665298354947post-v.png" />
            <text>视频</text>
          </button>
          <button id="share-my-album" class="share-content-item button-to-view" @tap="handleChoose('image')">
            <image class="icon"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FJGIHKKK-1665298354947post-i.png" />
            <text>图片</text>
          </button>
        </view>
      </view>
    </nut-popup>
    <my-toast v-model="state.toastVisible" :contentTips="state.contentTips" />
  </root-portal>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import styles from './styles.scss';
import MyToast from '@/components/postFailToast/index.vue';
import { useAccountStore } from '@/stores/account';
import Taro from '@tarojs/taro';
import selectMedia, { IMediaType, IResult } from '@/components/selectMedia';
import { useTabBarStore } from '../../pages/memoAndMine/custom-tab-bar/useTabBarStore';



const account = useAccountStore();

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
    console.log('选择的资源', list);
    account.templeChoosePostList = list  as IResult[]
    Taro.navigateTo({
      url: `/pages/memoAndMine/memo/post/index?type=${type}`
    });

  } catch (err) {
    console.log('上传抛出异常', err);
    state.contentTips = err.contentTips;
    state.toastVisible = true;
  }
};

const handleChooseText = () => {
  handleClose();
  account.templeChoosePostList = []
  Taro.navigateTo({
    url: `/pages/memoAndMine/memo/post/index?type=${'image'}`
  });
}

const tabbarstore = useTabBarStore();


const post = () => {
  state.visible = true
}

watch(() => state.visible, (val: boolean) => {
  tabbarstore.setVisible(!val);
});


</script>
