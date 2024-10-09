<template>
  <view :class="{ [styles.fullPreview]: true, [styles.dispoint]: !props.back ,myfp:true }" @tap="handleClickPage">
    <view class="title">{{ props.title }}</view>
    <view class="logo">
      <image v-if="props.imgSrc" class="bgImg" :src="props.imgSrc" />
    </view>
    <!-- <view class="hypnotic-5"></view>
    <slot name="normalSlot"/> -->
  </view>

</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
interface Props {
  // 点击去菜单栏
  back: boolean;
  imgSrc: string;
  title: string;
  svgaUrl: string;
  svgaLoop: number;
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  title: '业主投票系统',
  svgaUrl: '',
  svgaLoop: 1,
  imgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CGHMKNBP-1669687856120rabbit.jpg',
});
const emit = defineEmits(['back', 'finsh']);

const handleClickPage = () => {
  !!props.back && emit('back');

};
</script>
