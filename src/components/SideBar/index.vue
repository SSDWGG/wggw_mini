<template>
  <view  :class="{[styles.container]: true, [styles.show]: props.show }">
    <component :is="buttonComponents[index]" v-for="(_, index) in buttonComponents" :key="index" v-bind="$attrs" />
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import ShareButton from './share-button.vue';
import FullButton from './full-button.vue';
import ContactButton from './contact-button.vue';
import TestButton from './test-button.vue';
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
  4: TestButton,
};

const buttonComponents = computed(() => props.showFlags.map((num: number) => buttonComponentType[num]));

</script>
