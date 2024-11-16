<template>
  <view :class="styles.invite">
    <Navbar v-show="!data.overlayShow" title="邀请返现活动" />
    <view v-show="!data.overlayShow" class="container">
      <view class="sideTip" @tap="data.explanationShow = true">
        <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LLLHAGEI-1670204297091w.png" class="sideTipImg" />
        <view class="sideTipText"> 活动规则 </view>
      </view>

      <view
        class="sideTip2"
        @tap="
          () => {
            Taro.navigateTo({ url: `/pages/technical/invite/more-invite/index` });
          }
        "
      >
        <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LLLHAGEI-1670204297091w.png" class="sideTipImg" />
        <view class="sideTipText"> 店铺海报 </view>
      </view>

      <nut-popup
        v-model:visible="data.explanationShow"
        position="bottom"
        round
        close-on-click-overlay
        pop-class="explanationPop"
        @click-overlay="handleCloseExplanationPop"
      >
        <view class="explanation">
          <view class="head">
            <view class="headText"> 活动规则 </view>
            <view class="close" @tap="handleCloseExplanationPop"> + </view>
          </view>

          <view class="content">
            <view class="title">活动介绍</view>
            <view class="paragraph">
              1. 用户通过云小叮小程序进入「邀请返现」活动 页面，以邀请分享海报的方式分享给好友， 邀请成功后，邀请者将获得根据本规则获得相应现金奖励； 2.
              邀请者通过邀请分享海报扫码进入小程序，注册并完成一笔会员购买，且无退款，视为邀请成功（被邀请者会员购买成功时间判定），
              邀请者可有机会获得现金奖励。
            </view>
            <view class="title">奖励发放</view>
            <view class="paragraph">
              1.
              邀请者成功邀请好友获得的现金奖励将于7个工作日内自动存入邀请者的“可提现金额”，邀请者可通过“邀请返现-我的邀请记录”中查看。如发放延迟，请联系云小叮客服。若邀请用户不符合活动规则，邀请者将无法得到相应的现金奖励。
              <view />
              2.
              邀请者每成功邀请一名云小叮用户，可获得80%的现金奖励，多邀多得；邀请者邀请的新云小叮用户，若他成功邀请其他云小叮用户，邀请者也可获得一定比例的现金奖励，形成分佣等级；
              <view />
              3.
              第一级分佣用户，为非被邀请者；第二级分佣用户，为被邀请者；第三级用户，为被第二级分佣用户邀请进入的用户；第三级用户注册购买会员，则第二级分佣用户领取50%的佣金，第一级分佣用户领取30%的佣金；
              在法律法规许可的范围内，根据开展情况，现金奖励存在不定期调整可能，如有调整会在本规则提前公示。
              <view />
              4. 现金奖励可提现到微信钱包，可在「可提现金额」中查看通过邀请返佣获得的现金奖励的具体金额。
            </view>
            <view class="title">活动其他说明</view>
            <view class="paragraph">
              1. 云小叮新用户是指设备号、手机号均为在云小叮上注册授权过手机号的用户。 2.
              如发现用户存在任何违规套取现金奖励的行为，包括且不限于虚假交易、批量注册、用机器注册账户、机器模拟客户端、提供虚假信息等方式参与邀请返现，云小叮将视情节严重程度按照相关规则进行处罚。
              包括但不限于不予发放奖励，封停邀请返现功能，依法追究其法律责任等。
            </view>
          </view>
        </view>
      </nut-popup>
      <view class="invite-bg-header">
        <image
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IKHOHFCF-1670205616188x.png"
          mode="widthFix"
          class="header-bg"
        />
        <my-swiper class="header-swiper" />
        <view class="header-rule-view">
          <image
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JDCGLDEH-1670406817498f.png"
            class="rule-img"
            mode="widthFix"
          />
          <nut-animate type="breath" class="rule-button-div" loop @tap="handleInvite">
            <nut-button block type="primary" class="rule-button">立即邀请好友</nut-button>
          </nut-animate>
        </view>
      </view>
      <view class="invite-bg-bottom">
        <view class="bottom-invite-view">
          <view class="invite-content">
            <image
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/myRecord.png"
              class="invite-header"
              mode="widthFix"
            />
            <image
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/invite-record-headerBG.png"
              class="invite-recordBG"
              mode="widthFix"
            />
            <view v-for="(item, index) in data.inviteList" :key="index" class="invite-item">
              <image class="avater" :src="item.invitedUserAvatarUrl"></image>
              <view class="invite-info">
                <view class="who"> {{ `${changeLongStr(item.invitedUserNick, 6)}购买了 ${item.goodsName}会员` }}</view>
                <view class="secondRow">
                  <view class="time">时间：{{ item.inviteSuccessTime }}</view>
                  <view class="origin">邀请人：{{ item.userNick }}</view>
                </view>
              </view>
              <view class="invite-info-num">{{ item.centAmount ? `+${item.centAmount / 100}` : '' }}</view>
            </view>
            <view v-if="data.inviteList.length === 0" class="nodata">
              <image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/nodata.png" class="nodata-img"></image>
              <view class="nodata-tip"> 暂无邀请记录，快去邀请好友吧~ </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <invite-overlay v-if="data.overlayShow" :overlayShow="data.overlayShow" :imgPath="data.imgPath" @close="data.overlayShow = false" />
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import mySwiper from './invite-swiper/index.vue';
import inviteOverlay from './invite-overlay/index.vue';
import { reactive } from 'vue';
import { changeLongStr } from '@/utils/index';
import Taro from '@tarojs/taro';

const data = reactive({
  inviteList: [] as any[],
  overlayShow: false,
  explanationShow: false,
  statusMap: {
    1: '试用中',
    2: '试用到期未购买正式会员',
    3: '购买证正式会员',
  },
  imgPath: '',
});

const getInviteList = () => {
  data.inviteList = [
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
    {
      invitedUserAvatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
      invitedUserNick: 'tomasi',
      goodsName: '云小叮正式版',
      inviteSuccessTime: '2024-10-25',
      userNick: '玮**',
      centAmount: 1200,
    },
  ];
};
getInviteList();

const handleInvite = () => {
  data.overlayShow = true;
};

const handleCloseExplanationPop = () => {
  data.explanationShow = false;
};
</script>
