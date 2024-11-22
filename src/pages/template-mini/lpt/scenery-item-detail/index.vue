<template>
  <view :class="styles.myContainer">
    <myNavBar title="景点详情" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="景点详情" />
    <view class="scenery">

      <view class="sceneryDetail">
        <image v-if="data.scenery.pic" :src="imgHostLpt + '/' + data.scenery.pic" />
        <view class="title">
          {{ data.scenery.name }}
        </view>
      </view>

      <!-- 富文本 -->
      <view class="moreContent">
        <view class="title">
          <view class="txt">
            景点介绍
          </view>


        </view>

        <view class="moreMain richTextContent">
          <rich-text :nodes="data.scenery.content" />
        </view>

      </view>

    </view>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />

</template>
<script lang="ts" setup>
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import myToastComponents from '@/components/myToast/index.vue';
import { getSceneryItemDetail } from '@/apis/lpt/shop';
import { imgHostLpt } from '@/utils/env';
import { useRouter } from '@tarojs/taro';

const router = useRouter();

const myToast = ref<any>();

const data = reactive({
  scenery: {} as any
});

const getScenery = async () => {
  data.scenery = await getSceneryItemDetail(router.params.id);
};
getScenery();
</script>
