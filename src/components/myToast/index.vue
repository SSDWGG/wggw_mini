<!--  支持props+store调用 ,页面和深层子组件支持写多个toast而不用来回回调，同时调用多个toast会出现重叠-->
<template>
  <root-portal>
    <view v-if="!!target.icon" :class="styles.mpmToastDiv">
      <nut-toast :visible="target.visible" :title="target.title" :msg="target.msg" custom-class="mpmtoast"
        :icon="target.icon" />
    </view>
    <view v-else :class="styles.mpmToastDivNoIcon">
      <!--  :center="false"
      bottom="0px" -->
      <nut-toast :visible="target.visible" :title="target.title" 
     
      :msg="target.msg" custom-class="mpmtoast"
        :icon="target.icon" />
    </view>
</root-portal>
</template>



<script lang="ts" setup>
import { uuid } from '@/utils/index';
// import { Toast as NutToast } from '@nutui/nutui-taro';
import { watchEffect } from 'vue';
import styles from './styles.scss';
import { IMpmToastState, IVariable, useToastStore } from './useToastStore';




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
});



const store = useToastStore();

const toastUUID = uuid();

store.addToast(toastUUID);

const target = store.state.find(item => item.id === toastUUID) as IMpmToastState;

watchEffect(() => {
  target.title = props.title;
  target.icon = props.icon;
  target.msg = props.msg;
});

// 支持ref调用
const mpmToastShow = (val: IVariable) => {
  target.icon = store.ICONS[val.icon || props.icon] || '';
  target.msg = val.msg || props.msg;
  target.title = val.title || props.title;
  target.duration = val.duration || props.duration;
  store.showToast(toastUUID);
};

defineExpose({
  // 控制toast显示
  mpmToastShow,
  toastUUID
});
</script>
