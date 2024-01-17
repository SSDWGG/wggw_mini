<template>
  <view>
    <LuckyWheel
      ref="myLucky"
      width="600rpx"
      height="600rpx"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    ></LuckyWheel>
  </view>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { LuckyWheel } from '@lucky-canvas/taro/vue'
export default {
  components: { LuckyWheel },
  setup () {
    const myLucky = ref(null)
    const state = reactive({
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
      ],
      buttons: [
        { radius: '50px', background: '#617df2' },
        { radius: '45px', background: '#afc8ff' },
        {
          radius: '40px', background: '#869cfa',
          pointer: true,
          fonts: [{ text: '开始\n抽奖', top: '-20px' }]
        },
      ],
    })
    // 点击抽奖按钮会触发star回调
    function startCallback () {
      // 调用抽奖组件的play方法开始游戏
      myLucky.value.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 0
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(index)
      }, 3000)
    }
    // 抽奖结束会触发end回调
    function endCallback (prize) {
      console.log(prize)
    }
    return {
      ...toRefs(state),
      startCallback,
      endCallback,
      myLucky
    }
  }
}
</script>