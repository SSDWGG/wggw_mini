<template>
  <view :class="styles.myContainer">
    <navbar title="我的信息"/>
    <nut-water-mark v-if="data.waterMarkFlag" :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1"
      :content="data.info.waterMark" />
    <view class="head">
      <image :src="data.info.avatarurl" @tap="handleChangeAvatarurl" />
    </view>
    <view class="info">
      <view class="infoItem">
        <view class="lable">用户名 :</view>
        <view class="content">
          <NutInput  v-model="data.info.username" placeholder="max len 10"
            class="edit-NutInput" type="text" input-align="right" :border="false"
            :formatter="(str) => formatterLen(str, 10)" format-trigger="onChange" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">openID :</view>
        <view class="content">{{ data.info.uuid }}</view>
      </view>
      <view class="infoItem">
        <view class="lable">notice :</view>
        <view class="content">
          <NutInput  v-model="data.info.NoticeBarText" placeholder="max len 30"
            class="edit-NutInput" type="text" input-align="right" :border="false" />
        </view>
      </view>

      <view class="infoItem">
        <view class="lable">
          水印内容
          <nut-popover v-model:visible="data.popover" theme="dark" custom-class="popoverDiv" :offset="[-5, 0]">
            <template #reference>
              <image class="popoverImg"
                src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LKMBHLFI-1668844736756tishi@2x.png" />
            </template>
            <template #content>
              <view class="popoverTextDiv">
                水印配置修改，重启后生效
              </view>
            </template>
          </nut-popover>
          :
        </view>
        <view class="content">
          <NutInput  v-model="data.info.waterMark" placeholder="max len 30"
            class="edit-NutInput" type="text" input-align="right" :border="false"
            :formatter="(str) => formatterLen(str, 20)" format-trigger="onChange" />
        </view>
      </view>
      <view class="infoItem">
        <view class="lable">
          <image class="contactImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLADJHEL-1666324258493contact.png">
          </image>
          <text>email</text>
        </view>
        <view class="content">
          test email
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
          <text>contact</text>
        </view>
        <view class="content">
          {{ data.wggWX }}
          <image class="phoneImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BMNLGHAP-1668669017857复制@2x.png"
            @tap="copyStr(data.wggWX)" />
        </view>
      </view>

    </view>


  </view>
</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { Navbar } from '@fishui/taro-vue';
import styles from './styles.scss';
import {
  WaterMark as NutWaterMark, Input as NutInput,
  Popover as NutPopover
} from '@nutui/nutui-taro';
import { reactive } from 'vue';
import { formatterLen } from '@/utils/index';
import { useDidShow } from '@tarojs/taro';
import { copyStr } from '@/utils/index';
import selectMedia from '@/components/selectMedia';
import aliossUpload from '@/utils/alioss-upload';
import { sendCode } from '@/apis/mine';



definePageConfig({ backgroundColor: '#f3f3fe' });

const data = reactive({
  waterMarkFlag: true,
  popover: false,
  wggWX: '13616549486',
  info: {
    avatarurl: '',
    username: '',
    uuid: '',
    waterMark: '',
    NoticeBarText: ''
  }
})

const account = useAccountStore();



const  testEmail  =(email:string)=>{
  sendCode({
    email
  })
}

// 初始化页面数据
const initData = () => {
  for (let key in data.info) {
    data.info[key] = account[key]
  }
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
  data.info.avatarurl = uploadResList[0].fullpath
}

// const previewImage = () => {
//   Taro.previewImage({
//     urls: [data.info.avatarurl] // 需要预览的图片http链接列表
//   })
// }



</script>
