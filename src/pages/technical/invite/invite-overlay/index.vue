<template>
  <nut-overlay v-model:visible="data.show" :z-index="2000" :close-on-click-overlay="false">
    <view :class="styles.wrapper">
      <view class="content">
        <canvas v-if="!data.imgPath" style="width: 287px; height: 516px; margin: auto" canvas-id="mycanvas" class="bg" />
        <image v-else :src="data.imgPath" class="bg" show-menu-by-longpress="true" />
        <IconFont name="loading1" class="loadingIcon" />
        <view class="tips">长按图片，可直接发送给好友</view>
        <view class="close">
          <image
            src="@/assets/images/project/close.png"
            @tap="closePopup"
          />
        </view>
      </view>
    </view>
  </nut-overlay>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { reactive, watch } from 'vue';
import Taro from '@tarojs/taro';

const props = defineProps({
  overlayShow: {
    type: Boolean,
    default: true,
  },
  imgPath: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);


const data = reactive({
  show: props.overlayShow,
  imgPath: '',
});
watch(
  () => props.overlayShow,
  (newVal) => {
    data.show = newVal;
  },
);
const closePopup = () => {
  emit('close', false);
};

const getBGImg = (qrCodeUrl: string) => {
  // 拉取图片流无法拉取svg图片
  const BGpath = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DGMIFOGK-1671010156749f.png';
  const QRPath = qrCodeUrl;
  const AvatarPath = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg';

  Taro.getImageInfo({
    src: BGpath,
    success: function (BGpathRes) {

      Taro.getImageInfo({
        src: QRPath,
        success: function (QRPathRes) {

          Taro.getImageInfo({
            src: AvatarPath,
            success: function (AvatarPathRes) {

              const context = Taro.createCanvasContext('mycanvas');
              context.drawImage(BGpathRes.path, 0, 0, 287, 516);
              // context.drawImage(QRPathRes.path, 104, 368, 78, 78);
              context.drawImage(QRPathRes.path, 107, 399, 73, 73);
              // 头像背景填充
              context.setFillStyle('#EEEEEE');
              // 规划裁剪区域
              context.arc(32, 32, 14, 0, 2 * Math.PI);
              context.clip();
              context.fill();
              context.drawImage(AvatarPathRes.path, 16, 16, 32, 32);
              // 画笔方法是异步的
              context.draw();
              // 将生成好的图片保存到本地
              setTimeout(() => {
                Taro.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  success:  function (res) {
                    data.imgPath = res.tempFilePath;
                  },
                  fail: function (res) {
                    console.log(res);
                  },
                });
              }, 200);
            },
          });
        },
      });
    },
    fail: (err) => {
      console.log('拉取图片失败', err);
    },
  });
};

const initShareImg =  () => {
  const pathObjRes = {
    backGroundUrl:'',
    qrCodeUrl:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DGMIFOGK-1671010156749f.png'
  };
  if (pathObjRes.backGroundUrl) {
    data.imgPath = pathObjRes.backGroundUrl;
  } else {
    getBGImg('https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/LIMEPFJB-1731722201729wechat.jpg');
  }
};
initShareImg();
</script>
