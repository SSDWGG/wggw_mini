<template>
  <view :class="styles.myContainer">
    <navbar title="我的信息" />
    <!-- <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="我的信息" /> -->

    <view class="info">
      <nut-form label-position="top" star-position="right">
        <nut-form-item label="username" required>
          <nut-input v-model="pageData.userInfo.nickName" placeholder="username" type="text" />
        </nut-form-item>
        <nut-form-item label="phone" required star-position="right">
          <nut-input v-model="pageData.userInfo.userMobile" placeholder="phone" type="text" />
        </nut-form-item>
        <nut-space style="margin: 10px">
      <nut-button type="primary" size="small" block @click="submit">确认修改</nut-button>
    </nut-space>
      </nut-form>
    </view>

  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />

</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
definePageConfig({ backgroundColor: '#f3f3fe' });
import { getUserInfo,setUserInfo } from '@/apis/lpt/mine';
import { switchTab } from '@tarojs/taro';
import Taro from '@tarojs/taro';


const myToast = ref<any>();

const pageData = reactive({
  userInfo: {
    nickName:'',
    userMobile:''
  }

});

const initPageData = async () => {
  const res = await getUserInfo();
  pageData.userInfo = res;
};

initPageData();

const submit = async() => {
  await setUserInfo(pageData.userInfo);
  myToast.value.myToastShow({
    icon: 'success',
    title: '修改成功',
    duration: 3000,
  });

  setTimeout(()=>{
    Taro.navigateBack();
  },2000);
};







</script>
