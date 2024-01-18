<template>
  <button v-if="accountStore.openid.length === 0" class="button-to-view" open-type="getPhoneNumber"
    @getphonenumber="getPhoneNumber">
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
const loginData = {
  phoneCode: '',
};

const myToast = ref<any>();

const getPhoneNumber = (e) => {
  loginData.phoneCode = e.detail.code;
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    accountStore
      .login()
      .then(() => { emit('callback', true); tapClick() })
      .catch(() => emit('callback', false));
  } else {
    myToast.value.mpmToastShow({
      icon: 'error',
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
