<template>
  <view :class="styles.myContainer">
    <navbar title="登录" hide-back background-color="#f5f5f9" />

    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="业主投票" />

    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、
    </nut-noticebar>

    <!-- logo -->
    <view class="head">
      <image src="@/assets/images/lpt/photographer.png" />
    </view>

    <!-- 页面文案 -->
    <view class="tip">
      <view class="t1"> 业主投票小助手是帮助业主提供投票选择物业服务的工具。 </view>
      <view class="t2"> 自主选择，快速投票! </view>
    </view>

    <!-- 绑定信息 -->
    <view v-if="pageData.isBinding" class="info">
      <view class="t3"> 本助手需要申请使用，绑定下方信息立即申请 </view>

      <!-- 小区 -->
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg" src="@/assets/images/lpt/MLADJHEL-1666324258493contact.png"> </image>
          <text>小区：</text>
        </view>
        <view class="content" @tap="handleShowSheet">
          {{ info.xqVal || '点击选择小区' }}
        </view>
      </view>

      <!-- 姓名 -->
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg" src="@/assets/images/lpt/MLADJHEL-1666324258493contact.png"> </image>
          <text>姓名：</text>
        </view>
        <view class="content" @tap="nicknamePop.visible = true">
          {{ info.username || '请输入姓名' }}
        </view>
      </view>

      <!--  手机号 -->
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg" src="@/assets/images/lpt/MLADJHEL-1666324258493contact.png"> </image>
          <text>手机号</text>
        </view>

        <button class="content button-to-view" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
          {{ !!info.phone ? '已授权' : '点击绑定手机号' }}
        </button>
      </view>

      <view class="btns">
        <nut-button block class="sqBtn" @click="handleClickBtn"> 确认申请 </nut-button>
      </view>
    </view>

    <view v-else class="binding">
      <view class="txt"> 已提交申请，点击刷新试试 </view>
      <nut-button block type="primary" class="fresh" @click="handleClickFreshBtn"> 刷新 </nut-button>
    </view>

    <!-- 选择小区  -->
    <nut-action-sheet v-model:visible="sheetShow" :menu-items="menuItems" @choose="choose" />

    <!-- 验证手机号 -->
    <update-pop v-model:modelValue="bindPhonePop.popTipVisible" confirmText="确认绑定" cancelText="取消绑定" :on-confirm="onConfirm" title="绑定手机号">
      <template #content>
        <view class="verify">
          <view class="phoneDiv">
            <image class="img" src="@/assets/images/lpt/EGPIFCHL-1686036360534phone.png"> </image>
            <nut-input v-model="bindPhonePop.phoneAccount" placeholder="请输入手机号" class="input" />
          </view>
          <view class="verifyCode">
            <view class="inputDiv">
              <image class="img" src="@/assets/images/lpt/BGHLBMOO-1686036371145v.png" />
              <nut-input v-model="bindPhonePop.code" placeholder="请输入验证码" type="number" />
            </view>
            <view class="getCodeBtn" @tap="handleGetCode">{{ bindPhonePop.canSendTime > 0 ? `重发${bindPhonePop.canSendTime}秒` : '获取验证码' }} </view>
          </view>
        </view>
      </template>
    </update-pop>

  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />

  <nickname-robber v-model:visible="nicknamePop.visible" @change="onChangeNickname" />
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { sendCode, testCode } from '@/apis/mine';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { checkEmail } from '@/utils/verify';
import { debounce } from 'lodash';
import NicknameRobber from '@/components/nicknameRobber';
import Taro from '@tarojs/taro';

definePageConfig({ backgroundColor: '#f3f3fe' });

const myToast = ref<any>();

const bindPhonePop = reactive({
  popTipVisible: false,
  phoneAccount: '',
  code: '',
  canSendTime: 0,
  intervalTimer: null as any,
});

const nicknamePop = reactive({
  visible: false,
});

const getPhoneNumber = (e) => {
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    info.phone = e.detail.code;
  } else {
    myToast.value.myToastShow({
      icon: 'error',
      title: '您点击了拒绝授权，将会影响您的功能使用',
      duration: 2000,
    });
  }
};

const handleGetCode = () => {
  if (bindPhonePop.canSendTime === 0) {
    checkEmail(bindPhonePop.phoneAccount)
      ? sendEmail()
      : myToast.value.myToastShow({
          icon: 'error',
          title: '请输入正确的手机号格式',
          duration: 3000,
        });
  }
};

const sendEmail = async () => {
  bindPhonePop.canSendTime = 30;
  bindPhonePop.intervalTimer = setInterval(() => {
    if (bindPhonePop.canSendTime > 0) {
      bindPhonePop.canSendTime--;
    } else {
      clearInterval(bindPhonePop.intervalTimer!);
    }
  }, 1000);
  await sendCode({
    email: bindPhonePop.phoneAccount,
  });
  myToast.value.myToastShow({
    icon: 'success',
    title: '发送成功',
    duration: 3000,
  });
};

const onConfirm = debounce(
  async () => {
    // 验证绑定验证码
    await testCode({
      email: bindPhonePop.phoneAccount,
      code: bindPhonePop.code,
    });
    // 更新userinfo
    info.phone = bindPhonePop.phoneAccount;

    bindPhonePop.popTipVisible = false;
    myToast.value.myToastShow({
      icon: 'success',
      title: '绑定成功',
      duration: 3000,
    });
  },
  3000,
  { leading: true, trailing: false },
);

const handleClickBtn = () => {
  console.log(1111);
  // 验证三条内容已填写
  pageData.isBinding = false;
};

const onChangeNickname = async (nickName: string) => {
  if (!nickName.trim()) return;
  // 更新userinfo
  info.username = nickName;
  myToast.value.myToastShow({
    icon: 'success',
    title: '修改成功',
    duration: 3000,
  });
};

const info = reactive({
  xqVal: '',
  username: '',
  phone: '',
});

const menuItems = [
  {
    name: '小区 A',
  },
  {
    name: '小区 B',
  },
  {
    name: '小区 C',
  },
];

// 选择小区
const sheetShow = ref(false);

const handleShowSheet = () => {
  sheetShow.value = true;
};

const choose = (item) => {
  info.xqVal = item.name;
};

const pageData = reactive({
  isBinding: true,
});

const handleClickFreshBtn = () => {
  myToast.value.myToastShow({
    icon: 'success',
    title: '刷新成功',
    duration: 3000,
  });
  Taro.navigateTo({ url: '/pages/menu/index' });
};
</script>
