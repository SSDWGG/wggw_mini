<template>
  <button v-if="!accountStore.isLogined" class="button-to-view" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
    <slot></slot>
    <!-- toast提示 -->
  <mpm-toast ref="myToast" :duration="2500" />
  </button>
  <button v-else class="button-to-view" @tap="tapClick">
    <slot></slot>
    <!-- toast提示 -->
  <mpm-toast ref="myToast" :duration="2500" />
  </button>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import mpmToast from '@/components/myToast/index.vue';

const emit = defineEmits<{
  (e: 'tap'): void;
  (e: 'callback', success: boolean): void; 
}>();

const accountStore = useAccountStore();
const loginData = {
  loginCode: '',
  phoneCode: '',
};

const myToast = ref<any>();

const getPhoneNumber = (e) => {
  console.log(e);
  
  loginData.phoneCode = e.detail.code;
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    Taro.login({
      success: (res) => {
        loginData.loginCode = res.code;
        accountStore
          .login(loginData)
          .then(() => emit('callback', true))
          .catch(() => emit('callback', false));
      },
      fail: () => emit('callback', false),
    });
  } else {
    myToast.value.mpmToastShow({
        icon:'error',
        title: '您点击了拒绝授权，将会影响您的功能使用',
        duration: 2000,
    });
    emit('callback', false);
  }
};

const tapClick = () => {
  emit('tap');
};
</script>
