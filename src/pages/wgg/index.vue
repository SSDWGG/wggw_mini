<template>
  <!-- 直接复制url，通过浏览器打开，给予提示 -->
  <view :class="styles.wgg">
    <view class="bg">
      <navbar background-color="transparent" />
      <view class="content">
        <view class="tips"> ❤️ Welcome to star SSDWGG on github ❤️</view>
        <view class="project">
          <view v-for="item in data.dataList" :key="item.href" class="a" @tap="showTipPop(item)">
            {{ item.showName }}</view>
        </view>
        <view class="tips">❤️ thanks for your attention ❤️</view>
        <person-card />
      </view>
    </view>
    <update-pop v-model:modelValue="data.popTipVisible" confirmText="复制链接" cancelText="关闭" :on-confirm='onConfirm'
      title="温馨提示">

      <template #contentBottom>
        <view class="template-content">
          <view class="tipText">
            因微信严格外部网站打开，现为您准备打开如下，您可以截屏扫码或者复制网址链接查看。也欢迎联系客服作者使用体验版小程序
          </view>
          <view class="imgDiv">
            <image :src="data.chooseItem.qrSrc" mode="aspectFit" class="img" :show-menu-by-longpress="true"></image>
          </view>
        </view>
      </template>

    </update-pop>
  </view>
</template>
<script lang="ts" setup>
import { copyStr } from '@/utils/index';
import styles from './styles.scss';
import PersonCard from './components/PersonCard/index.vue';
import { Navbar } from '@fishui/taro-vue';
import { reactive } from 'vue';
import UpdatePop from '@/components/pop/updatePop/index.vue';



const data = reactive({
  dataList: [
    {
      showName: 'GitHub(开源仓库)',
      href: 'https://github.com/SSDWGG',
      qrSrc: require('@/assets/images/qrCode/github.png')

    },
    {
      showName: 'wgg_project（个人项目简介pc、移动端）',
      href: 'http://wgg.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/wgg.png')

    },
    {
      showName: '弹弹坤（娱乐）',
      href: 'http://ikunqqq.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/ikunqqq.png')

    },
    {
      showName: '字符坤（娱乐）',
      href: 'http://ikunstr.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/ikunstr.png')

    },
    {
      showName: '消消乐旋转板（娱乐）',
      href: 'http://hextris.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/hextris.png')

    },
    {
      showName: '兔了个兔（娱乐）',
      href: 'http://xlgx.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/xlgx.png')
    },
    {
      showName: 'MP_V2（个人中后台管理系统pc）',
      href: 'http://todo.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/todo.png')
    },
    {
      showName: '云小叮微信小程序、wggw微信小程序',
      href: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/IFCAICKK-1683525307009WechatIMG25.png',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/IFCAICKK-1683525307009WechatIMG25.png'
    },
    {
      showName: '诗文卡片',
      href: 'http://poem.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/poem.png')
    },
    {
      showName: 'RabbitMall（商城项目pc）',
      href: 'http://mall.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/mall.png')
    },
    {
      showName: 'MGJ（练习项目pc）',
      href: 'http://mgj.ssdwgg.cn',
      qrSrc: require('@/assets/images/qrCode/mgj.png')

    },
    {
      showName: 'MRTK（流媒体视频）',
      href: 'https://ssdwgg.cn:8693',
      qrSrc: require('@/assets/images/qrCode/lmt.png')
    },
  ],
  popTipVisible: false,
  chooseItem: {
    showName: 'GitHub(开源仓库)',
    href: 'https://github.com/SSDWGG',
    qrSrc: require('@/assets/images/qrCode/github.png')
  },
});

const showTipPop = (item) => {
  data.chooseItem = item
  data.popTipVisible = true
}

const onConfirm = () => {
  copyStr(data.chooseItem.href, {
    icon: "none",
    title: `${data.chooseItem.showName} 网址链接复制成功`,
    duration: 2000,
  })
  data.popTipVisible = false
}

</script>