<template>
  <navbar title="订单列表" background-color="transparent"  />
  <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="订单列表" />

  <view :class="styles.container">
    <nut-tabs v-model="pageData.tabValue" type="smile">
      <nut-tab-pane v-for="item in pageData.tabItemList" :key="item.key" :title="item.title" :pane-key="item.key">
        <view class="orderList">
          <nut-cell v-for="item in pageData.orderList" :key="item.orderNumber" class="orderItem">
            <view class="firstLine">
              <view class="orderNumber">订单编号：{{ item.orderNumber }}</view>
              <view class="status">状态：
                <text v-if="item.status!==2" :style="{ color: item.status === 1 ? 'red' : 'gray' }"> {{ pageData.statusMap[item.status]}}</text>
                <text v-else :style="{ color: item.verificationStatus === 0 ? 'gray' : 'red' }"> {{ pageData.verificationStatusMap[item.verificationStatus]}}</text>
              </view>
            </view>
            <view v-if="item.status===2" class="secondLine">
             {{ item.picStats }}
            </view>
            <view v-if="item.status===2&&item.verificationStatus !== 0" class="threeLine">
              订单被核销时间： {{ item.verificationTime }}
            </view>

            <view v-for="(skuList, index) in item.orderItemDtos" :key="index" class="skuDetail">
              <view class="skuImg">
                <image :src="skuList.pic" alt="img" />
              </view>
              <view class="skuInfo">
                <view class="line1">
                  {{ skuList.prodName }}
                </view>
                <view class="line2">
                  {{ skuList.skuName }}
                </view>
                <view v-if="item.transactionId !== '999'" class="line3">
                  <nut-price :price="skuList.price" size="normal" />
                  <view class="">
                    下单数量：{{ skuList.prodCount }}
                  </view>
                </view>
              </view>
            </view>
            <nut-divider />
            <!-- 操作按钮区 -->
            <view class="btns">
              <nut-button v-if="item.status === 1" size="mini" plain type="primary" class="btn btnOne"
                @click="handleCancelOrder(item.orderNumber)">取消订单</nut-button>
              <nut-button v-if="item.status === 1" size="mini" plain type="primary" class="btn"
                @click="pay(item.orderNumber)">付款</nut-button>
              <nut-button v-if="item.status === 2 && item.verificationStatus !== 2" size="mini" plain type="primary" class="btn"
                @click="handleToUse(item)">核销使用</nut-button>
              <nut-button v-if="item.status === 2 && item.verificationStatus === 0 && item.transactionId !== '999'" size="mini"
                plain type="primary" class="btn" @click="handleTKOrder(item.orderNumber)">申请退款</nut-button>
            </view>
          </nut-cell>

          <view v-if="pageData.orderList.length <= 0" class="defaultBox">
        <view class="img">
          <image src="@/assets/images/project/emptyDefault.png"></image>
        </view>
        <view class="img tips">暂无数据</view>
      </view>
        </view>
      </nut-tab-pane>
    </nut-tabs>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </view>
</template>
<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { getMyOrdertList, cancelOrder, orderRefund } from '@/apis/lpt/order';
import Taro from '@tarojs/taro';
import myToastComponents from '@/components/myToast/index.vue';
import { postOrderPay } from '@/apis/lpt/shop';
import { imgHostLpt } from '@/utils/env';
import { debounce } from 'lodash';
import {   useRouter } from '@tarojs/taro';

const pageData = reactive({
  orderList: [] as any,
  tabValue: 0,
  statusMap: {
    '-2': '已退款',
    '1': '待支付',
    // 2: '待发货',
    // 3: '待收货',
    '2': '已支付',
    '6': '已取消',
  },
  verificationStatusMap: {
    '0': '未核销',
    '1': '已核销',
    '2': '已核销完成',
  },
  tabItemList: [
    {
      title: '全部订单',
      key: 0
    },
    {
      title: '待支付',
      key: 1
    },
    {
      title: '已支付',
      key: 2
    },
    {
      title: '已取消',
      key: 6
    },
  ]
});
const myToast = ref<any>();

const freshListData = async (tabType: number) => {
  const res = await getMyOrdertList(tabType);
  pageData.orderList = res.records;
};


const router = useRouter();

 pageData.tabValue =router.params.id? Number(router.params.id):0;

// 切换tab，刷新数据
watch(
  () => pageData.tabValue,
  async () => {
    await freshListData(pageData.tabValue);
  },
  {
    immediate: true,
  },
);

const handleTKOrder = (orderNumber: string) => {
  Taro.showModal({
    content: '要对此订单退款？',
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    cancelText: '否',
    confirmText: '是',
    success: async (res) => {
      if (res.confirm) {
        await orderRefund({
          orderNumber,
          buyerMsg: '',
          sellerMsg: '',
          refundAmount: 0.01,
        });
        myToast.value.myToastShow({
          icon: 'success',
          title: '退款申请已发起',
          duration: 3000,
        });
      }
    },
  });
};
const handleCancelOrder = (orderNumber: string) => {
  Taro.showModal({
    content: '要取消此订单？',
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    cancelText: '否',
    confirmText: '是',
    success: async (res) => {
      if (res.confirm) {
        await cancelOrder(orderNumber);
        await freshListData(pageData.tabValue);
        myToast.value.myToastShow({
          icon: 'success',
          title: '取消成功',
          duration: 3000,
        });
      }
    },
  });
};


const pay = debounce(async (ordernum: string) => {

  const res = await postOrderPay(ordernum);
  wx.requestPayment({
    timeStamp: res.timeStamp,
    nonceStr: res.nonceStr,
    package: res.packageVal,
    signType: res.signType,
    paySign: res.paySign,
    success: () => {
      myToast.value.myToastShow({
        icon: 'success',
        title: '支付成功',
        duration: 3000,
      });
      freshListData(pageData.tabValue);

    },
    fail: () => {
      myToast.value.myToastShow({
        icon: 'error',
        title: '支付失败',
        duration: 3000,
      });
      freshListData(pageData.tabValue);
    },
  });
}, 3000, { leading: true, trailing: false });

const handleToUse = (order) => {
  Taro.previewImage({
    urls: [`${imgHostLpt}/${order.verificationCode}`] // 需要预览的图片http链接列表
  });
};




</script>
