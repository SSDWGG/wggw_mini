<template>
  <!-- 会员续费弹框 -->
  <nut-overlay v-model:visible="homeModal.freeTrialExpired" :z-index="2000" :close-on-click-overlay='false'>
    <view :class="styles.wrapper">
      <view class="content">
        <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/renew.png" class="bg"></image>
        <view class='popupBtn' @tap="onGoMember"></view>
        <view  class="close" @tap="closePopup">
          <alIconfont name="icon-shanchu" size="30" fill="#333333" class="closeImg" /></view>
      </view>
    </view>
  </nut-overlay>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { useHomeModal } from '@/stores/homeModalCtrl';
// @ts-ignore
import styles from './styles.scss';

const homeModal = useHomeModal();

const onGoMember = () => {
  closePopup();
  Taro.navigateTo({
    url: '/pages/member/index'
  });
};

const closePopup = ()=>{
  homeModal.freeTrialExpired = false ;
};

</script>
