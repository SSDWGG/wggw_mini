<template>
  <view v-if="pageData.pageShow" :class="styles.lockComponents">
    <fullPreview back :title="pageData.canInput?'请输入密码':'尝试次数已达上限'" >
      <template v-if="pageData.canInput" #normalSlot>
        <view class="pagePasswordInputContent">
          <nut-input v-model="pageData.inputValue" placeholder="输入密码" class="input" @blur="testPassword" />
        </view>
      </template>
    </fullPreview>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </view>
  <slot v-else name="contentSlot"/>
</template>
<script lang="ts" setup>
import fullPreview from '@/components/fullPreview/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
interface Props {
  passwordObj: any;
  }

const props = withDefaults(defineProps<Props>(), {
  passwordObj: {},
  });

  // cbInputBack :1 成功 2失败 3失败上限
const emit = defineEmits(['cbInputBack']);

const pageData = reactive({
  testIndex: 0,
  maxTestNum: 5,
  inputValue: '',
  // 白名单
  keyWordTxt: {
    '001023': 'JL',
    '000527': 'WGG',
  },
  canInput:true,
  pageShow: true,
});
const myToast = ref<any>();

const testPassword = () => {
  if (pageData.testIndex >= pageData.maxTestNum) {
    pageData.canInput = false;
    myToast.value.myToastShow({
      icon: 'error',
      title: '输入错误已达上限!',
      duration: 2500,
    });
    emit('cbInputBack', 3);
  } else {
    if (props.passwordObj[pageData.inputValue]) {
      myToast.value.myToastShow({
        icon: 'success',
        title: `欢迎你,${props.passwordObj[pageData.inputValue]}`,
        duration: 1500,
      });
      pageData.inputValue = '';
      emit('cbInputBack', 1);
      setTimeout(() => {
        pageData.pageShow = false;
      }, 1500);
    } else {
      myToast.value.myToastShow({
        icon: 'error',
        title: `输入错误,还剩${pageData.maxTestNum - pageData.testIndex - 1}次机会`,
        duration: 1500,
      });
      pageData.inputValue = '';
    }
    pageData.testIndex++;
    emit('cbInputBack', 2);
  }
};

defineExpose({
  // 控制锁是否显示
  pageData
});
</script>
