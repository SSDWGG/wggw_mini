<template>
  <view event-name="sider-button-album-add-click" check-member @tap="handleChoose">
    <image class="icon" src="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/icon-album-add.png" />
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import checkLoginButton from '@/components/button/checkLoginButton.vue';
import selectMedia from '../selectMedia';

const handleChoose = async () => {
  try {
    const list = await selectMedia('mix');
    Taro.setStorageSync('templeChoosePostList', list);
    // 0:'访客｜未注册的用户', 1:'门店管理员', 2:'门店员工', 3:'门店买手', 4:'工厂管理员', 5:'工厂员工', 6:'个人买手', 7:'个人用户'
    // 上传商品相册？(!account.isGeneralAlbum || account.identity === 1)
    Taro.navigateTo({ url: '/pages/memoAndMine/memo/post/index' });
  } catch (err) {}
};

</script>
