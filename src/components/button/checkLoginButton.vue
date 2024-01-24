<template>
  <!--获取手机号  open-type="getPhoneNumber"
    @getphonenumber="getPhoneNumber" -->
  <button v-if="accountStore.userInfo.openid.length === 0" class="button-to-view" @tap="login">
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
import { useAccountStore } from '@/stores/account';
import mpmToast from '@/components/myToast/index.vue';

const emit = defineEmits<{
  (e: 'tap'): void;
  (e: 'callback', success: boolean): void;
}>();

const accountStore = useAccountStore();

const myToast = ref<any>();

const login = () => {
  accountStore.login()
    .then(() => { emit('callback', true); tapClick() })
    .catch(() => {emit('callback', false);myToast.value.mpmToastShow({
      icon: 'error',
      title: '登录失败，请联系客服处理~',
      duration: 2000,
    });});
}

const tapClick = () => {
  emit('tap');
};
</script>
