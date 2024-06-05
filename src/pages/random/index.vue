<template>
  <navbar title="纠结终结者" background-color="transparent" />
  <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="迷茫的不是选项，而是你的内心对吗？" />

  <view :class="styles.editor">
    <view v-if="data.isPrepare" class="prepare">
      <view class="title">很高兴您能发现这个好工具！</view>
      <view class="intro">现在需要在下方输入您的纠结内容</view>
      <view class="intro">这一步骤将会很快~</view>

      <view class="prepareInputContent">
        <view class="item">
          <view class="name"> 名称 </view>
          <view class="gl"> 概率 </view>
        </view>
        <nut-swipe v-for="(item,index) in data.mainData" :key="item.id" class="item">
          <nut-input v-model="item.name" placeholder="Placeholder" class="left" />
          <nut-input-number v-model="item.value" class="right" />
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger" @tap="data.mainData.splice(index,1)">删除行</nut-button>
          </template>
        </nut-swipe>

        <nut-animate type="breath" class="rule-button-div" loop >
          <nut-button block type="primary" class="rule-button" @tap="addOne">添加一行（add）</nut-button>
          <nut-button block type="primary" class="rule-button"  @tap="addOk">输入完成（ok）</nut-button>
        </nut-animate>
      </view>
    </view>
    <view v-else class="menu" >
      <myChart :mainData="data.mainData" />
      <myLucky :mainData="data.mainData" />
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import {  reactive } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import myChart from './echart/index.vue';
import myLucky from './lucky/index.vue';
import { uuid } from '@/utils/index';
import Taro from '@tarojs/taro';

const data = reactive({
  isPrepare: true,
  mainData: [{ value: 1, name: '', id: uuid() }],
});

const addOne = () => {
  data.mainData.push({ value: 1, name: '', id: uuid() });
};
const addOk = () => {
    data.isPrepare = false;
    Taro.setStorageSync('wggw-random-tableData', data.mainData);
};

const initPage = () => {
  const lsTbleData = Taro.getStorageSync('wggw-random-tableData');
  // 存在且非空
  if (!!lsTbleData && lsTbleData.length > 0) {
    Taro.showModal({
      content: '是否读取上次记录？',
      cancelColor: '#999999',
      confirmColor: '#7468F2 ',
      confirmText: '读取',
      success:  (res) => {
        if (res.confirm) {
          data.mainData = lsTbleData;
          addOk();
        }
      },
    });
  }
};
initPage();

</script>
