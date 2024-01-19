
<template>
  <view :class="styles.openOutLinkTipPop">
    <update-pop v-model:modelValue="props.popTipVisible" confirmText="复制链接" cancelText="关闭" :on-close="onclose"  :on-confirm='onConfirm'
      title="温馨提示">

      <template #contentBottom>
        <view class="template-content">
          <view class="tipText">
            因微信严格限制外部网站打开，现为您准备打开方式如下，1:截屏扫码 2:复制网址链接查看 3:联系客服作者使用体验版小程序
          </view>
          <view class="imgDiv">
            <image :src="props.qrSrc" mode="aspectFit" class="img" :show-menu-by-longpress="true"></image>
          </view>
        </view>
      </template>

    </update-pop>
  </view>
</template>


<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import { copyStr } from '@/utils/index';

interface Props {
  popTipVisible: boolean
  qrSrc:string
  href:string
  showName:string
  
}

const props = withDefaults(defineProps<Props>(), {
  popTipVisible: false,
  qrSrc:'',
  href:'',
  showName:'',
 });
const emit = defineEmits(['close']);

const onConfirm = () => {
  copyStr(props.href, {
    icon: "none",
    title: `${props.showName} 网址链接复制成功`,
    duration: 2000,
  })
  emit('close')
}
const onclose = ()=>{
  emit('close')
}
</script>
