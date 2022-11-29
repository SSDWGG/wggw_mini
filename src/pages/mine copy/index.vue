<template>
  <view :class="styles.myContainer">
    <view class="bg">
      <navbar hideBack title="我的" backgroundColor="transparent" />
      <view class="bgTop">
        <!--  #endif -->
        <view class="topWrap">
          <view class="topInfo" >
            <view class="head">
              <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/KCILNFHP-1666325258875synchro.png"></image>
            </view>
            <view class="title">
              <view class="centerWrap">
                <text class="name"> nick </text>
                <text class="identity">管理员</text>
              </view>
              
            </view>
            <view class="code">
              <view>
                <text>管理</text>
                <image
                  src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png">
                </image>
              </view>
            </view>
          </view>
          
          <view class="rechargeInfo">
            <image src='https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/navBg.png'>
            </image>
            <view
              :class="{'textBox': true }">
              <view class="display">
              <view  class="font15">哈哈</view>
              <view class="font12">嘻嘻</view>
            </view>
                <view class="btn fw">
                  嘿嘿
                  <image
                    src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NLFCKFJE-1666324258493heiyou.png">
                  </image>
                </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="invite">
      <view class="topInfo">
        <view class="head">
          <image
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NNAELKCO-1666325258875redpack.png">
          </image>
        </view>
        <view class="title">
          <view class="centerWrap">
            <text class="name">邀请返现</text>
          </view>
          <view class="pTip">每邀请 <text>1人</text>使用，可返<text>0元</text></view>
        </view>
        <view class="code">
            <view class="btn">去邀请<image
                src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png">
              </image>
            </view>
        </view>
      </view>
    </view>
    <view class="contact" >
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
    <view class="signOut">退出登录</view>
  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { Navbar } from 'mini-ui';


definePageConfig({ backgroundColor: '#f3f3fe' });


</script>
