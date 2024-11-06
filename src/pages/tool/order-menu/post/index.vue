<template>
  <view v-if="isPermissionsToWx()" :class="styles.container">
    <navbar :title="!!router.params.memoId ? '编辑我的记录' : '创建我的记录'" />
    <view class="body">
      <!-- 文案 -->
      <nut-textarea v-model="data.content" placeholder="这一刻的想法…" :auto-focusd="false" rows="2" class="post-textarea"></nut-textarea>
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
  const targetList: IMemoItem[] = [];
  const time = `${new Date().valueOf()}`;
  data.childDataPicList = prelistRef.value.data.sortedList;
  // 数据格式化存储的内容
  List.forEach((item, index) => {
    targetList.push({
      memoItemType: data.childDataPicList[index].type === 'image' ? 0 : 1,
      picUrl: item.fullpath as string,
      sort: index,
      // 封面默认取第30帧内容
      videoPicUrl: data.childDataPicList[index].type === 'image' ? '' : getOSSVideoImg(item.fullpath as string),
      memoResId: item.name,
      gmtCreate: time,
      gmtModified: time,
    });
  });
  const listParam = {
    ...account.editMemoData,
    memoType: targetList.length === 0 ? 2 : targetList[0].memoItemType,
    content: data.content, // 文案内容
    list: JSON.stringify(targetList), // 相册详情
    uid: account.userInfo.openid,
  };

  if (router.params.memoId) {
    updateMemo(listParam as unknown as IMemo);
  } else {
    AddMemo(listParam);
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
