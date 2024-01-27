<template>
    <image class="icon"  style="margin-top: 8rpx" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/ANLMOBKI-1706328203630icon-album-share.png" @tap="onShare" />

  <root-portal>
    <nut-popup
      v-model:visible="state.visible"
      position="bottom"
      round
      close-on-click-overlay
      @click-overlay="handleClose"
    >
      <view :class="styles.share">
        <view  class="share-content">
          <button class="share-content-item button-to-view" open-type="share" data-from="all">
            <image class="icon" src="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/wechat.png" />
            <text>微信</text>
          </button>
          <button v-if="props.type === 'general' " class="share-content-item button-to-view" @tap="state.friendsToolsVisible = true">
            <image class="icon" src="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/moments.png"/>
            <text>朋友圈</text>
          </button>
        </view>

        <view class="footer" @tap="handleClose"> 取消 </view>
      </view>
    </nut-popup>
    <!--朋友圈分享提示图片 -->
    <image
      v-show="state.friendsToolsVisible"
      :class="styles.shareFriendsTools"
      src="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/shareFriends.png"
    />
  </root-portal>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import styles from './styles.scss';

const props = withDefaults(defineProps<{ type?: 'goods'|'general' }>(), {
  type: 'general',
});


interface IState {
  visible: boolean;
  friendsToolsVisible: boolean;
}
const state = reactive<IState>({
  visible: false,
  friendsToolsVisible: false
});

const onShare = () => {
  state.visible = true;
};

const handleClose = () => {
  state.visible = false;
  state.friendsToolsVisible = false;
};
</script>
