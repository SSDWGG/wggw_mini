<template>
  <view :class="styles.myContainer">
       <navbar hideBack title="我的" backgroundColor="transparent" />
    <view class="invite">
      <view class="topInfo">
        <view class="head">
          <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NNAELKCO-1666325258875redpack.png"></image>
        </view>
        <view class="title">
          <view class="centerWrap">
            <text class="name">邀请返现</text>
          </view>
          <view class="pTip">邀请 <text>1人</text>使用，最高返<text>90元</text></view>
        </view>
        <view class="code">
          <view @tap="onGoInvite">
            <view class="btn">去邀请<image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png"></image></view>
          </view>
        </view>
      </view>
    </view>
  
  </view>

</template>
<script lang="ts" setup>
import { Navbar } from 'mini-ui';
import styles from './styles.scss';

definePageConfig({ backgroundColor: '#f3f3fe' });

// 去邀请会员
const onGoInvite = () => {
  console.log(1111);
  
};
</script>
