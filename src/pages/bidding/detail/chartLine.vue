<template>
  <view v-if="isPermissionsToWx()">

  
  <view class="bar-chart">
    <EChart v-if="orginData.length > 0" ref="barChat" canvas-id="bar-canvas" />
    <view v-else class="empty"> 暂无价格，去发表第一波价格吧~ </view>
  </view>

  <view class="btnGroup">
    <!-- 获取最新报价 -->
    <nut-animate v-if="orginData.length > 0" type="breath" class="rule-button-div" loop @tap="initMultiBarChart">
      <nut-button
        block
        type="primary"
        class="publish"
        @tap="
          () => {
            emit('gx');
          }
        "
        >更新报价</nut-button
      >
    </nut-animate>
    <!-- 添加报价 -->
    <nut-animate type="breath" class="rule-button-div" loop>
      <nut-button block type="primary" class="publish" @tap="addGame">参与报价</nut-button>
    </nut-animate>
  </view>
  <view v-if="account.userInfo.openid === chooseItem.openid" class="btnGroup">
    <!-- 编辑标的 -->
    <nut-animate type="breath" class="rule-button-div" loop>
      <nut-button block type="primary" class="publish" @tap="editChart">编辑标的</nut-button>
    </nut-animate>
    <!-- 编辑标的 -->
    <nut-animate type="breath" class="rule-button-div" loop>
      <nut-button block type="primary" class="publish" @tap="delChart">删除标的</nut-button>
    </nut-animate>
  </view>
</view>
<view v-else class="emptyContainer">
    <navbar title="感谢关注" />
    <view class="empty" >
      感谢您的关注，该功能暂未开启
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import EChart from '@/components/myEcharts/index.vue';
import Taro, { useRouter } from '@tarojs/taro';
import type { IBiddingItem, IPriceLineItem } from '@/apis/kunChart/model';
import { useAccountStore } from '@/stores/account';
import cloneDeep from 'lodash/cloneDeep';
import { deleteKunChartByShopId } from '@/apis/kunChart';
import { isPermissionsToWx } from '@/utils/index';

interface IProps {
  orginData: IPriceLineItem[];
  chooseItem: IBiddingItem;
}

const props = withDefaults(defineProps<IProps>(), {
  orginData: () => [] as IPriceLineItem[],
  chooseItem: () => ({}) as IBiddingItem,
});
const emit = defineEmits(['bj', 'gx']);

const account = useAccountStore();

const router = useRouter();

const barChat = ref<any>();

const editChart = () => {
  account.editBinddingData = cloneDeep(props.chooseItem);
  Taro.navigateTo({
    url: `/pages/bidding/post/index?type=image&shopId=${router.params.shopId}`,
  });
};

const delChart = async () => {
  await deleteKunChartByShopId({
    shopId: router.params.shopId as string,
  });
  Taro.showToast({
    title: '操作成功',
    icon: 'success',
    duration: 2000,
  });
  setTimeout(() => {
    Taro.navigateBack();
  }, 1500);
};

const initData = (option) => {
  props.orginData.forEach((item) => {
    option.xAxis.data.push(item.createTime);
    option.series[0].data.push(item.price?item.price:0);
  });
};

const initMultiBarChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 4,
        formatter: function (value) {
          if (value >= 1000 && value < 10000) {
            value = `${value / 1000  }千`;
          } else if (value >= 10000 && value < 10000000) {
            value = `${value / 10000  }万`;
          } else if (value >= 10000000) {
            value = `${value / 10000000  }千万`;
          }

          if (value <= -1000 && value > -10000) {
            value = `${value / 1000  }千`;
          } else if (value <= -10000 && value > -10000000) {
            value = `${value / 10000  }万`;
          } else if (value <= -10000000) {
            value = `${value / 10000000  }千万`;
          }
          return value;
        },
      },
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
  };
  initData(option);

  Taro.nextTick(() => {
    barChat.value.refresh(option);
  });
};

const addGame = () => {
  emit('bj');
};

watch(
  () => props.orginData,
  (newVal) => {
    if (newVal.length > 0) {
      initMultiBarChart();
    }
  },
);
</script>
