<template>
  <view class="icon fcc" style="margin-top: 8rpx">
    <check-login-button class="contact kf" @tap="test">
      电联
    </check-login-button>
    <!-- toast提示 -->
    <mpm-toast ref="myToast" :duration="2500" />
  </view>
</template>
<script lang="ts" setup>
import checkLoginButton from '@/components/button/checkLoginButton.vue';
import Taro from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import mpmToast from '@/components/myToast/index.vue';
import { ref } from 'vue';

// import { getUserApiTest } from '@/apis/mine';

const myToast = ref<any>();

const accountStore = useAccountStore();

const test = () => {
  Taro.authorize({
    scope: 'scope.record',
    fail: () => {
      myToast.value.mpmToastShow({
        icon: 'error',
        title: '您点击了拒绝授权，将会影响您的功能使用',
        duration: 2000,
      });
    },
    success: () => {
      // https://fuwu.weixin.qq.com/service/detail/00048c0090477065ad6b475ee56415
      wx.setEnable1v1Chat({
        enable: true,
        success(res) {
          wx.join1v1Chat({
            roomType: 'voice',
            // 接收方信息
            listener: {
              nickname: "杭州w彦祖", // 接收方名
              headImage: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg", // 头像，自行修改
              openid: "on2kW47NjXqCj22nJUszMgoq-z5M", //获取小程序用户的openId
            },
            caller: {
              nickname: "kun", // 拨打方名
              headImage: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg", // 头像，自行修改
              openid: accountStore.openid, //获取小程序用户的openId
            },
            success(res) {
              console.log("[startCallWx]res，在线成功拨打了", res);
            },
            fail(err) {
              myToast.value.mpmToastShow({
                icon: 'error',
                title: '对方暂时不在线，请您选择客服方式联系作者',
                duration: 5000,
              });
              // console.log("[startCallWx]err,不在线", err);
            },
          });
        },
        fail(err) {

          console.error("拨通失败", err);
        },
      });
    }
  });
  // getUserApiTest(1)

}
</script>
