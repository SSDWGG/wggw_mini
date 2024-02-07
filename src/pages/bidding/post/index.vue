<template>
  <view :class="styles.container">
    <navbar :title="!!router.params.shopId?'编辑我的标的':'创建我的标的' " />
    <view class="body">
      <nut-textarea v-model="data.title" placeholder="请输入标的名称" :auto-focusd="false" rows="2" class="post-textarea"></nut-textarea>
      <nut-textarea v-model="data.kcDesc" placeholder="请输入标的介绍" :auto-focusd="false" rows="2" class="post-textarea"></nut-textarea>
      <nut-input v-if="!router.params.shopId" v-model="data.price" placeholder="请输入标的初始价格" type="number" class="post-input" />

      <!-- 预览列表(图片、视频，添加按钮) -->
      <prelist ref="prelistRef" />
    </view>

    <!-- 发表按钮 -->
    <view class="footer">
      <nut-button block type="primary" class="publish" @tap="handleAddAlbum">{{ !!router.params.shopId ? '确认修改' : '发布' }}</nut-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import styles from './styles.scss';
import Prelist from '@/components/postPreList/index.vue';
import { debounce } from 'lodash';
import { IResult } from '@/components/selectMedia';
import { addKunChart, addKunChartLine, updateKunChart } from '@/apis/kunChart';
import { IBiddingItem } from '@/apis/kunChart/model';
import { useAccountStore } from '@/stores/account';
import { useRouter, useUnload } from '@tarojs/taro';

definePageConfig({
  disableScroll: true,
});
const router = useRouter();

const account = useAccountStore();

const data = reactive({
  price: '',
  kcDesc: '',
  title: '',
  saveModule: false,
  modulePopshow: true,
  // 子组件的data
  childDataPicList: [] as IResult[],
});
const prelistRef = ref();

// 编辑逻辑
if (!!router.params.shopId) {
  data.kcDesc = account.editBinddingData.kcDesc;
  data.title = account.editBinddingData.title;
  account.templeChoosePostList = (account.editBinddingData.imgSrc as any).map((item) => {
    return {
      path: item.picUrl,
      type: 'image',
    };
  });
}

const PasslintContent = () => {
  if (prelistRef.value.data.sortedList.length === 0) {
    Taro.showToast({
      title: '请上传标的图片',
      icon: 'error',
      duration: 2000,
    });
    return false;
  } else if (data.kcDesc.length === 0) {
    Taro.showToast({
      title: '请输入标的介绍',
      icon: 'error',
      duration: 2000,
    });
    return false;
  } else if (data.title.length === 0) {
    Taro.showToast({
      title: '请输入标的名称',
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

  if (!!router.params.shopId) {
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
      price: data.price || "0",
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
    title: '上传中',
    mask: true,
  });
  postHttp();
  return false;
};

useUnload(() => {
  account.editBinddingData = {} as IBiddingItem;
});
</script>
