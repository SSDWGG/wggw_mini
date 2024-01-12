<template>
  <view  :class="{[styles.container]: true, [styles.show]: props.show }">
    <full-button @tap = "()=>emit('full')"/>
      <share-button/>
      <contact-button/>
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import ShareButton from './share-button.vue';
import ContactButton from './contact-button.vue';
import FullButton from './full-button.vue';

const emit = defineEmits(['full']);


const props = withDefaults(defineProps<{ show?: boolean }>(), {
  show: true,
});

</script>
