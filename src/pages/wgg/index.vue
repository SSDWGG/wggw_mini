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
    <openOutLinkTipPop :pop-tip-visible="data.popTipVisible" :qrSrc="data.chooseItem.qrSrc" 
    :show-name="data.chooseItem.showName" :href="data.chooseItem.href" @close="()=>{data.popTipVisible = false}"/>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import PersonCard from './components/PersonCard/index.vue';
import { Navbar } from '@fishui/taro-vue';
import { reactive } from 'vue';
import openOutLinkTipPop from '@/components/pop/openOutLinkTipPop/index.vue';



const data = reactive({
  dataList: [
    {
      showName: 'GitHub(开源仓库)',
      href: 'https://github.com/SSDWGG',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OEAHMDAL-1706331258037github.png'

    },
    {
      showName: 'wgg_project（个人项目简介pc、移动端）',
      href: 'http://wgg.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/DBKHBFBE-1706331330465wgg.png'

    },
    {
      showName: '弹弹坤（娱乐）',
      href: 'http://ikunqqq.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FJHBFEAA-1706331358049ikunqqq.png'

    },
    {
      showName: '字符坤（娱乐）',
      href: 'http://ikunstr.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GIKJIPEA-1706331381805ikunstr.png'

    },
    {
      showName: '消消乐旋转版（娱乐）',
      href: 'http://hextris.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IMDCHDJP-1706331384525hextris.png'

    },
    {
      showName: '兔了个兔（娱乐）',
      href: 'http://xlgx.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/MOCAPJJK-1706331446705xlgx.png'
    },
    {
      showName: 'MP_V2（个人中后台管理系统pc）',
      href: 'http://todo.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/FCAAEBLP-1706331461355todo.png'
    },
    {
      showName: '云小叮微信小程序、wggw微信小程序',
      href: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IFCAICKK-1683525307009WechatIMG25.png',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IFCAICKK-1683525307009WechatIMG25.png'
    },
    {
      showName: '诗文卡片',
      href: 'http://poem.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/MPMMHFKJ-1706331478715poem.png'
    },
    {
      showName: 'RabbitMall（商城项目pc）',
      href: 'http://mall.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NBDGFNGN-1706331492335mall.png'
    },
    {
      showName: 'MGJ（练习项目pc）',
      href: 'http://mgj.ssdwgg.cn',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NMICMNJA-1706331504105mgj.png'

    },
    {
      showName: 'MRTK（流媒体视频）',
      href: 'https://ssdwgg.cn:8693',
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/ENBMHPOG-1706331514250lmt.png'
    },
  ],
  popTipVisible: false,
  chooseItem: {
    showName: 'GitHub(开源仓库)',
    href: 'https://github.com/SSDWGG',
    qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OEAHMDAL-1706331258037github.png'
  },
});

const showTipPop = (item) => {
  data.chooseItem = item
  data.popTipVisible = true
}

</script>