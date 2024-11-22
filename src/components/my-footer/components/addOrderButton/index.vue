<template>
  <!--  -->
  <check-login-button  buttonType="login" class="btnAddShop" @tap="handeleClick">
    结算
  </check-login-button>
</template>
<script lang="ts" setup>
import checkLoginButton from '@/components/button/checkSystemButton.vue';
import Taro from '@tarojs/taro';
import { useAttrs } from 'vue';


const router = Taro.useRouter();


const attrsParams = useAttrs();

const handeleClick = () => {
  Taro.navigateTo({
    url:
      // eslint-disable-next-line max-len
      `/pages/order/details/addChoose/index?superOrderId=${attrsParams.superOrderId}&yunAlbumChoiceGoodId=${attrsParams.choiceGoodId}&choicerIdentity=${attrsParams.identity}&preChoiceGoodId=${router.params.preChoiceGoodId}`
  });
};

</script>
