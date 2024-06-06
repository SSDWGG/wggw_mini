<template>
  <navbar title="纠结终结者" background-color="transparent" />
  <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="迷茫的不是选项，而是你的内心对吗？" />

  <view :class="styles.editor">
    <view v-if="data.isPrepare===0" class="prepare">
      <view class="title">很高兴您能发现这个好工具！</view>
      <view class="intro">现在需要在下方输入您的纠结内容</view>
      <view class="intro">这一步骤将会很快~</view>

      <view class="tagsList">
        <view class="tip">快捷常用选项</view>

        <!-- 系统固定项 -->
        <nut-tag
          v-for="(tagsValue, tagsName, tagsIndex) in data.systemMainDataObj"
          :key="tagsIndex"
          :color="data.tagsStyleList[tagsIndex % data.tagsStyleList.length].bgColor"
          :textColor="data.tagsStyleList[tagsIndex % data.tagsStyleList.length].textColor"
          class="randomTags"
          round
          @tap="showTagDetail(tagsValue)"
        >
          <IconFont
            name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GHCCAMGL-1706332459221icon-close.png"
            :size="22"
            class="close-img"
            @tap.stop="deleteTag(tagsName, data.systemMainDataObj, false)"
          ></IconFont>
          {{ tagsName }}</nut-tag
        >
        <!-- 用户历史输入项 -->
        <nut-tag
          v-for="(tagsValue, tagsName, tagsIndex) in data.userMainDataObj"
          :key="tagsIndex"
          :color="data.tagsStyleList[tagsIndex % data.tagsStyleList.length].bgColor"
          :textColor="data.tagsStyleList[tagsIndex % data.tagsStyleList.length].textColor"
          class="randomTags"
          round
          @tap="showTagDetail(tagsValue)"
        >
          <IconFont
            name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GHCCAMGL-1706332459221icon-close.png"
            :size="22"
            class="close-img"
            @tap.stop="deleteTag(tagsName, data.userMainDataObj, true)"
          ></IconFont>
          {{ tagsName }}</nut-tag
        >
      </view>
      <view class="prepareInputContent">
        <view class="tip">主选项</view>
        <view class="item">
          <view class="name"> 选项名称 </view>
          <view class="gl"> 相对概率 </view>
        </view>
        <nut-swipe v-for="(item, index) in data.mainData" :key="item.id" class="item" @tap="data.childMainData = item.childList ?? []">
          <nut-input v-model="item.name" placeholder="Placeholder" class="left" />
          <nut-input-number v-model="item.value" class="right" />
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger" @tap="data.mainData.splice(index, 1)">删除行</nut-button>
          </template>
        </nut-swipe>

        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="addOne(data.mainData)">添加一行（add）</nut-button>
          <nut-button block type="primary" class="rule-button" @tap="addOk">输入完成（ok）</nut-button>
        </nut-animate>
      </view>

      <view class="prepareInputContent">
        <view class="tip">子选项（选填）</view>

        <view class="item">
          <view class="name"> 选项名称 </view>
          <view class="gl"> 相对概率 </view>
        </view>
        <nut-swipe v-for="(item, index) in data.childMainData" :key="item.id" class="item">
          <nut-input v-model="item.name" placeholder="Placeholder" class="left" />
          <nut-input-number v-model="item.value" class="right" />
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger" @tap="data.childMainData.splice(index, 1)">删除行</nut-button>
          </template>
        </nut-swipe>

        <nut-animate type="breath" class="rule-button-div" loop>
          <nut-button block type="primary" class="rule-button" @tap="addOne(data.childMainData)">添加一行（add）</nut-button>
        </nut-animate>
      </view>
    </view>
    <view v-else-if="data.isPrepare===1" class="menu">
      <myChart :mainData="data.mainData" />
      <view class="result">{{ data.result }}</view>
      <myLucky  :mainData="data.mainData" :cb="cbLucky" />
    </view>
    <view v-else-if="data.isPrepare===2" class="menu">
      <myChart :mainData="data.mainData" />
      <view class="result">{{ data.result }}</view>
      <myLucky  :mainData="data.mainData" :cb="cbLuckyChild" />
    </view>
  </view>
  <side-bar :showFlags="[1,3]" />

</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { reactive } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import myChart from './echart/index.vue';
import myLucky from './lucky/index.vue';
import { uuid } from '@/utils/index';
import Taro from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import sideBar from '@/components/SideBar/index.vue';
import { useShareAppMessage } from '@tarojs/taro';

useShareAppMessage(() => ({
    title: '用它来终结你的选择困难症吧~',
    path: '/pages/random/index',
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  }));

const account = useAccountStore();

const data = reactive({
  isPrepare: 0,
  step:0,
  mainData: [{ value: 1, name: '', id: uuid(), childList: [] }],
  childMainData: [{ value: 1, name: '', id: uuid(), childList: [] }],
  userMainDataObj: {},
  result:'',
  systemMainDataObj: {},
  tagsStyleList: [
    {
      textColor: '#FFAE00',
      bgColor: '#FFF4E5',
    },
    {
      textColor: '#8074FE',
      bgColor: '#F1EFFD',
    },
    {
      textColor: '#F56A6A',
      bgColor: '#FEEBEC',
    },
    {
      textColor: '#666666',
      bgColor: '#FEFEFE',
    },
  ],
});

const addOne = (arr) => {
  arr.push({ value: 1, name: '', id: uuid(), childList: [] });
};
const addOk = () => {  
  // 处理主数据和子数据
data.mainData = data.mainData
    .filter(item => item.name !== '')  // 过滤掉主数据中name为空的项
    .map((item:any) => {
        item.value = Number(item.value);
        item.childList = item.childList
            .filter((child:any) => child.name !== '')  // 过滤掉子数据中name为空的项
            .map((child:any) => {
                child.value = Number(child.value);
                return child;
            });
        return item;
    });
  data.isPrepare++;
  const objName = {};
  objName[`历史内容${Object.keys(data.userMainDataObj).length + 1}`] = data.mainData;
  data.userMainDataObj = { ...data.userMainDataObj, ...objName };
  Taro.setStorageSync('wggw-random-list', data.userMainDataObj);
  // Taro.setStorageSync('wggw-random-before', data.mainData);
};

const showTagDetail = (tagsValue) => {
  data.mainData = tagsValue;
  data.childMainData = data.mainData[0].childList ?? [];
};
const deleteTag = (name, obj, isUserTag) => {
  delete obj[name];

  if (isUserTag) {
    Taro.setStorageSync('wggw-random-list', data.userMainDataObj);
  }
};

const initPage = () => {
  // 读取用户历史选择
  data.userMainDataObj = Taro.getStorageSync('wggw-random-list');

 data.systemMainDataObj = account.randomSystemData;
  // 询问是否继续上次选择
  // const beforeData = Taro.getStorageSync('wggw-random-before');
  // if (!!beforeData && beforeData.length > 0) {
  //   Taro.showModal({
  //     content: '是否读取上次记录？',
  //     cancelColor: '#999999',
  //     confirmColor: '#7468F2 ',
  //     confirmText: '读取',
  //     cancelText: '取消',
  //     success: (res) => {
  //       // 读取记录
  //       if (res.confirm) {
  //         data.mainData = beforeData;
  //       }
  //       // 删除记录
  //       if (res.cancel) {
  //         Taro.removeStorage({
  //           key: 'wggw-random-before',
  //         });
  //       }
  //     },
  //   });
  // }
};
initPage();

const cbLucky = (par,go)=>{
  if(go){    
  data.mainData = par.childList;
  data.result = par.name;
  data.isPrepare++;
  }

};

const cbLuckyChild = (par)=>{
  data.result = `${data.result }-${ par.name}`;  
};
</script>
