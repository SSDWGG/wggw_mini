<template>
  <view :class="styles.container">
    <navbar title="上传标的" />
    <view class="body">
      <nut-textarea v-model="data.title" placeholder="请输入标的名称" :auto-focusd="false" rows="2"
        class="post-textarea"></nut-textarea>
      <!-- 文案 -->
      <nut-textarea v-model="data.content" placeholder="请输入标的介绍" :auto-focusd="false" rows="2"
        class="post-textarea"></nut-textarea>

      <!-- 预览列表(图片、视频，添加按钮) -->
      <prelist ref="prelistRef" />
    </view>

    <!-- 发表按钮 -->
    <view class="footer">
      <nut-button block type="primary" class="publish" @tap="handleAddAlbum">发表</nut-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Taro from '@tarojs/taro';
import { TextArea as NutTextarea } from '@nutui/nutui-taro';
import { Navbar } from '@fishui/taro-vue';
import styles from './styles.scss';
import aliossUpload from '@/utils/alioss-upload';
import Prelist from './prelist/index.vue';
import { debounce } from 'lodash';
import { IMemoItem } from '@/apis/memo/model';
import { IResult } from '@/components/selectMedia';
import {
  addKunChart,
} from "@/apis/kunChart";

definePageConfig({
  disableScroll: true
});


const data = reactive({
  content: '',
  title: '',
  saveModule: false,
  modulePopshow: true,
  // 子组件的data
  childDataPicList: [] as IResult[]
});
const prelistRef = ref();

const PasslintContent = () => {
  if (prelistRef.value.data.sortedList.length === 0) {
    Taro.showToast({
      title: '请上传标的图片',
      icon: 'error',
      duration: 2000
    });
    return false;
  } else if (data.content.length === 0) {
    Taro.showToast({
      title: '请输入标的介绍',
      icon: 'error',
      duration: 2000
    });
    return false;
  } else if (data.title.length === 0) {
    Taro.showToast({
      title: '请输入标的名称',
      icon: 'error',
      duration: 2000
    });
    return false;
  }
  return true;
};

const uploadOSS = async () => {
  const picPaths = [] as string[];
  data.childDataPicList = prelistRef.value.data.sortedList;
  // 通过ref拿到子组件picList
  data.childDataPicList.forEach(item => {
    picPaths.push(item.path);
  });

  const resList: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[] = await aliossUpload(picPaths);
  return resList;
};

const addMemoData = async (
  List: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[]
) => {
  const targetList: IMemoItem[] = []

  // 数据格式化存储的内容
  List.forEach((item, index) => {
    targetList.push({
      picUrl: item.fullpath as string,
    });
  });

  await addKunChart({
    title: data.title,
    imgSrc: JSON.stringify(targetList),
    kcDesc: data.content
  })
};

const postHttp = debounce(async () => {

  // 上传oss
  const resList = await uploadOSS();
  // 存储到store中
  await addMemoData(resList);

  Taro.showToast({
    title: '上传成功',
    icon: 'success',
    duration: 2000
  });

  // store.myAlbumList.unshift(item);

  setTimeout(() => {
    Taro.navigateBack();
  }, 1500)
}, 500);

const handleAddAlbum = () => {
  // 校验文案是否填写，校验图片素材是否为空
  if (!PasslintContent()) return false;

  Taro.showLoading({
    title: '上传中',
    mask: true
  });
  postHttp();
  return false;
};

</script>
