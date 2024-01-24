<template>
  <view :class="styles.myContainer">
    <navbar title="我的信息"/>
    <nut-water-mark  :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1"
      content="WGGW" />
    <view class="head">
      <image :src="account.userInfo.avatarurl" @tap="handleChangeAvatarurl" />
    </view>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <view class="content">
          <!-- <NutInput  v-model="account.userInfo.username" placeholder="max len 10"
            class="edit-NutInput" type="text" input-align="right" :border="false"
            :formatter="(str) => formatterLen(str, 10)" format-trigger="onChange" /> -->
            {{ account.userInfo.username }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>Email</text>
        </view>
        <view class="content">
          验证邮箱
          <image class="phoneImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BMNLGHAP-1668669017857复制@2x.png"
            @tap="testEmail('1982549567@qq.com')" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>手机号</text>
        </view>
        <view class="content">
          {{ data.wggWX }}
          <image class="phoneImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BMNLGHAP-1668669017857复制@2x.png"
            @tap="copyStr(data.wggWX)" />
        </view>
      </view>

      <!-- <view class="infoItem">
        <view class="lable">openID :</view>
        <view class="content">{{ account.userInfo.openid }}</view>
      </view> -->




     

    </view>


  </view>
</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { Navbar } from '@fishui/taro-vue';
import styles from './styles.scss';
import {
  WaterMark as NutWaterMark
} from '@nutui/nutui-taro';
import { reactive } from 'vue';
import { useDidShow } from '@tarojs/taro';
import { copyStr } from '@/utils/index';
import selectMedia from '@/components/selectMedia';
import aliossUpload from '@/utils/alioss-upload';
import { sendCode } from '@/apis/mine';



definePageConfig({ backgroundColor: '#f3f3fe' });

const data = reactive({
  popover: false,
  wggWX: '13616549486',
})

const account = useAccountStore();



const  testEmail  =(email:string)=>{
  sendCode({
    email
  })
}

// 初始化页面数据
const initData = () => {
  console.log(11111);
  
}
initData()

useDidShow(() => {
  initData()
})



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
}


</script>
