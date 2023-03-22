<template>
  <view  :class="{[styles.container]: true, [styles.show]: props.show }">
    <post-button />
    <share-button/>
  </view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import PostButton from './post-button.vue';
import ShareButton from './share-button.vue';

const props = withDefaults(defineProps<{ show?: boolean }>(), {
  show: true,
});

</script>
