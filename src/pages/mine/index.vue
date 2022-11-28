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
                <text class="name"> 这是nick </text>
                <text class="identity"> "管理员"</text>
              </view>
              <view class="button-to-view">
                <view class="pTip">
                  <image
                    src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/KCILNFHP-1666325258875synchro.png" />
                  修改微信头像昵称
                </view>
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
          <view class="moneyInfo">
            <view class="moneyBox">
              <view class="money2">99</view>
              <check-login-button >
                <view class="moneyTip">我的访客<image
                    src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png">
                  </image>
                </view>
              </check-login-button>
            </view>
            <view class="moneyBox">
              <view class="money2">99</view>
              <check-login-button >
                <view class="moneyTip">
                  可提现金额(元)
                  <image
                    src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png" />
                </view>
              </check-login-button>
            </view>
          </view>
          <view class="rechargeInfo">
            <image src='https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/navBg.png'>
            </image>
            <view
              :class="{ 'blackFont': true, 'textBox': true }">
              <view class="display">
               
                <view class="font15">123</view>
                <view class="font12">123</view>
              </view>
              <check-login-button style="margin-top:14rpx;" >
                <view class="btn fw">
                 123
                  <image
                    src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NLFCKFJE-1666324258493heiyou.png">
                  </image>
                </view>
              </check-login-button>
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
          <view class="pTip">邀请 <text>1人</text>使用，最高返<text>90元</text></view>
        </view>
        <view class="code">
          <check-login-button >
            <view class="btn">去邀请<image
                src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLINDNIN-1666324258492baiyou.png">
              </image>
            </view>
          </check-login-button>
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
