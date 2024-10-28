<template>
      <scroll-view   :style="{height:'300px',width:'100%'}" :class="styles.container"
       class="pageIn"  scroll-y="true"
      >
      <mpm-steps-line v-for="(item, index) in props.dataList" :key="index">
        <template #content>
          <view class="itemBox">
            <view class="time">第{{ item.setNum + 1 }}轮</view>
            <view class="content">
              <view v-for="(behavior,index) in item.arr" :key="index" class="behavior">
                {{ `${behavior.name} 得分 ${behavior.count}` }}
              </view>
            </view>
          </view>
        </template>
      </mpm-steps-line>
      <!-- <view v-if="props.dataList.length <= 0" class="defaultBox">
        <view class="img">
          <image src="@/assets/images/project/emptyDefault.png"></image>
        </view>
        <view class="img tips">暂无记录数据</view>
      </view> -->
  </scroll-view>

</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import mpmStepsLine from '@/components/wggwStepsLine/index.vue';

interface IProps {
    dataList: Array;
  }

  const props = withDefaults(defineProps<IProps>(), {
    dataList: [],
  });




</script>
