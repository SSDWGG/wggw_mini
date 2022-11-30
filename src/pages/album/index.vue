<template>
  <view :class="styles.myContainer">
    <FirstTimePage/>
    
  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import  FirstTimePage  from './components/firstTimePage/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});
</script>