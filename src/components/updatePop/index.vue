<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <!-- 使用root-portal会造成无法修改css的问题，所有使用root-portal的情况css需要保持不可变 -->
  <!-- <root-portal > -->
    <!-- 不能设置属性 :close-on-click-overlay="false" ，否则不触发点击遮罩事件  该弹窗统一为可以点击遮罩关闭 -->
    <nut-popup v-model:visible="popVisable"  :class="styles.updatePopDiv" pop-class="my-pop" :z-index="999"
    @click-overlay="handleClose('overlay')">
      <view class="content">
        <slot v-if="!!slots.title" name="title" />
        <view v-else class="title">{{props.title}}</view>
        <slot v-if="!!slots.content" name="content" />
        <view v-else-if="!!contentText" class="contentText">
          {{props.contentText}}
        </view>
        <!--  请不要使用ui库的长度限制属性，在ios上，会出现bug -->
        <view v-else >
          <nut-input v-model="inputValue" :border="false" 
        :formatter="(str)=>formatterLen(str,props.max)"  
        format-trigger="onChange"  
        v-bind="$attrs"
         />
         <view class="error-text">
            {{props.errorText}}
         </view>
        </view>
         <slot v-if="!!slots.contentBottom" name="contentBottom" />
      </view>
      <view class="footer">
        <view class="cancel" @tap="handleClose('button')">{{props.cancelText}}</view>
        
        <view  class="confirm" @tap="handleOk">{{props.confirmText}}</view>

      </view>
    </nut-popup>
  <!-- </root-portal> -->

</template>


<script lang="ts" setup>
import { ref, toRef, watch, useSlots } from 'vue';
// @ts-ignore
import styles from './styles.scss';
import {
  Input as NutInput,
} from '@nutui/nutui-taro';
import { formatterLen } from '@/utils/index';


const props = defineProps({
  // 输入框显隐
  modelValue: {
    type: Boolean,
    default: false
  },
  // 输入框最大字数限制
  max: {
    type: Number,
    default: 6
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 错误底部提示文案
  errorText: {
    type: String,
    default: ''
  },
  // 输入框默认值
  defaultInputValue: {
    type: String,
    default: ''
  },
    // 输入框值(双向受控，退出时会被清空)
  inputValue: {
    type: String,
    default: ''
  },
  // 内容文本
  contentText: {
    type: String,
    default: ''
  },
  // 取消文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消回调
  onClose: {
    type: Function,
  },
  // 取消结束回调
  onAfterClose: {
    type: Function,
  },
  // 确认回调
  onConfirm: {
    type: Function,
  },
  // 确认结束回调
  onAfterOk: {
    type: Function,
  },
  // 分享？
  needShare: {
    type: Boolean,
    default: false

  }


});


const emit = defineEmits(['update:modelValue','update:inputValue', 'ok']);


const slots = useSlots();

const popVisable = ref(props.modelValue);

const inputValue = ref('');
watch(()=>props.inputValue,
(val)=>{
  inputValue.value = val;
});

watch(()=>props.defaultInputValue,
(val)=>{
  inputValue.value = val;
});

watch(()=>inputValue.value,
(val)=>{
  emit('update:inputValue', val);
});



watch(toRef(props, 'modelValue'), (val) => {
  popVisable.value = val;
});

// 请注意input的失焦事件会在点击事件之后触发
const handleClose = (orgin:'overlay'|'button') => {  
  if (props.onClose) props.onClose(orgin);
  else {
    !!props.onAfterClose && props.onAfterClose(orgin);
    // 将input内容初始化
    if (!slots.content && !props.contentText) {
      inputValue.value = props.defaultInputValue;
    }
    emit('update:modelValue', false);
  }
};
const handleOk = () => {
  if (props.onConfirm) props.onConfirm(inputValue.value);
  else {
    !!props.onAfterOk && props.onAfterOk();
    emit('ok', inputValue.value);
    emit('update:modelValue', false);  }
};
</script>
