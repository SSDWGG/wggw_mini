<template>
  <view :class="styles.cxk">
    <navbar title="IKun" background-color="transparent" :goback="goback" />
    <view class="title"> 支持坤坤的第912.5天 </view>
    <view class="cxkContent c1" @tap="handleClickCxk">
      <view class="txt" :style="{ color: data.bg }">
        {{ audioChoose.text }}
      </view>
      <image src="@/assets/images/cxk/kun.png"></image>
    </view>
    <view class="cxkContent c2" @tap="handleClickCxk">
      <view class="txt" :style="{ color: data.bg }">
        {{ audioChoose.text }}
      </view>
      <image src="@/assets/images/cxk/kun.png"></image>
    </view>
    <view class="cxkContent c3" @tap="handleClickCxk">
      <view class="txt" :style="{ color: data.bg }">
        {{ audioChoose.text }}
      </view>
      <image src="@/assets/images/cxk/kun.png"></image>
    </view>

    <video
      class="video"
      object-fit="fill"
      :show-bottom-progress="false"
      :initial-time="0"
      :autoplay="true"
      :controls="false"
      :show-fullscreen-btn="false"
      :show-center-play-btn="false"
      :show-play-btn="false"
      :loop="true"
      :muted="false"
      :enable-progress-gesture="false"
      style="width: 100%"
      :src="cdnHost + ossFilePrePath + '/OOJDGCGA-1682498842686kunwu.mov'"
    />
  </view>
</template>
<script lang="ts" setup>
  import Taro, { useDidHide } from '@tarojs/taro';
  // @ts-ignore
  import styles from './styles.scss';
  import { Navbar } from '@fishui/taro-vue';
  import { computed, reactive } from 'vue';
  import { cdnHost, ossFilePrePath } from '@/utils/env';

  const innerAudioContext = Taro.createInnerAudioContext();
  const cxkMusicsList = [
    {
      src: `${cdnHost+ossFilePrePath}/APENDBMF-1679390216522j.mp3`,
      text: '!ji!',
    },
    {
      src: `${cdnHost+ossFilePrePath}/PEELADIA-1679390220050ngm.mp3`,
      text: '你干嘛~哎呦~',
    },
    {
      src: `${cdnHost+ossFilePrePath}/KBOAGENL-1679390152917jntm.mp3`,
      text: '鸡你太美~',
    },
    {
      src: `${cdnHost+ossFilePrePath}/NFHKMKOK-1679390468478bgm.mp3`,
      text: '唱、跳、rap、篮球',
    },
  ];
  const data = reactive({
    index: 0,
    showTxt: false,
    bg: '',
  });

  const getBgColor = () => {
    const rs = Math.floor(Math.random() * (270 - 100) + 100);
    const gs = Math.floor(Math.random() * (270 - 100) + 100);
    const bs = Math.floor(Math.random() * (200 - 90) + 90);
    return `rgb(${  rs  },${  gs  },${  bs  })`; // 所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
  };

  const audioChoose = computed(
    () => cxkMusicsList[data.index % cxkMusicsList.length]
  );

  innerAudioContext.src = audioChoose.value.src;
  innerAudioContext.play();

  innerAudioContext.onPlay(() => {
    data.bg = getBgColor();
    data.showTxt = true;
  });
  innerAudioContext.onEnded(() => {
    data.showTxt = false;
  });

  const handleClickCxk = () => {
    data.index++;
    innerAudioContext.src = audioChoose.value.src;
    innerAudioContext.play();
  };

  const goback = () => {
    innerAudioContext.destroy();
    Taro.navigateBack();
  };

  useDidHide(() => {
  });
</script>
