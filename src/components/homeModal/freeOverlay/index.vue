
<template>
  <nut-overlay v-model:visible="homeModal.showfreePop" :z-index="2000" :close-on-click-overlay='false'>
    <view :class="styles.wrapper">
      <view class="content">
        <image  :src="cdnHost+ossFilePrePath+'KDGPJHIH-1732520101919poster-free-member-trial@2x.png' "  class="bg"></image>
          <view class='popupBtn'><check-login-button @callback="checkLogin" /></view>
        <view  class="close" @tap="closePopup">
          <alIconfont name="icon-shanchu" size="30" fill="#333333" class="closeImg" />
        </view>
      </view>
    </view>
  </nut-overlay>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
// import Taro from '@tarojs/taro';
import { useHomeModal } from '@/stores/homeModalCtrl';
import { useAccountStore } from '@/stores/account';
import checkLoginButton from '@/components/button/checkLoginButton.vue';
// @ts-ignore
import styles from './styles.scss';
import { cdnHost,ossFilePrePath } from '@/utils/env';

const homeModal = useHomeModal();
const account = useAccountStore();


watch(() => account.memberInfo, (memberInfo) => {
  // Do Not use !memberInfo.isMember asserttion，因为 memberInfo = {} memberInfo.isMember always be undefined
  if (memberInfo.isMember === false && !account.isLogined && !homeModal.neverShowFreePop) {
    homeModal.showfreePop = true;
  } else {
    homeModal.showfreePop = false;
  }
});

const checkLogin = (_ok: boolean) => {
  if (account.registerSource === 1) {
    // 是受邀请用户
    // if (ok) { // 登录成功
    //   Taro.navigateTo({ url: '/pages/member/index?from=invite' });
    //   closePopup();
    //   homeModal.closeBeginnerGuide(); // case 不需要新手引导
    // }
    closePopup();
  } else {
    // 正常进入 总是关闭
    closePopup();
  }
};

const closePopup = () => {
  homeModal.showfreePop = false ;
  homeModal.neverShowFreePop = true ;
};
</script>
