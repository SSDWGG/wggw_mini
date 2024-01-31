<!-- 不能函数是调用toast，不能使用duration属性 -->
<template>
  <view :class="styles.myToastDiv">
    <nut-toast 
    :visible="toastVisable" 
    :title="props.title" 
    :msg="props.contentTips"
    custom-class="mytoast"
    icon="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IBHDJHHP-1665451624450warring-icon.png"
    bg-color='rgba(0, 0, 0, 0.8)' 
    @closed="onClosed"
    />
  </view>
</template>

<script lang="ts" setup>
// import { 
//     Toast  as NutToast,
//   } from '@nutui/nutui-taro';
import { ref, toRef, watch } from 'vue';
import styles from './styles.scss';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3500
  },
  title:{
    type: String,
    default: '上传失败'
  },
  contentTips:{
    type: String,
    default: ''
  }
});

const emit = defineEmits(['onClosed','update:modelValue']);

const onClosed = ()=>{
  emit('onClosed');
};

const toastVisable = ref(props.modelValue);

watch(toRef(props, 'modelValue'), (val) => {
    toastVisable.value = val;

    // 组件内部维护隐藏功能
    if(val){
      setTimeout(()=>{
        toastVisable.value = false;
        emit('update:modelValue',false);
      },props.duration);
    }
    });
</script>
