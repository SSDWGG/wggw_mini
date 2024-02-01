<template>
  <!--获取手机号   -->
  <button
    v-if="!accountStore.isLogin() && props.buttonType === 'login'"
    class="button-to-view"
    @tap="login"
  >
    <slot></slot>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </button>
  <button
    v-else-if="
      accountStore.userInfo.phone.length === 0 &&
      props.buttonType === 'getPhoneNumber'
    "
    class="button-to-view"
    open-type="getPhoneNumber"
    @getphonenumber="getPhoneNumber"
    @tap="login"
  >
    <slot></slot>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </button>
  <button v-else-if=" props.buttonType === 'chooseAvatar'" open-type="chooseAvatar" class="button-to-view" @chooseavatar="onChangeAvatar">
    <slot></slot>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </button>
  <button v-else class="button-to-view" @tap="tapClick">
    <slot></slot>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </button>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useAccountStore } from "@/stores/account";
  import myToastComponents from "@/components/myToast/index.vue";
  import type { BaseEventOrig } from '@tarojs/components';
import aliossUpload from "@/utils/alioss-upload";

  export type IButtonType = "login" | "getPhoneNumber" | "chooseAvatar";

  interface IProps {
    buttonType: IButtonType;
  }

  const props = withDefaults(defineProps<IProps>(), {
    buttonType: "login",
  });

  const emit = defineEmits<{
    (e: "tap"): void;
    (e: "callback", success: boolean): void;
  }>();

  const accountStore = useAccountStore();

  const myToast = ref<any>();

  const login = () => {
    accountStore
      .login()
      .then(() => {
        emit("callback", true);
        tapClick();
      })
      .catch(() => {
        emit("callback", false);
        myToast.value.myToastShow({
          icon: "error",
          title: "登录失败，请联系客服处理~",
          duration: 2000,
        });
      });
  };

  const getPhoneNumber = (e) => {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      accountStore
        .bindPhone(e.detail.code)
        .then(() => {
          emit("callback", true);
          tapClick();
        })
        .catch(() => {
          emit("callback", false);
          myToast.value.myToastShow({
            icon: "error",
            title: "绑定手机号失败，请联系客服处理~",
            duration: 2000,
          });
        });
    } else {
      myToast.value.myToastShow({
        icon: "error",
        title: "您点击了拒绝授权，将会影响部分功能使用",
        duration: 2000,
      });
      emit("callback", false);
    }
    // @ts-ignore
    if (props.eventName) wx.aldstat.sendEvent(props.eventName, {});
  };

  /**
 * 更换头像相关
 */
const onChangeAvatar = async(e: BaseEventOrig<{ avatarUrl: string }>) => {
  const filePath = e.detail.avatarUrl;
  if (!filePath) return;
  const uploadResList: {
    status: number;
    name: string;
    path: string;
    fullpath: string;
    hash: string;
  }[] = await aliossUpload(filePath);
  accountStore.userInfo.avatarurl = uploadResList[0].fullpath;
  accountStore.updateUser();
};

  const tapClick = () => {
    emit("tap");
  };
</script>
