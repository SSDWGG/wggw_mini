<template>
  <!-- 预览列表(图片、视频，添加按钮) -->
  <view :class="styles.upList">
    <drag v-if="isPostImage" :list-data="listData" :item-height="itemHeight" vibrate style="height: 690rpx"
      @change="onChange" @dragstart="data.isDraging = true" @dragend="data.isDraging = false">
      <template #item="item">
        <view v-if="!item.fixed" class="item-view">
          <view v-if="!data.isDraging" @tap="removeItem(item)">
            <IconFont
              name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GHCCAMGL-1706332459221icon-close.png"
              :size="20" class="close-img"></IconFont>
          </view>
          <view class="up-list-item">
            <img :src="item.path" mode='aspectFill' />
          </view>
        </view>
        <view v-else-if="data.picList.length < maxChooseCount" class="item-view">
          <view class="up-list-item uploader-button" @tap="handleAdd">
            <IconFont :name="item.path" :size="35" class="upload-more" />
          </view>
        </view>
      </template>
    </drag>

    <!-- 视频 视频总是一个 不需要拖拽排序 -->
    <block v-else>
      <view class="vedioDiv">
        <view class="vedioDiv-item">
          <view v-for="(picObj, index) in data.picList" :key="index" class="item-view">
            <view @tap="removeItem(picObj)">
              <IconFont
                name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GHCCAMGL-1706332459221icon-close.png"
                :size="16" class="close-img"></IconFont>
            </view>
            <video class="up-list-item" :src="picObj.path" :controls="false" :showCenterPlayBtn="false">
              <IconFont
                name="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/other/wggw/vedio-state.png?x-oss-process=image%2Finterlace%2C1%2Fresize%2Cm_mfit%2Cw_50%2Ch_50%2Fquality%2CQ_90"
                :size="25" class="vedio-state" />
            </video>
          </view>
          <!-- 继续添加按钮 视频限制添加一个，图片限制添加9张-->
          <view v-if="isShowAddButton" class="item-view">
            <view class="up-list-item uploader-button" @tap="handleAdd">
              <IconFont
                name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CDMKFOCD-1706332570146upload-more.png"
                :size="35" class="upload-more" />
            </view>
          </view>
        </view>
      </view>
    </block>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { Drag } from '@fishui/taro-vue';
import { useRouter, useUnload } from '@tarojs/taro';
// @ts-ignore
import styles from './styles.scss';
import { useAccountStore } from '@/stores/account';
import { useSystemInfoStore } from '@/stores/systemInfo';
import type { IResult } from '@/components/selectMedia';
import selectMedia from '@/components/selectMedia';
import myToastComponents from '@/components/myToast/index.vue';
import { hasProtocol, uuid } from '@/utils/index';
import aliossUpload from '@/utils/alioss-upload';

type IListItem = IResult & {
  originIndex: number;
  fixed?: boolean;
}

const account = useAccountStore();
const systemInfo = useSystemInfoStore();
const maxChooseCount = 9;
const plusItem: IListItem = { originIndex: -1, fixed: true, type: 'plus', path: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CDMKFOCD-1706332570146upload-more.png' };
const data = reactive({
  picList: [] as IListItem[],
  sortedList: [] as IListItem[],
  isDraging: false,
});
const myToast = ref<any>();
const listData = computed(() => [...data.picList, plusItem]);
const router = useRouter();
const isPostImage = router.params.type === 'image';
// 小程序偶现url参数无法传递（可能是参数过长）
const list: IListItem[] = account.templeChoosePostList.map((i, originIndex) => ({ ...i, originIndex, fixed: false }));
data.picList = list;
data.sortedList = list;
// 30 => wrap margin: 0 15px
const itemHeight = computed(() => (systemInfo.windowWidth - 30) / 3);

// 计算是否可以继续添加
const isShowAddButton = computed(() => {
  if (data.picList.length < 1) return true;
  else if (data.picList.length >= 1 && data.picList.length < maxChooseCount) {
    // 判断是图片还是视屏，图片允许继续添加
    return data.picList[0].type === 'image' ? true : false;
  } else if (data.picList.length >= maxChooseCount) return false;

  return true;
});

const handleAdd = async () => {
  try {
    const tempFiles = await selectMedia(router.params.type as any);
    const addList = (tempFiles as IResult[]).map((i, originIndex) => ({ path: i.path, type: i.type, originIndex }));
    if (isPostImage) {
      data.picList = [...data.sortedList, ...addList].map((item, originIndex) => ({ ...item, originIndex }));
    } else {
      data.picList = addList;
    }
    data.sortedList = data.picList;
  } catch (err) {
    myToast.value.myToastShow({
      icon: 'error',
      title: err.contentTips,
      duration: 2000,
    });
  }
};

const onChange = (sorted) => {
  sorted.pop();
  data.sortedList = sorted;
};

const removeItem = (item) => {
  const sortedIndex = data.sortedList.findIndex(v => v.originIndex === item.originIndex);
  data.sortedList.splice(sortedIndex, 1);
  data.picList = data.sortedList.map((v, originIndex) => ({
    ...v,
    originIndex
  }));
  data.sortedList = data.picList;
};

const uploadOSS = async () => {
  const picPaths = [] as string[];
  const resList: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[] = [];

  // 通过ref拿到子组件picList
  data.sortedList.forEach((item) => {
    picPaths.push(item.path);
  });

  // 校验是否是https图片，上传http图片，https图片包装返回（https图片无法直接上传会报错）
  for await (const [index,picPathItem]  of picPaths.entries()){
    if (hasProtocol(picPathItem)) {
      // https包装
      resList[index] = {
        status: 200,
        name: uuid(),
        path: picPathItem,
        fullpath: picPathItem,
        hash: uuid(),
      };
    } else {
      // 非https上传
      const uploadResList: {
        status: number;
        name: string;
        path?: string;
        fullpath?: string;
        hash?: string;
      }[] = await aliossUpload([picPathItem]);
      resList[index] = uploadResList[0];
    }
  }

  return resList;
};

useUnload(() => {
  account.templeChoosePostList = [];
});

defineExpose({
  data,
  uploadOSS
});
</script>
