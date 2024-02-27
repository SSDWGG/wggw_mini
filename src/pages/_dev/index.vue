<template>
  <Navbar title="配置环境" />
  <NoticeBar :text="`当前baseURL ${baseURL}`" background="rgba(251, 248, 220, 1)" color="#D9500B" />
  <view :class="styles.devip">
    <nut-input v-model="state.url" placeholder="请输入api 地址" />
    <view class="cz">
      <view>快速选择</view>

      <view class="persist">
        <text>持久化</text>
        <nut-switch v-model="state.checked" />
      </view>
    </view>

    <view v-for="api in apiList" :key="api.env" class="listitem" @tap="() => (state.url = api.baseApi)"> {{ api.env }}: {{ api.baseApi }} </view>
    <nut-button :class="styles.footer" block type="primary" @tap="submit">确认修改</nut-button>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { baseURL, setBaseURL } from '@/utils/request';
import { allConfigs } from '@/utils/env';
// @ts-ignore
import styles from './styles.scss';
import myToastComponents from "@/components/myToast/index.vue";

const myToast = ref<any>();

const apiList = Object.keys(allConfigs)
  .map((env) => ({
    env,
    baseApi: allConfigs[env].baseApi,
  }))
  .concat([
    { env: '光利', baseApi: 'http://192.168.19.214:23792' },
    { env: '🍔', baseApi: 'http://192.168.19.48:23792' },
    { env: '大**', baseApi: 'http://192.168.19.93:8888' },
  ]);

const state = reactive({
  url: baseURL,
  checked: true,
});

const submit = () => {
  Taro.showModal({
    title: '确定接口更改为下面？',
    content: state.url,
    success: (res) => {
      if (res.confirm) {
        setBaseURL(state.url);
        if (state.checked) {
          Taro.setStorageSync('wggw-dev-baseURL', state.url);
        } else {
          Taro.removeStorageSync('wggw-dev-baseURL');
        }
        
        myToast.value.myToastShow({
          title: '修改成功',
          icon: 'success',
        });
      }
    },
  });
};
</script>
