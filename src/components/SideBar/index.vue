<template>
  <view  :class="{[styles.container]: true, [styles.show]: props.show }">
    <full-button @tap = "()=>emit('full')"  v-if="!!props.fullBtnFlag"/>
    <share-button/>
    <contact-button/>
    <test-button/>
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import ShareButton from './share-button.vue';
import FullButton from './full-button.vue';
import ContactButton from './contact-button.vue';
import TestButton from './test-button.vue';

const emit = defineEmits(['full']);


const props = withDefaults(defineProps<{ show?: boolean,fullBtnFlag?:boolean }>(), {
  show: true,
  fullBtnFlag:true
});

</script>
