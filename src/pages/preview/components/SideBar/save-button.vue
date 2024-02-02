<template>
  <view class="bar-item" @tap="(e) => handleSaveImage(e)">
    <image class="icon" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FDFLBLFO-1666754577481编组 8@2x.png" />
    保存
  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { useAttrs } from 'vue';
import { IMemo, IMemoItem } from '@/apis/memo/model';

const info = useAttrs().itemInfo as IMemo & IMemoItem;

const pow = () => {
  Taro.openSetting({
    success: () => {
      Taro.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {},
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

/* 图片保存功能 */
const handleSaveImage = (e) => {
  console.log(1111111);

  e.stopPropagation();
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
            url: info.picUrl,
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
</script>
