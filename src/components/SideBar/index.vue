<template>
  <view  :class="{[styles.container]: true, [styles.show]: props.show }">
    <component :is="buttonComponents[index]" v-for="(_, index) in buttonComponents" :key="index" v-bind="$attrs" />
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import ShareButton from './share-button.vue';
import FullButton from './full-button.vue';
import ContactButton from './contact-button.vue';
import CallButton from './call-button.vue';
import PostButton from './post-button.vue';
import MineButton from './mine-button.vue';
import BiddingButton from './bidding-button.vue';
import BiddingLineButton from './biddingLine-button.vue';
import ImgPostButton from './img-post-button.vue';
import DownloadAll from './download-all.vue';
import { computed } from 'vue';

interface IProps {
  show: boolean,
  showFlags: number[]; // 需要展示的 按钮对应的 flags

}

const props = withDefaults(defineProps<IProps>(), {
  show: true,
  showFlags: () => [],
});


const buttonComponentType = {
  1: ShareButton,
  2: FullButton,
  3: ContactButton,
  4: CallButton,
  5: PostButton,
  6: MineButton,
  7: BiddingButton,
  8: BiddingLineButton,
  9:ImgPostButton,
  11: DownloadAll,
};

const buttonComponents = computed(() => props.showFlags.map((num: number) => buttonComponentType[num]));

</script>
