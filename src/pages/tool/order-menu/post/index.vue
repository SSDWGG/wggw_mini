<template>
  <view v-if="isPermissionsToWx()" :class="styles.container">
    <navbar :title="!!router.params.memoId ? '编辑菜谱' : '创建菜谱'" />
    <view class="body">
      <!-- 文案 -->
      <!-- <nut-textarea v-model="data.content" placeholder="这一刻的想法…" :auto-focusd="false" rows="2" class="post-textarea"></nut-textarea> -->
      <!-- 预览列表(图片、视频，添加按钮) -->
      <prelist ref="prelistRef" />
    </view>

    <!-- 发表按钮 -->
    <view class="footer">
      <nut-button block type="primary" class="publish" @tap="handleAddAlbum">{{ !!router.params.memoId ? '确认修改' : '发表' }}</nut-button>
    </view>
  </view>
  <view v-else :class="styles.emptyContainer">
    <navbar title="感谢关注" />
    <view class="empty"> 感谢您的关注，该功能暂未开启 </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import Prelist from '@/components/postPreList/index.vue';
import { debounce } from 'lodash';
import { getOSSVideoImg } from '@/utils/index';
import type { IMemo, IMemoItem } from '@/apis/memo/model';
import { useAccountStore } from '@/stores/account';
import type { IResult } from '@/components/selectMedia';
import { AddMemo, updateMemo } from '@/apis/memo';
import { useRouter, useUnload } from '@tarojs/taro';
import { isPermissionsToWx } from '@/utils/index';

definePageConfig({
  disableScroll: true,
});
const router = useRouter();

const account = useAccountStore();

const data = reactive({
  content: '',
  saveModule: false,
  modulePopshow: true,
  // 子组件的data
  childDataPicList: [] as IResult[],
});
const prelistRef = ref();

// 编辑逻辑
if (router.params.memoId) {
  data.content = account.editMemoData.content;
  account.templeChoosePostList = account.editMemoData.list.map((item) => ({
    path: item.picUrl || item.videoPicUrl,
    type: item.memoItemType === 0 ? 'image' : 'video',
  }));
}

const PasslintContent = () => {
  if (prelistRef.value.data.sortedList.length === 0) {
    Taro.showToast({
      title: '请选择素材',
      icon: 'error',
      duration: 2000,
    });
    return false;
  } else {
    return true;
  }
};


const addMemoData = async (
  List: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[],
) => {
  const targetList: {
    picUrl: string;
  }[] = [];

  // 数据格式化存储的内容
  List.forEach((item) => {
    targetList.push({
      picUrl: item.fullpath as string,
    });
  });

  if (router.params.shopId) {
    account.editBinddingData.title = data.title;
    account.editBinddingData.imgSrc = JSON.stringify(targetList);
    account.editBinddingData.kcDesc = data.kcDesc;
    await updateKunChart(account.editBinddingData);
  } else {
    const shopId = await addKunChart({
      title: data.title,
      imgSrc: JSON.stringify(targetList),
      kcDesc: data.kcDesc,
      openid: account.userInfo.openid,
    });
    // 初始化价格0
    await addKunChartLine({
      shopId: shopId,
      openid: account.userInfo.openid,
      username: account.userInfo.username,
      price: data.price || '0',
    });
  }
};

const postHttp = debounce(async () => {
  try {
    await addMemoData(await prelistRef.value.uploadOSS());
    Taro.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  } catch (error) {
    Taro.showToast({
      title: '上传失败',
      icon: 'error',
      duration: 2000,
    });
  }
}, 500);

const handleAddAlbum = () => {
  // 校验文案是否填写，校验图片素材是否为空
  if (!PasslintContent()) return false;

  Taro.showLoading({
    title: '发布中',
    mask: true,
  });
  postHttp();
  return false;
};

useUnload(() => {
  account.editMemoData = {} as IMemo;
});
</script>
