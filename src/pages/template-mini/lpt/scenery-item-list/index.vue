<template>
  <view :class="styles.myContainer">
    <navbar title="景点列表" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="景点列表" />
      <view class="list" >
        <nut-cell v-for="(item, index) in data.sceneryList" :key=index class="sceneryItem" @tap="toSceneryDetail(item.id)">
          <image :src="imgHostLpt + '/' + item.pic" mode="aspectFill" />
          <view class="title">
            {{ item.name }}
          </view>

        </nut-cell>
      </view>
    </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />

</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { getSceneryItemPage } from '@/apis/lpt/shop';
import { imgHostLpt } from '@/utils/env';
import Taro from '@tarojs/taro';

const myToast = ref<any>();

const data = reactive({
  sceneryList: [] as any
});


const toSceneryDetail = (id)=>{
  Taro.navigateTo({ url: `/pages/template-mini/lpt/scenery-item-detail/index?id=${id}` });
};

const getSceneryList = async () => {
  const res = await getSceneryItemPage({
    current: 1,
    size: 100
  });
  data.sceneryList = res.records;
};
getSceneryList();

</script>
