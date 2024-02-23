<template>
    <canvas v-if="showCanvas" :id="svgaPlayCanvasId" type="2d" :class="styles.svgaPlay" :style="props.canvasStyle" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import Taro from '@tarojs/taro';
import { Parser, Player } from "svgaplayer-weapp";
import { ref} from 'vue';
import { uuid } from '@/utils/index';

interface IProps {
  svgaUrl: string;
  canvasStyle: any;
  loop: number;
}

const props = withDefaults(defineProps<IProps>(), {
  loop: 1,
  canvasStyle: {},
  svgaUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/MerryChristmas.svga',
});

const showCanvas = ref(false)
const svgaPlayCanvasId = ref('')

svgaPlayCanvasId.value = uuid()

const showSvga =  () => {
  showCanvas.value = true
  Taro.nextTick(async() => {
    try {
      const parser = new Parser();
      const player = new Player();
      await player.setCanvas(`#${svgaPlayCanvasId.value}`);
      const videoItem = await parser.load(props.svgaUrl);
      await player.setVideoItem(videoItem);
      player.loops = props.loop;
      player.onFinished(()=>{
        showCanvas.value = false
      })
      player.startAnimation();
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  showSvga,
});
</script>
