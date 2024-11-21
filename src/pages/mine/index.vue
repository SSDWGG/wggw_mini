<template>
  <view :class="styles.myContainer">
    <myNavBar title="我的信息" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
      <checkSystemButton button-type="chooseAvatar" class="head" >
      <image :src="account.userInfo.avatarurl"  />
      </checkSystemButton>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <!-- showNormalEditPop('编辑用户名','请输入用户名','username') -->
        <view class="content" @tap="nicknamePop.visible = true">
          {{ account.userInfo.username || '请输入用户名'}}
        </view>
      </view>

      <!-- 修改邮箱 -->
      <view v-if="isPermissionsToWx()" class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="@/assets/images/project/contact.png">
          </image>
          <text>邮箱</text>
        </view>
        <view class="content" @tap="showEmailPop">
          {{ account.userInfo.email || "点击验证邮箱" }}
        </view>
      </view>

      <!-- 修改手机号 -->
      <view v-if="isPermissionsToWx()" class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="@/assets/images/project/contact.png">
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
              src="@/assets/images/project/phone.png">
            </image>
            <nut-input v-model="emailPop.emailAccount" placeholder="请输入邮箱" class="input" />
          </view>
          <view class="verifyCode">
            <view class="inputDiv">
              <image class="img"
                src="@/assets/images/project/password.png" />
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

    <update-pop
      v-model:modelValue="normalPop.visable"
      v-model:inputValue="normalPop.inputValue"
      :title="normalPop.title"
      :placeholder="normalPop.placeholder"
      :max="normalPop.max"
      @ok="handleNormalPopOK"
    />

  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />

  <nickname-robber v-model:visible="nicknamePop.visible" @change="onChangeNickname"  />

</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { sendCode, testCode } from '@/apis/mine';
import checkSystemButton from '@/components/button/checkSystemButton.vue';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { checkEmail } from '@/utils/verify';
import { debounce } from 'lodash';
import NicknameRobber from '@/components/nicknameRobber';
import { isPermissionsToWx } from '@/utils/index';

definePageConfig({ backgroundColor: '#f3f3fe' });

const account = useAccountStore();

account.login();

const myToast = ref<any>();

const emailPop = reactive({
  popTipVisible: false,
  emailAccount: '',
  code: '',
  canSendTime: 0,
  intervalTimer: null as any,
});
const nicknamePop = reactive({
  visible: false,
});

const normalPop = reactive({
  visable:false,
  inputValue:'',
  title:'',
  placeholder:'',
  max:1000,
  // 当前修改的属性名
  attrName:''
});

const showEmailPop = () => {
  if(!account.userInfo.email){
    emailPop.popTipVisible = true;
  }
};

// const showNormalEditPop = (title,placeholder,attrName) => {
//   normalPop.title = title
//   normalPop.placeholder = placeholder
//   normalPop.attrName = attrName
//   normalPop.visable = true;
// };

const handleGetCode = () => {
  if (emailPop.canSendTime === 0) {
    checkEmail(emailPop.emailAccount)
      ? sendEmail()
      : myToast.value.myToastShow({
        icon: 'error',
        title: '请输入正确的邮箱格式',
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
  myToast.value.myToastShow({
    icon: 'success',
    title: '发送成功',
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
  emailPop.popTipVisible = false;
  myToast.value.myToastShow({
    icon: 'success',
    title: '绑定成功',
    duration: 3000,
  });
}
  , 3000, { leading: true, trailing: false });

const handleNormalPopOK = debounce(async()=>{
  // 更新userinfo
  account.userInfo[normalPop.attrName] = normalPop.inputValue;
  await account.updateUser();
  myToast.value.myToastShow({
    icon: 'success',
    title: '修改成功',
    duration: 3000,
  });

},3000, { leading: true, trailing: false });

const onChangeNickname = async (nickName: string) => {
  if (!nickName.trim()) return;
   // 更新userinfo
   account.userInfo.username = nickName;
  await account.updateUser();
  myToast.value.myToastShow({
    icon: 'success',
    title: '修改成功',
    duration: 3000,
  });
};

</script>
