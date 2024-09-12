<template>
  <view :class="styles.signContainer">

    <fullPreview back title="请输入密码">
      <template #normalSlot>
        <view class="pagePasswordInputContent">
          <nut-input v-model="pageData.inputValue" placeholder="输入密码" class="input" @blur="testPassword" />
        </view>
      </template>
    </fullPreview>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </view>
</template>
<script lang="ts" setup>
import fullPreview from '@/components/fullPreview/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive,ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';

// cbInput :1 成功 2失败 3失败上限
const emit = defineEmits(['cbInput']);

const pageData = reactive({
  testIndex:0,
  maxTestNum:5,
  inputValue:'',
  // 白名单
  keyWordTxt:{
    '001023':'可爱多',
    '000527':'玮哥哥',
  }
});
const myToast = ref<any>();

const testPassword = ()=>{
  if(pageData.testIndex>=pageData.maxTestNum){
    myToast.value.myToastShow({
          icon: 'error',
          title: '输入错误已达上限!',
          duration: 2500,
        });
        emit('cbInput',3);
  }else{
    if(pageData.keyWordTxt[pageData.inputValue]){
      myToast.value.myToastShow({
          icon: 'success',
          title: `欢迎你,${pageData.keyWordTxt[pageData.inputValue]}`,
          duration: 2000,
        });
        pageData.inputValue='';
        emit('cbInput',1);

    }else{
      myToast.value.myToastShow({
          icon: 'error',
          title: `输入错误,还剩${pageData.maxTestNum-pageData.testIndex-1}次机会`,
          duration: 2000,
        });
        pageData.inputValue='';
    }
    pageData.testIndex++;
    emit('cbInput',2);

  }
};



</script>
