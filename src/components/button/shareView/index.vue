<template>
  <view  :class="styles.share">

    <nut-button  block type="primary" @tap="onShare">确认下单</nut-button>
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
            <image class="icon" src="@/assets/images/project/wechat.png" />
            <text>微信</text>
          </button>
          <button   class="share-content-item button-to-view" @tap="state.friendsToolsVisible = true">
            <image class="icon" src="@/assets/images/project/moments.png"/>
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
      src="@/assets/images/project/shareFriends.png"
    />
  </root-portal>
</view>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
// @ts-ignore
import styles from './styles.scss';


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
