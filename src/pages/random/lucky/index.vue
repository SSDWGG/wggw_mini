<template>
  <view>
    <LuckyWheel
      ref="myLucky"
      width="700rpx"
      height="700rpx"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    ></LuckyWheel>
  </view>

  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>

<script>
// https://100px.net/    组件文档地址
import { ref, reactive, toRefs } from 'vue';
import { LuckyWheel } from '@lucky-canvas/taro/vue';
import myToastComponents from '@/components/myToast/index.vue';
import Taro from '@tarojs/taro';

export default {
  components: { LuckyWheel, myToastComponents },
  props: {
    mainData: {
      type: Object,
      default: {},
    },
    cb: {
      type: Function,
    },
  },
  setup(props) {
    const myLucky = ref(null);
    const myToast = ref(null);
    const state = reactive({
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        // imgs:[{src:require('@/assets/images/cxk/kun.png'),top:"10px",width:"10px",height:"10px"}]
        { fonts: [{ text: '0', top: '7%', fontSize: '16px', fontStyle: 'monospace' }], background: '#e9e8fe' },
        { fonts: [{ text: '1', top: '7%', fontSize: '16px', fontStyle: 'monospace' }], background: '#b8c5f2' },
      ],
      buttons: [
        { radius: '50px', background: '#617df2' },
        { radius: '45px', background: '#afc8ff' },
        {
          radius: '40px',
          background: '#869cfa',
          pointer: true,
          fonts: [{ text: '获取\n结果', top: '-20px', fontSize: '16px', fontStyle: 'monospace', fontColor: '#7468f2', fontWeight: '900' }],
        },
      ],
      index: 0,
    });
    // 点击抽奖按钮会触发star回调
    function startCallback() {
      // 调用抽奖组件的play方法开始游戏
      myLucky.value.play();
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        state.index = drawLotteryIndex(props.mainData);
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(state.index);
      }, 4000);
    }
    // 抽奖结束会触发end回调
    function endCallback(prize) {
      // myToast.value.myToastShow({
      //   icon: 'success',
      //   title: `硬币抛出的那一刻或许你早已有了答案~本次抽中的结果是：${props.mainData[state.index].name}`,
      //   duration: 5000,
      // });
      if (props.mainData[state.index].childList.length > 0) {
        Taro.showModal({
          content: `您本次随机的结果是：《${props.mainData[state.index].name}》,接下来将会对《${props.mainData[state.index].name}》的子选项进行随机抽取`,
          cancelColor: '#999999',
          confirmColor: '#7468F2 ',
          success: async (res) => {
            props.cb(props.mainData[state.index],true);
          },
        });
      } else {
        Taro.showModal({
          content: `转盘旋转的瞬间,或许你已有了答案~很高兴这次能帮助到您,您本次随机的结果是：${props.mainData[state.index].name}`,
          cancelColor: '#999999',
          confirmColor: '#7468F2 ',
          success: async (res) => {
            props.cb(props.mainData[state.index],false);
          },
        });
      }

    }

    function drawLotteryIndex(items) {
      // 计算总权重
      const totalValue = items.reduce((sum, item) => sum + item.value, 0);

      // 生成一个0到totalValue之间的随机数
      let randomValue = Math.random() * totalValue;

      // 根据随机数选择对应的对象索引
      for (let index = 0; index < items.length; index++) {
        if (randomValue < items[index].value) {
          return index;
        }
        randomValue -= items[index].value;
      }

      // 如果没有找到，返回最后一个索引（理论上不会发生）
      return items.length - 1;
    }

    const init = () => {
      state.prizes = [];
      props.mainData.forEach((element, index) => {
        state.prizes.push({
          fonts: [{ text: element.name, top: '7%', fontSize: '16px', fontStyle: 'monospace', fontColor: '#7468f2', fontWeight: '600' }],
          background: index % 2 === 0 ? '#e9e8fe' : '#b8c5f2',
        });
      });
    };

    init();
    return {
      ...toRefs(state),
      startCallback,
      endCallback,
      myLucky,
      myToast,
    };
  },
};
</script>
