<template>
  <view :class="styles.myContainer">
    <navbar title="我的信息" />
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <view class="head">
      <image :src="account.userInfo.avatarurl" @tap="handleChangeAvatarurl" />
    </view>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <view class="content">
          <NutInput v-model="account.userInfo.username" placeholder="请输入用户名" class="edit-NutInput" type="text"
            input-align="right" :border="false" :formatter="(str) => formatterLen(str, 30)" format-trigger="onChange" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>邮箱</text>
        </view>
        <!-- sendEmail(account.userInfo.email) -->
        <view class="content" @tap="showPop">
          {{ account.userInfo.email || "点击验证邮箱" }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>手机号</text>
        </view>

        <view class="content">
          <checkSystemButton button-type="getPhoneNumber">
            {{ account.userInfo.phone || "点击绑定手机号" }}
          </checkSystemButton>
        </view>
      </view>
    </view>

    <update-pop v-model:modelValue="emailPop.popTipVisible" confirmText="确认绑定" cancelText="取消绑定" :on-confirm="onConfirm"
      title="绑定邮箱">
      <template #content>
        <view class="verify">
          <view class="phoneDiv">
            <image class="img"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EGPIFCHL-1686036360534phone.png">
            </image>
            <nut-input v-model="emailPop.emailAccount" placeholder="请输入邮箱" class="input" />
          </view>
          <view class="verifyCode">
            <view class="inputDiv">
              <image class="img"
                src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BGHLBMOO-1686036371145v.png" />
              <nut-input v-model="emailPop.code" placeholder="请输入验证码" type="number" />
            </view>

            <view class="getCodeBtn" @tap="handleGetCode">{{
              emailPop.canSendTime > 0
              ? `重发${emailPop.canSendTime}秒`
              : "获取验证码"
            }}
            </view>
          </view>
        </view>
      </template>
    </update-pop>
  </view>
  <!-- toast提示 -->
  <mpm-toast ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
import { useAccountStore } from "@/stores/account";
import { Navbar } from "@fishui/taro-vue";
import styles from "./styles.scss";
import {
  WaterMark as NutWaterMark,
  Input as NutInput,
} from "@nutui/nutui-taro";
import selectMedia from "@/components/selectMedia";
import aliossUpload from "@/utils/alioss-upload";
import { sendCode, testCode } from "@/apis/mine";
import { formatterLen } from "@/utils/index";
import checkSystemButton from "@/components/button/checkSystemButton.vue";
import UpdatePop from "@/components/pop/updatePop/index.vue";
import { reactive, ref } from "vue";
import mpmToast from "@/components/myToast/index.vue";
import { checkEmail } from "@/utils/verify";
import { debounce } from 'lodash';

// import myImage from '@/components/image';

definePageConfig({ backgroundColor: "#f3f3fe" });

const account = useAccountStore();

account.login();

const myToast = ref<any>();

const emailPop = reactive({
  popTipVisible: false,
  emailAccount: "",
  code: "",
  canSendTime: 0,
  intervalTimer: null as any,
});

const showPop = () => {
  emailPop.popTipVisible = true;
};

const handleGetCode = () => {
  if (emailPop.canSendTime === 0) {
    checkEmail(emailPop.emailAccount)
      ? sendEmail()
      : myToast.value.mpmToastShow({
        icon: "error",
        title: "请输入正确的邮箱格式",
        duration: 3000,
      });
  }
};

const sendEmail = async () => {
  emailPop.canSendTime = 30;
  emailPop.intervalTimer = setInterval(() => {
    if (emailPop.canSendTime > 0) {
      emailPop.canSendTime--;
    } else {
      clearInterval(emailPop.intervalTimer!);
    }
  }, 1000);
  await sendCode({
    email: emailPop.emailAccount,
  });
  myToast.value.mpmToastShow({
    icon: "success",
    title: "发送成功",
    duration: 3000,
  });
};

const onConfirm = debounce(async () => {
  // 验证绑定验证码
  await testCode({
    email: emailPop.emailAccount,
    code: emailPop.code,
  });
  // 更新userinfo
  account.userInfo.email = emailPop.emailAccount;
  await account.updateUser();
  emailPop.popTipVisible = false
  myToast.value.mpmToastShow({
    icon: "success",
    title: "绑定成功",
    duration: 3000,
  });
}
  , 3000, { leading: true, trailing: false })

const handleChangeAvatarurl = async () => {
  const chooseList = await selectMedia("image", 1);
  const uploadResList: {
    status: number;
    name: string;
    path: string;
    fullpath: string;
    hash: string;
  }[] = await aliossUpload(chooseList[0].path);
  account.userInfo.avatarurl = uploadResList[0].fullpath;
  account.updateUser();
};
</script>
