<template>
  <navbar title="计分板" background-color="#f3f3fe" />
  <view :class="styles.scoreboard">
    <nut-table :columns="pageData.columns" :data="pageData.tableData" :bordered="false" striped>
      <template #nodata>
        <view class="no-data"> 暂无数据，开始比赛吧~ </view>
      </template>
    </nut-table>

    <view class="btnGroup">
      <!-- 发表按钮 -->
      <nut-animate v-if="pageData.tableData.length > 0" type="breath" class="rule-button-div" loop>
        <nut-button block type="primary" class="publish" @tap="pageData.startGame = true">开启下一轮计分</nut-button>
      </nut-animate>
      <!-- 添加参赛人员 -->
      <nut-animate type="breath" class="rule-button-div" loop>
        <nut-button block type="primary" class="publish" @tap="pageData.addPerson = true">添加参赛人员</nut-button>
      </nut-animate>
    </view>

    <view class="bar-chart">
      <EChart ref="barChat" canvas-id="bar-canvas" />
    </view>

    <myStepLine :dataList="pageData.stepLineList" />

    <update-pop
      v-model:modelValue="pageData.startGame"
      v-model:inputValue="pageData.gameStr"
      title="添加本场比赛结果"
      placeholder="添加本场比赛结果"
      :max="1000"
      @ok="handleOkGame"
    >
      <template #contentBottom>
        <view class="popTip">
          <view class="txt">批量添加功能tip：您可以在不同数字之间使用除小数点以及符负号外任意字符作为得分间隔</view>
          <!-- <view class="txt">输入内容tip：期望每次输入的数字是零合的，即所有数字相加应该为0</view> -->
          <view class="txt">输入数量tip：期望每次输入的数字和人数是相当的</view>
        </view>
      </template></update-pop
    >

    <update-pop
      v-model:modelValue="pageData.addPerson"
      v-model:inputValue="pageData.personStr"
      title="添加比赛参与人员"
      placeholder="添加比赛参与人员"
      :max="1000"
      @ok="handleOkPerson"
    >
      <template #contentBottom>
        <view class="popTip">
          <view class="txt">(批量添加请使用+作为间隔)</view>
        </view>
      </template>
    </update-pop>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';
import { reactive, h, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import cloneDeep from 'lodash/cloneDeep';
import { uuid } from '@/utils/index';
import EChart from '@/components/myEcharts/index.vue';
import Taro from '@tarojs/taro';
import myStepLine from './stepline/index.vue';

interface ITableItem {
  id: string;
  name: string;
  step: Array<{ setNum: number; count: number }>;
  all: number;
}

definePageConfig({ backgroundColor: '#f3f3fe' });

const barChat = ref<any>();

const myToast = ref<any>();

const pageData = reactive({
  manySave: false,
  startGame: false,
  addPerson: false,
  gameStr: '',
  personStr: '',
  columns: [
    {
      title: '姓名',
      key: 'name',
      align: 'center',
      stylehead: 'font-size:20px;color:#7468F2;font-weight:bolder;',
      stylecolumn: 'font-size:20px;color:#7468F2;',
      render: (record) => h(
          'span',
          {
            onClick: () => initMultiBarChart(record),
          },
          record.name,
        ),
    },
    {
      title: '历史得分',
      key: 'step',
      align: 'center',
      stylehead: 'font-size:20px;color:#7468F2;font-weight:bolder;',
      stylecolumn: 'font-size:20px;color:#7468F2;',
      render: (record) => h(
          'span',
          {
            onClick: () => initMultiBarChart(record),
          },
          record.step.length > 0
            ? `${record.step.length > 3 ? '...' : ''}${record.step
                .map((item) => item.count)
                .join('+')
                .slice(-5)}`
            : 0,
        ),
    },
    {
      title: '总得分',
      key: 'all',
      align: 'center',
      stylehead: 'font-size:20px;color:#7468F2;font-weight:bolder;',
      stylecolumn: 'font-size:20px;color:#7468F2;',
      render: (record) => h(
          'span',
          {
            onClick: () => initMultiBarChart(record),
          },
          record.all ?? 0,
        ),
      sorter: (row1: any, row2: any) => row2.all - row1.all,
    },
  ],
  tableData: [] as Array<ITableItem>,
  showOneId: '',
  stepLineList: [] as any,
});

// 计算总得分
const computedAllNumData = () => {
  pageData.tableData.forEach((item) => {
    const stepArr = cloneDeep(item.step) as any;
    item.all = stepArr.reduce((pre, cur) => {
      cur.count = Number(pre ? pre.count : 0) + Number(cur.count);
      return cur;
    }, 0).count;
  });
};

// 计算stepline
const computedStepLineList = () => {
  pageData.stepLineList = [];
  pageData.tableData[0].step.forEach((_arrItem, arrIndex) => {
    const obj = {} as any;
    const arr = [] as any;
    pageData.tableData.forEach((item) => {
      obj.setNum = arrIndex;
      arr.push({ ...item, count: item.step[arrIndex].count });
    });
    obj.arr = arr;
    pageData.stepLineList.push(cloneDeep(obj));
  });
};

// 刷新echart
const initMultiBarChart = (recordData: ITableItem) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    title: [
      {
        left: 'center',
        text: '',
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [] as Array<number>,
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
        data: [] as any,
        type: 'line',
        smooth: true,
      },
    ],
  };

  pageData.showOneId = recordData.id;
  recordData.step.forEach((item) => {
    option.xAxis.data.push(item.setNum);
    option.series[0].data.push(item.count);
  });

  let cumulativeSum = 0;
  option.series[0].data = option.series[0].data.map((count) => (cumulativeSum += count));
  option.title[0].text = `${recordData.name  }的总得分线`;
  Taro.nextTick(() => {
    barChat.value.refresh(option);
  });
};

const handleOkGame = () => {
  // 校验内容是否只有数组和分隔符
  // 校验人数和拆分后的数字是否合适匹配
  const resList = pageData.gameStr.match(/-?\d+(\.\d+)?/g);
  if (!!resList && resList.length === pageData.tableData.length) {
    resList.forEach((item, index) => {
      pageData.tableData[index].step.push({
        setNum: pageData.tableData[index].step.length,
        count: Number(item),
      });
    });
    computedAllNumData();
    pageData.gameStr = '';
    const params = pageData.showOneId ? (pageData.tableData.find((item) => item.id === pageData.showOneId) as ITableItem) : pageData.tableData[0];
    initMultiBarChart(params);
    computedStepLineList();
    Taro.setStorageSync('wggw-scoreboard-tableData', pageData.tableData);
  } else {
    myToast.value.myToastShow({
      icon: 'error',
      title: `当前参赛人${pageData.tableData.length}个，本次输入数据${resList ? resList.length : 0}个，请检查！`,
      duration: 3000,
    });
  }
};

const handleOkPerson = () => {
  if (!pageData.personStr) {
    myToast.value.myToastShow({
      icon: 'error',
      title: '请输入参赛人',
      duration: 2000,
    });
  }

  pageData.personStr.split('+').forEach((item) => {
    if (item) {
      const stepAdd = [] as any;
      // 如果是中途入赛
      if (pageData.tableData[0]) {
        pageData.tableData[0].step.forEach((item) => {
          stepAdd.push({
            setNum: item.setNum,
            count: 0,
          });
        });
      }

      pageData.tableData.push({
        id: uuid(),
        name: item,
        step: stepAdd,
        all: 0,
      });
      Taro.setStorageSync('wggw-scoreboard-tableData', pageData.tableData);
    }
  });
  pageData.personStr = '';
};

const initPage = () => {
  const lsTbleData = Taro.getStorageSync('wggw-scoreboard-tableData');
  // 存在且非空
  if (!!lsTbleData && lsTbleData.length > 0) {
    Taro.showModal({
      content: '是否进行记录未结束的记录？',
      cancelColor: '#999999',
      confirmColor: '#7468F2 ',
      confirmText: '继续记录',
      success: async (res) => {
        if (res.confirm) {
          pageData.tableData = lsTbleData;
          const params = pageData.showOneId ? (pageData.tableData.find((item) => item.id === pageData.showOneId) as ITableItem) : pageData.tableData[0];
          initMultiBarChart(params);
          computedStepLineList();
        }
      },
    });
  }
};
initPage();
</script>
