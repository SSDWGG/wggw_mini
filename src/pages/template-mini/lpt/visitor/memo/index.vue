<template>
  <view :class="styles.myContainer">
    <scroll-view v-if="account.vistorDataList.length > 0" scroll-y="true" class="scrollList" @scroll="onScroll">
      <view v-if="pageDate.isCheck" class="mainContent">


        <view v-for="(item, index) in account.vistorDataList" :key="index" class="resourceListItem2"
          @tap="handleClickImg(item)">
          <!-- 判断是图片还是视屏，展示封面图 -->
          <image mode="aspectFit" :src="ossImgHostLpt + item.pic + ossImgLowQualityParamsLpt" class="pic" lazyLoad />
          <view v-show="pageDate.isCheck" :class="[
            'mpm_check',
            {
              mpm_check__checked: item.check,
            },
          ]" />
        </view>

      </view>
      <view v-else>


        <view v-for="(item, index) in account.vistorDataList" :key="index" class="memoDataList">
          <view class="item">
            <view v-if="!!item.TimeLineList" class="aside">
              <view class="day">
                {{ item.TimeLineList[0] }}
              </view>
              <view class="mouse">
                {{ item.TimeLineList[1] }}
              </view>
            </view>
            <view class="main">
              <view class="content">{{ item.content }}</view>
              <view class="resourceList">
                <view class="resourceListItem" @tap="handleClickImg(item)">
                  <!-- 判断是图片还是视屏，展示封面图 -->
                  <image mode="aspectFit" :src="ossImgHostLpt + item.pic + ossImgLowQualityParamsLpt" class="pic" lazyLoad />

                </view>

              </view>
              <view class="bottomInfo">
                <view class="item">拍摄景点：{{ changeLongStr(item.sceneryName, 22) }}</view>
                <view class="item">摄影师：{{ changeLongStr(item.verificationUsername, 22) }}</view>
                <view class="item">订单号：{{ changeLongStr(item.orderNumber, 22) }}</view>
                <view class="item">所属用户：{{ changeLongStr(item.username, 22) }}</view>
                <view class="item"> 上传时间： {{ timeFormat(item.uploadTime) }}</view>
              </view>
              <view class="bottom">
                <view class="time">
                  {{ timeFormat(item.uploadTime) }}
                </view>
                <view class="op">
                  <view class="opItem delete" @tap="deleteMemo(item.id)">删除</view>
                </view>
              </view>
            </view>
          </view>
        </view>

      </view>

    </scroll-view>
    <view v-else class="defaultBox">
      <view class="img">
        <image :src="defaultIcon"></image>
      </view>
      <view class="img tips">您暂无资源哦~</view>
    </view>
    <view class="safeBottom">
    </view>

    <view v-show="pageDate.isCheck" class="bottomCZL">
      <nut-button type="primary" class="downloadNow" @tap="downlaodALLCheckImgs">立即下载</nut-button>
    </view>
  </view>
  <side-bar :show="show" :showFlags="[11]" :onDownloadAll="handleDownloadAll" />
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import SideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useAccountStore } from '@/stores/account';
import Taro, { useDidShow } from '@tarojs/taro';
import { timelineFormat, timeFormat } from '@/utils/date';
import { ossImgHostLpt, ossImgLowQualityParamsLpt } from '@/utils/env';
import myToastComponents from '@/components/myToast/index.vue';
import { ref, reactive } from 'vue';
import defaultIcon from '../../img/default1.png';
import { debounce } from 'lodash';
import { changeLongStr } from '@/utils/index';
import { getSceneryPic, deleteSceneryPic } from '@/apis/lpt/photographer';
import { getUserInfo } from '@/apis/lpt/mine';


const myToast = ref<any>();

const account = useAccountStore();

const { show, onScroll } = useListScroll();

const initData = async () => {
  const resUserInfo = await getUserInfo();

  const picList = await getSceneryPic({
    current: 0,
    size: 100,
    userId: resUserInfo.userId
  });
  picList.records.forEach((item, index, arr) => {
    const beforeItemTime = arr[index - 1]
      ? timelineFormat(arr[index - 1].uploadTime)
      : [];
    const nowItemTime = timelineFormat(item.uploadTime);
    if (
      beforeItemTime[0] === nowItemTime[0] &&
      beforeItemTime[1] === nowItemTime[1]
    ) {
      item.TimeLineList = [];
    } else {
      item.TimeLineList = nowItemTime;
    }
  });
  account.vistorDataList = picList.records;
};

const pageDate = reactive({
  isCheck: false
});

const handleClickImg = (item) => {
  if (pageDate.isCheck) {
    item.check = !item.check;

  } else {
    toPreview(item.id);
  }
};

const toPreview = (detailId: string) => {
  Taro.navigateTo({ url: `/pages/template-mini/lpt/preview/index?detailId=${detailId}` });
};

const deleteMemo = (id) => {
  Taro.showModal({
    content: '确定删除该条记录？',
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    confirmText: '删除',
    success: async (res) => {
      if (res.confirm) {
        await deleteSceneryPic(id);
        myToast.value.myToastShow({
          icon: 'success',
          title: '删除成功~',
          duration: 2000,
        });
        initData();
      }
    },
  });
};

const handleDownloadAll = (showCheck: boolean) => {
  pageDate.isCheck = showCheck;
  if (showCheck === false) {
    account.vistorDataList.forEach(item => {
      item.check = false;
    });
  }
};

useDidShow(() => {
  initData();
});


// 下载保存授权
const pow = () => {
  Taro.openSetting({
    success: () => {
      Taro.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => { },
        fail: () => {
          setTimeout(() => {
            Taro.hideLoading();
            Taro.showToast({
              title: '授权失败',
              icon: 'none',
            });
          }, 600);
        },
      });
    },
  });
};

// 下载保存
const handleSaveImage = (picPath) => {
  // wx.openSetting无法通过回调调用，只能主动触发
  Taro.getSetting({
    success: () => {
      Taro.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {
          Taro.showToast({
            title: '正在下载中...',
            icon: 'none',
          });
          Taro.downloadFile({
            // 下载文件资源到本地，客户端直接发起一个HTTP GET 请求，返回文件的本地临时路径
            url: picPath,
            success: (res) => {
              if (!/\.(jpg|jpeg|png|gif|GIF|JPG|PNG)$/.test(res.tempFilePath)) {
                Taro.saveVideoToPhotosAlbum({
                  filePath: res.tempFilePath, // 返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: () => {
                    Taro.showToast({
                      title: '保存成功',
                      icon: 'none',
                    });
                    setTimeout(() => {
                      Taro.hideLoading();
                    }, 600);
                  },
                  fail: () => {
                    setTimeout(() => {
                      Taro.hideLoading();
                      Taro.showToast({
                        title: '保存失败',
                        icon: 'none',
                      });
                    }, 600);
                  },
                });
              } else {
                Taro.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath, // 返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: () => {
                    Taro.showToast({
                      title: '保存成功',
                      icon: 'none',
                    });
                    setTimeout(() => {
                      Taro.hideLoading();
                    }, 600);
                  },
                  fail: () => {
                    setTimeout(() => {
                      Taro.hideLoading();
                      Taro.showToast({
                        title: '保存失败',
                        icon: 'none',
                      });
                    }, 600);
                  },
                });
              }
            },
            fail: () => {
              setTimeout(() => {
                Taro.hideLoading();
                Taro.showToast({
                  title: '保存到相册失败',
                  icon: 'none',
                });
              }, 600);
            },
          });
        },
        fail: () => {
          setTimeout(() => {
            Taro.hideLoading();
            Taro.showModal({
              title: '提示',
              content: '需要获取相册访问权限，请到小程序设置页面打开授权',
              confirmColor: '#7468F2 ',
              confirmText: '确定',
              success: (res) => {
                !!res.confirm && pow();
              },
            });
          }, 600);
        },
      });
      // :pow();
    },
    fail: () => {
      setTimeout(() => {
        Taro.hideLoading();
        Taro.showToast({
          title: '保存到相册失败',
          icon: 'none',
        });
      }, 600);
    },
  });
};

const downlaodALLCheckImgs = debounce(() => {


  account.vistorDataList.forEach(item => {
    if (item.check === true) {
      handleSaveImage(ossImgHostLpt + item.pic);
      // item.check = false;
    }
  });
}, 3000, { leading: true, trailing: false });

</script>
