<template>
  <view :class="styles.commonMenu" :style="{ height }">
      <nut-animate type="breath" class="rule-button-div" loop v-for="(item, index) in props.listData" :key="index">
        <view class="menu-item" @tap="goto(item)" v-if="item.isShow !== false ">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="title">
            {{ item.Ctitle }}
          </view>
          <image class="bgImg"
          mode="aspectFill"
          :style="{ opacity: item.opacity??0.2 }"
            :src="item.bgSrc??imgDefaultSrc" />
        </view>
      </nut-animate>
  </view>
  <openOutLinkTipPop :pop-tip-visible="data.popTipVisible" :qrSrc="data.chooseItem.qrSrc" 
    :show-name="data.chooseItem.Ctitle" :href="data.chooseItem.linkUrl" @close="()=>{data.popTipVisible = false}"/>

</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import Taro from "@tarojs/taro";
import { IListDataItem } from "types/global";
import {  reactive } from "vue";
import openOutLinkTipPop from '@/components/pop/openOutLinkTipPop/index.vue';
import { isDeving } from "@/utils/index";


interface IProps {
  height?: string,
  listData:IListDataItem[]
}

const props = withDefaults(defineProps<IProps>(), {
  height: '',
  listData:()=>([] as IListDataItem[])
});

const imgDefaultSrc = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg'

const data = reactive({
  chooseItem: {} as IListDataItem,
  popTipVisible: false
});


const goto = (item) => {
  if (isDeving()) {
    // dev直接跳转
    Taro.navigateTo({ url: item.router });
  }
  else if (!!item.linkUrl) {
    // 提示网址
    data.chooseItem = item
    data.popTipVisible = true
  } else {
    Taro.navigateTo({ url: item.router });
  }
};


</script>
