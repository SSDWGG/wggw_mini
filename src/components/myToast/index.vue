<!--  支持props+store调用 ,页面和深层子组件支持写多个toast而不用来回回调，同时调用多个toast会出现重叠-->
<template>
  <root-portal v-if="props.isRootPortal">
    <view v-if="!!target.icon" :class="styles.myToastDiv">
      <nut-toast :visible="target.visible" :title="target.title" :msg="target.msg" custom-class="myToast" :icon="iconRender" />
    </view>
    <view v-else :class="styles.myToastDivNoIcon">
      <!--  :center="false"
      bottom="0px" -->
      <nut-toast :visible="target.visible" :title="target.title" :msg="target.msg" custom-class="myToast" :icon="iconRender"/>
    </view>
  </root-portal>
  <view v-else>
    <view v-if="!!target.icon" :class="styles.myToastDiv">
      <nut-toast :visible="target.visible" :title="target.title" :msg="target.msg" custom-class="myToast" :icon="iconRender" />
    </view>
    <view v-else :class="styles.myToastDivNoIcon">
      <!--  :center="false"
      bottom="0px" -->
      <nut-toast :visible="target.visible" :title="target.title" :msg="target.msg" custom-class="myToast" :icon="iconRender" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { uuid } from '@/utils/index';
import { h, watchEffect } from 'vue';
// @ts-ignore
import styles from './styles.scss';
import { IMyToastState, IVariable, useToastStore } from './useToastStore';
import { IconFont } from '@nutui/icons-vue-taro';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3500,
  },
  title: {
    type: String,
    default: '',
  },
  msg: {
    type: String,
    default: '',
  },
  isRootPortal: {
    type: Boolean,
    default: true,
  },
});

const store = useToastStore();

const toastUUID = uuid();

store.addToast(toastUUID);

const iconRender = ()=>h(IconFont,{name:target.icon});

const target = store.state.find((item) => item.id === toastUUID) as IMyToastState;

watchEffect(() => {
  target.title = props.title;
  target.icon = props.icon;
  target.msg = props.msg;
});

// 支持ref调用
const myToastShow = (val: IVariable) => {
  target.icon = store.ICONS[val.icon || props.icon] || '';
  target.msg = val.msg || props.msg;
  target.title = val.title || props.title;
  target.duration = val.duration || props.duration;
  store.showToast(toastUUID);
};


defineExpose({
  // 控制toast显示
  myToastShow,
  toastUUID,
});
</script>
