<template>
  <view v-if="isPermissionsToWx()" :class="styles.container">
    <myNavBar :title="!!router.params.cCdId ? '编辑菜谱' : '创建菜谱'" />
    <view class="body">
      <!-- 文案 -->
      <nut-textarea
        disabled
        placeholder="tips: 1.最后一张图片会被作为菜品主图进行展示，您可以长按图片进行图片顺序调整。2.一次上传最多可以选择9张图片"
        :auto-focusd="false"
        rows="2"
        class="post-textarea"
      ></nut-textarea>
      <nut-textarea v-model="data.catName" placeholder="请输入菜品名称" :auto-focusd="false" rows="2" class="post-textarea"></nut-textarea>
      <!-- 预览列表(图片、视频，添加按钮) -->
      <prelist ref="prelistRef" />
    </view>

    <!-- 发表按钮 -->
    <view class="footer">
      <nut-button block type="primary" class="publish" @tap="handleAddAlbum">{{ !!router.params.cCdId ? '确认修改' : '发表' }}</nut-button>
    </view>
  </view>
  <view v-else :class="styles.emptyContainer">
    <myNavBar title="感谢关注" />
    <view class="empty"> 感谢您的关注，该功能暂未开启 </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro, { useDidShow } from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import Prelist from '@/components/postPreList/index.vue';
import { debounce } from 'lodash';
import { useAccountStore } from '@/stores/account';
import type { IResult } from '@/components/selectMedia';
import { useRouter } from '@tarojs/taro';
import { isPermissionsToWx } from '@/utils/index';
import { addCmenu, getCmenuByCid, updateCmenu } from '@/apis/orderMenu';

definePageConfig({
  disableScroll: true,
});
const router = useRouter();

const account = useAccountStore();

const data = reactive({
  catName: '',
  saveModule: false,
  modulePopshow: true,
  // 子组件的data
  childDataPicList: [] as IResult[],
});
const prelistRef = ref();

const editPost = async () => {
  const res = await getCmenuByCid(router.params.cCdId ?? '');
  data.catName = res[0].catName;
  account.templeChoosePostList = JSON.parse(res[0].content).map((item) => ({
    path: item.picUrl,
    type: 'image',
  }));
};

const PasslintContent = () => {
  if (prelistRef.value.data.sortedList.length === 0) {
    Taro.showToast({
      title: '请选择素材',
      icon: 'error',
      duration: 2000,
    });
    return false;
  }
  if (!data.catName) {
    Taro.showToast({
      title: '请输入菜品名称',
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
    fullpath: string;
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
  // 编辑逻辑
  if (router.params.cCdId) {
    const cMenuList = await getCmenuByCid(router.params.cCdId);
    cMenuList[0].backImg = List[0].fullpath;
    cMenuList[0].catName = data.catName;
    cMenuList[0].content = JSON.stringify(targetList);
    await updateCmenu(cMenuList[0]);
  } else {
    await addCmenu({
      backImg: List[0].fullpath,
      secondCdId: router.params.secondCdId ?? '',
      catName: data.catName,
      content: JSON.stringify(targetList),
      openid: account.userInfo.openid,
    });
  }

  setTimeout(() => {
    Taro.navigateBack();
  }, 1500);
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

useDidShow(async () => {
  await account.login();
  // 编辑逻辑
  if (router.params.cCdId) {
    editPost();
  }
});
</script>
