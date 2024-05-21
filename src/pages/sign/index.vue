<template>
  <view :class="styles.signContainer">
    <navbar title="电子签名" />
    <!-- 小程序内电子签名、网页电子签名（token模式） -->
    <nut-signature :line-width="state.lineWidth" :stroke-style="state.strokeStyle" custom-class="mySignatureClass" @confirm="confirm" @clear="clear" />

    <view class="imgList">
      <view class="imageItem">
        <image :src="imgData" mode="widthFix" class="imgData" />
      </view>
    </view>
    <view class="btnGroup">
      <nut-animate type="breath" class="rule-button-div" loop>
        <nut-button block type="primary" class="publish" @tap="toH5Sign">h5使用签名功能</nut-button>
      </nut-animate>
      <nut-animate type="breath" class="rule-button-div" loop>
        <nut-button block type="primary" class="publish" @tap="state.showTip = !state.showTip">{{ state.showTip ? '收起' : '展开' }}致Nut开发团队</nut-button>
      </nut-animate>
    </view>
    <view class="tip" v-if="isPermissions2() && state.showTip">
      <view> 致京东nut开发团队：爷爷我用nut-ui用到这里，高低要问候一下你们， </view>
      <view> 这组件库就是你们的成果、开源精神、管理精神的体现？ </view>
      <view> 用之前觉得这组件库什么挺全的，写多了之后现在我尼玛... </view>
      <view> 你们团队开发出来的东西扩展性就这样？养了这么多吃干饭的前端？ </view>
      <view> 就拿上面的signature组件而言，绑定事件就俩，样式格式也是固定的,组件写的乱，内部方法实例给我啊，我自己来调用也行啊。 </view>
      <view> 等等组件，我不一一列举，很多复合组件都有各种各样的bug，我的真是写服了。 </view>
      <view> 怎么开发？我就问问京东前端开发组nut开发团队，你们这玩意儿怎么大规模用？ </view>
      <view> 在你们的组件上开发吃一坨shi一样难受,这组件有一点点的可拓展性和开发性？ </view>
      <view> 你们对nut的更新更是6上6，3.X到4.X竟然来个来个全破坏性升级？</view>
      <view> 原先的吃干饭团队被开了一群，换了另一批来继续吃是吧？ </view>
      <view> 京东前端开发组，你们就用这样一份向上负责的垃圾政绩工程的组件库，来忽悠你们的上级，用这种开源精神和结果来表明你们的内部垃圾管理吗？ </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { getToken } from '@/apis/mine';
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import { isPermissions2 } from '@/utils/index';
import Taro from '@tarojs/taro';

const state = reactive({
  lineWidth: 1,
  strokeStyle: 'green',
  showTip: false,
});
const imgData = ref('');
const confirm = (canvas: any, data: string) => {
  if (data) {
    // imgData.value = data;
    console.log('imgData', canvas, data);
    urlTobase64(data)
  }
};

const urlTobase64 = (url) => {
  Taro.request({
    url: url,
    responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
    success: res => {
      //把arraybuffer转成base64
      let base64 = Taro.arrayBufferToBase64(res.data);
      base64 = 'data:image/jpeg;base64,' + base64
      imgData.value = base64
    }
  })
}

const clear = () => {
  imgData.value = '';
  console.log('clear');
};

// 拿到token跳转网页签名
const toH5Sign = async () => {
  const token = await getToken();
  console.log(token);
}


let arr = [{ id: 1, name: '部门1', pid: 0 }, { id: 2, name: '部门2', pid: 1 }, { id: 3, name: '部门3', pid: 1 }, { id: 4, name: '部门4', pid: 3 }, { id: 5, name: '部门5', pid: 4 },]

</script>
