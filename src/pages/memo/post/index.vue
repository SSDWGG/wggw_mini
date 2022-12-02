<template>
  <view :class="styles.container">
    <navbar title="上传至备忘录" />
    <view class="body">
      <!-- 文案 -->
      <nut-textarea v-model="data.content" placeholder="这一刻的想法…" :auto-focusd="false" rows="2"
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
import { Navbar } from 'mini-ui';
import styles from './styles.scss';
import aliossUpload from '@/utils/alioss-upload';
import Prelist from './prelist/index.vue';
import { debounce } from 'lodash';
import { getOSSVideoImg, uuid } from '@/utils/index';
import { IMemo, IMemoItem } from '@/apis/memo/model';
import { useAccountStore } from '@/stores/account';
import { IResult } from '@/components/selectMedia';


definePageConfig({
  disableScroll: true
});

const account = useAccountStore();

const data = reactive({
  content: '',
  saveModule: false,
  modulePopshow: true,
  // 子组件的data
  childDataPicList: [] as IResult[]
});
const prelistRef = ref();

const PasslintContent = () => {
  if (prelistRef.value.data.sortedList.length === 0) {
    Taro.showToast({
      title: '请选择素材',
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
  let listParam: IMemo = {} as IMemo;
  const targetList:IMemoItem[] = [] 
  const time = (new Date()).valueOf()+''

  // 数据格式化存储的内容
  List.forEach((item, index) => {
    targetList.push({
      memoItemType: data.childDataPicList[index].type === 'image'
          ? 0
          : 1,
      picUrl: item.fullpath as string,
      sort: index,
      // 封面默认取第30帧内容
      videoPicUrl:
        data.childDataPicList[index].type === 'image'
          ? ''
          : getOSSVideoImg(item.fullpath as string),
      memoResId: item.name,
      gmtCreate: time,
      gmtModified: time,
    });
  });
listParam = {
  memoType:
  targetList.length===0?2:targetList[0].memoItemType,
  content: data.content, // 文案内容
  gmtCreate: time,
  gmtModified: time,
  memoId: uuid(),
  list: targetList, // 相册详情
}

// 更新store
account.memoDataList.unshift(listParam)
// 更新storage
account.setStorage(account.$state)

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
    title: '发布中',
    mask: true
  });
  postHttp();
  return false;
};
</script>
