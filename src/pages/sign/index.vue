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

    <view class="tip">
      <view> 爷爷我用nut-ui用到这里，真的必须高低问候一下京东NUT开发组， </view>
      <view> 京东这就是你推出的组件库，这就是你们的成果、开源精神、管理精神的体现？ </view>
      <view> 用之前觉得这组件库什么什么挺全的，写多了之后现在我尼玛... </view>
      <view> 你们团队开发出来的东西扩展性就这样？养了这么多吃干饭的前端？ </view>
      <view> 就拿上面的signature组件而言，绑定事件就这俩，样式格式也是固定的,组件写的乱，内部方法实例给我啊，我自己来调也行啊。 </view>
      <view> 等等组件，我不一一列举，很多复合组件都有各种各样的bug，我的真是写服了。 </view>
      <view> 怎么开发？我就问问京东前端开发组nut开发团队，你们这玩意儿怎么用？ </view>
      <view> 在你们的组件上开发吃一坨shi一样难受,这组件有一点点的可拓展性和开发性？ </view>
      <view> 你们对nut的更新更是6上6，这个程序本来是用的3.X开发的，你们升级个4.X。来个全破坏性升级，全盘否定？</view>
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
const state = reactive({
  lineWidth: 1,
  strokeStyle: 'green',
});
const imgData = ref('');
const confirm = (canvas: any, data: string) => {
  if (data) {
    imgData.value = data;
    console.log('imgData', canvas, data);
  }
};
const clear = () => {
  imgData.value = '';
  console.log('clear');
};

// 拿到token跳转网页签名
const initWebPageUrl = async () => {
  const token = await getToken();

  console.log(token);
};

initWebPageUrl();
</script>
