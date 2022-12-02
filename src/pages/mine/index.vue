<template>
  <view :class="styles.myContainer">
    <navbar hideBack title="Mine" backgroundColor="transparent" />

    <nut-water-mark v-if="data.waterMarkFlag" :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1"
      :content="data.info.waterMark" />

    <view class="head">
      <image :src="data.info.avatarurl"></image>
    </view>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <view class="content">
          <NutInput v-model="data.info.username" placeholder="max len 10" class="edit-NutInput" type="text"
              input-align="right" :border="false" :formatter="(str) => formatterLen(str, 10)"
              format-trigger="onChange" /></view>
      </view>
      <view class="infoItem">
        <view class="lable">uuid :</view>
        <view class="content">{{ data.info.uuid }}</view>
      </view>
      <!-- <view class="infoItem">
            <view class="lable">notice :</view>
            <view class="content">{{data.info.NoticeBarText}}</view>
        </view> -->
      <view class="infoItem">
        <view class="lable">水印内容 :</view>
        <view class="content"><NutInput v-model="data.info.waterMark" placeholder="max len 30" class="edit-NutInput" type="text"
              input-align="right" :border="false" :formatter="(str) => formatterLen(str, 30)"
              format-trigger="onChange" /></view>
      </view>
    </view>

    <view class="contact">
        <view class="left">
          <image
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>联系客服</text>
        </view>
        <view class="right">
          <image
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png">
          </image>
        </view>
      </view>
  </view>

</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { Navbar } from 'mini-ui';
import styles from './styles.scss';
import { WaterMark as NutWaterMark , Input as NutInput } from '@nutui/nutui-taro';
import { reactive } from 'vue';
import {  formatterLen } from '@/utils/index';



definePageConfig({ backgroundColor: '#f3f3fe' });

const data = reactive({
  waterMarkFlag: true,
  info:{
    avatarurl:'',
    username:'',
    uuid:'',
    waterMark:''
  }
})

const account = useAccountStore();

// 初始化页面数据
for(let key in data.info){  
 data.info[key]  = account[key]
}


</script>
