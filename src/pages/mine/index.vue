<template>
  <view :class="styles.myContainer">
    <navbar title="我的信息" />
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <view class="head">
      <image :src="account.userInfo.avatarurl" @tap="handleChangeAvatarurl" />
    </view>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <view class="content">
          <NutInput v-model="account.userInfo.username" placeholder="请输入用户名" class="edit-NutInput" type="text"
            input-align="right" :border="false" :formatter="(str) => formatterLen(str, 30)" format-trigger="onChange" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>邮箱</text>
        </view>
        <view class="content">
          <NutInput v-model="account.userInfo.email" placeholder="请输入邮箱号" class="edit-NutInput" type="text"
            input-align="right" :border="false" :formatter="(str) => formatterLen(str, 30)" format-trigger="onChange" />
          <image class="phoneImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BMNLGHAP-1668669017857复制@2x.png"
            @tap="testEmail(account.userInfo.email)" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>手机号</text>
        </view>


        <checkSystemButton button-type="getPhoneNumber">
          <view class="content">
            {{ account.userInfo.phone }}
            <image class="phoneImg"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BMNLGHAP-1668669017857复制@2x.png"
              @tap="copyStr(account.userInfo.phone)" />
          </view>

        </checkSystemButton>

      </view>

    </view>


  </view>
</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { Navbar } from '@fishui/taro-vue';
import styles from './styles.scss';
import {
  WaterMark as NutWaterMark,
  Input as NutInput
} from '@nutui/nutui-taro';
import { copyStr } from '@/utils/index';
import selectMedia from '@/components/selectMedia';
import aliossUpload from '@/utils/alioss-upload';
import { sendCode } from '@/apis/mine';
import { formatterLen } from '@/utils/index';
import checkSystemButton from '@/components/button/checkSystemButton.vue';



definePageConfig({ backgroundColor: '#f3f3fe' });

const account = useAccountStore();

console.log(account.userInfo);
account.login()

const testEmail = (email: string) => {
  sendCode({
    email
  })
}


const handleChangeAvatarurl = async () => {

  const chooseList = await selectMedia('image', 1);
  const uploadResList: {
    status: number;
    name: string;
    path: string;
    fullpath: string;
    hash: string;
  }[] = await aliossUpload(chooseList[0].path);
  account.userInfo.avatarurl = uploadResList[0].fullpath
  account.updateUser()
}


</script>
