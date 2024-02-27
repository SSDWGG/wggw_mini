<template>
      <navbar title="无限滚动" background-color="#f5f5f9" />
      <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="开发者专区" />
      <scroll-view   :style="{height,width:'100%'}" :class="styles.container"
       class="pageIn"  scroll-y="true"
       @scrolltolower="loadMore">
      <mpm-steps-line v-for="(item, index) in data.behaviorList" :key="index">
        <template #content>
          <view class="itemBox">
            <view class="time">{{ item.time }}</view>
            <view class="content">
              <view v-for="(behavior,index) in item.behaviorList" :key="index" class="behavior">
                {{ `${item.name} ${behavior.behavior}` }}
              </view>
            </view>
          </view>
        </template>
      </mpm-steps-line>
      <view v-if="data.behaviorList.length <= 0" class="defaultBox">
        <view class="img">
          <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/default1.png"></image>
        </view>
        <view class="img tips">暂无行为记录</view>
      </view>
  </scroll-view>

</template>
<script lang="ts" setup>
import { reactive } from 'vue';
// @ts-ignore
import styles from './styles.scss';
import mpmStepsLine from '@/components/wggwStepsLine/index.vue';
import { Navbar } from "@fishui/taro-vue";
import { computed } from "vue";
const data = reactive({
  behaviorList: [
    {
      name: '集美',
      time: '三小时前',
      behaviorList: [
        {behavior:'增加了'},
        
      ]
    },
    {
      name: '集美',
      time: '2022.8.13 13:23:13',
      behaviorList: [
        {behavior:'增加了'},
        
        {behavior:'查询了'},
      ]
    },
    {
      name: '集美',
      time: '2022.8.14 13:23:13',
      behaviorList: [
        {behavior:'增加了'},
        {behavior:'删除了'},
        {behavior:'修改了'},
        {behavior:'查询了'},
      ]
    },
    {
      name: '集美',
      time: '2022.8.15 13:23:13',
      behaviorList: [
       
        {behavior:'查询了'},
      ]
    }
  ]
});

const height = computed(
  () =>
    `calc( 300px)`
);
const loadMore = () => {
  // getUserAlbumViewList
  console.log('行为列表加载...');
  data.behaviorList = [...data.behaviorList,...data.behaviorList]
};
loadMore();




defineExpose({
  loadMore
});

</script>
