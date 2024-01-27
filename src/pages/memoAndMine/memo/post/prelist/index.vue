<template>
  <!-- 预览列表(图片、视频，添加按钮) -->
  <view :class="styles.upList">
    <drag v-if="isPostImage" :list-data="listData" :item-height="itemHeight" vibrate style="height: 690rpx"
      @change="onChange" @dragstart="data.isDraging = true" @dragend="data.isDraging = false">
      <template #item="item">
        <view v-if="!item.fixed" class="item-view">
          <view v-if="!data.isDraging" @tap="removeItem(item)">
            <nut-icon name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GHCCAMGL-1706332459221icon-close.png" :size="20" class="close-img"></nut-icon>
          </view>
          <view class="up-list-item">
            <img :src="item.path" mode='aspectFill' />
          </view>
        </view>
        <view v-else-if="data.picList.length < maxChooseCount" class="item-view">
          <view class="up-list-item uploader-button" @tap="handleAdd">
            <nut-icon :name="item.path" :size="35" class="upload-more" />
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
              <nut-icon name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GHCCAMGL-1706332459221icon-close.png" :size="16" class="close-img"></nut-icon>
            </view>
            <video class="up-list-item" :src="picObj.path" :controls="false" :showCenterPlayBtn="false">
              <nut-icon name="https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/vedio-state.png?x-oss-process=image%2Finterlace%2C1%2Fresize%2Cm_mfit%2Cw_50%2Ch_50%2Fquality%2CQ_90" :size="25" class="vedio-state" />
            </video>
          </view>
            <!-- 继续添加按钮 视频限制添加一个，图片限制添加9张-->
            <view v-if="isShowAddButton" class="item-view">
              <view class="up-list-item uploader-button" @tap="handleAdd">
                <nut-icon name="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CDMKFOCD-1706332570146upload-more.png" :size="35" class="upload-more" />
              </view>
            </view>
        </view>
      </view>
    </block>
  </view>
  <my-toast v-model="data.toastVisible" :contentTips="data.contentTips"></my-toast>

</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { Drag } from '@fishui/taro-vue';
import Taro, { useRouter } from '@tarojs/taro';
import ICON_VEDIO_STATE from '@/assets/images/menu/post/vedio-state.png';
import styles from './styles.scss';
import MyToast from '@/components/postFailToast/index.vue';
import { useAccountStore } from '@/stores/account';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { IResult } from '@/components/selectMedia';

type IListItem = IResult & {
  originIndex: number;
  fixed?: boolean;
}

const account = useAccountStore();
const systemInfo = useSystemInfoStore();
const maxChooseCount = 9;
const plusItem: IListItem = { originIndex: -1, fixed: true, type: 'plus', path: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CDMKFOCD-1706332570146upload-more.png' };
const data = reactive({
  picList: [] as IListItem[],
  sortedList: [] as IListItem[],
  toastVisible: false,
  contentTips: '',
  isDraging: false,
});
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

const handleAdd = () => {
  // 调用选择手机相册
  Taro.chooseMedia({
    count: isPostImage ? maxChooseCount - data.picList.length : 1,
    mediaType: [router.params.type as any],
    sourceType: ['album'],
    maxDuration: 30,
    camera: 'back',
    success: ({
      tempFiles,
      type
    }) => {
      // 视频过长增加限制
      if (type === 'video' && tempFiles[0].duration > 30) {
        data.contentTips = '请上传30s内的视频';
        data.toastVisible = true;
        return;
      }
      const addList = tempFiles.map((i, originIndex) => ({ path: i.tempFilePath, type, originIndex }));
      if (isPostImage) {
        data.picList = [...data.sortedList, ...addList].map((item, originIndex) => ({ ...item, originIndex }));
      } else {
        data.picList = addList;
      }
      data.sortedList = data.picList;
    }
  });
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

defineExpose({
  data
});
</script>
