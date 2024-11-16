import type { ComputedRef } from 'vue';
import Taro from '@tarojs/taro';

export interface IPosterData {
  nickname: string;
  tenantName: string;
  avatarUrl: string;
  qrcodeUrl: string;
  picUrls: string[];
}

type IRect = [number, number, number, number]; // => [x, y, w, h]

// 缓存 用户二次渲染优化
const memoImageInfoMap = new Map<string, Taro.getImageInfo.SuccessCallbackResult>();

// 获取远程背景图信息
const getImageInfo = async (src: string) => {
  let memo = memoImageInfoMap.get(src);
  if (!memo) {
    try {
      memo = await Taro.getImageInfo({ src });
      memoImageInfoMap.set(src, memo);
    } catch (e) {
      console.warn('获取图片信息失败，请注意图片地址有效、图片格式正确？', src); // eslint-disable-line no-console
      throw e;
    }
  }
  return memo;
};

const pixelRatio = 2; // 默认2倍图
const POSTER_WIDTH = 326;
const POSTER_HEIGHT = 512;

// 获取裁剪的图片 return [sx,sy,sw,sh]
const getAspectFillRect = (imageWidth: number, imageHeight: number, targetRatio = 1): IRect => {
  const imageRate = imageWidth / imageHeight;
  // eslint-disable-next-line one-var
  let sx: number, sy: number, sw: number, sh: number;
  if (imageRate >= targetRatio) {
    sw = imageHeight * targetRatio;
    sh = imageHeight;
    sx = (imageWidth - sw) / 2;
    sy = 0;
  } else {
    sh = imageWidth / targetRatio;
    sw = imageWidth;
    sx = 0;
    sy = (imageHeight - sh) / 2;
  }
  return [sx, sy, sw, sh];
};

const getTempFilePath = (context: Taro.CanvasContext, canvasId: string): Promise<string> => new Promise((resolve, reject) => {
  context.draw(false, () => {
    Taro.canvasToTempFilePath({
      canvasId,
      fileType: 'png',
      quality: 1,
      width: POSTER_WIDTH * pixelRatio,
      height: POSTER_HEIGHT * pixelRatio,
    }).then(res => {
      resolve(res.tempFilePath);
    }).catch(reject);
  });
});

/**
 * 简单绘制圆角矩形  it‘s like https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
 * **/
// eslint-disable-next-line max-params
const roundRect =  (context: Taro.CanvasContext, x: number, y: number, width: number, height: number, radii: number) => {
  context.beginPath();
  context.moveTo(x + radii, y);
  context.arcTo(x + width, y, x + width, y + height, radii);
  context.arcTo(x + width, y + height, x, y + height, radii);
  context.arcTo(x, y + height, x, y, radii);
  context.arcTo(x, y, x + width, y, radii);
  context.closePath();
};

export const useGeneratePoster = (data: ComputedRef<IPosterData>) => {
  // 生成第一种海报
  const gen0 = async (canvasId: string) => {
    const posterBg = `https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-bg0@${pixelRatio}x.png`;
    const context = Taro.createCanvasContext(canvasId);
    const [avatarImage, qrcodeImage, bgImage, picImage] = await Promise.all([
      getImageInfo(data.value.avatarUrl),
      getImageInfo(data.value.qrcodeUrl),
      getImageInfo(posterBg),
      getImageInfo(data.value.picUrls[0]),
    ]);
    context.drawImage(bgImage.path, 0, 0, POSTER_WIDTH * pixelRatio, POSTER_HEIGHT * pixelRatio);
    context.drawImage(qrcodeImage.path, 209 * pixelRatio, 421 * pixelRatio, 60 * pixelRatio, 60 * pixelRatio);
    context.save();
    roundRect(context, 32 * pixelRatio, 138 * pixelRatio, 261 * pixelRatio, 273 * pixelRatio, 12 * pixelRatio);
    context.clip();
    const selfRect = getAspectFillRect(picImage.width, picImage.height, 1);
    context.drawImage(picImage.path, ...selfRect, 32 * pixelRatio, 138 * pixelRatio, 261 * pixelRatio, 273 * pixelRatio);
    context.restore();
    context.save();
    roundRect(context, 140 * pixelRatio, 35 * pixelRatio, 44 * pixelRatio, 44 * pixelRatio, 22 * pixelRatio);
    context.clip();
    context.drawImage(avatarImage.path, 140 * pixelRatio, 35 * pixelRatio, 44 * pixelRatio, 44 * pixelRatio);
    context.restore();
    context.setFontSize(14 * pixelRatio);
    context.setFillStyle('#333333');
    const { width } = context.measureText(data.value.nickname);
    context.fillText(data.value.nickname, (POSTER_WIDTH * pixelRatio - width) / 2, 100 * pixelRatio);
    return getTempFilePath(context, canvasId);
  };

  // 生成第二种海报
  const gen1 = async (canvasId: string) => {
    const posterBg = `https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-bg1@${pixelRatio}x.png`;
    const goldLabel = `https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-gold-label@${pixelRatio}x.png`;
    const context = Taro.createCanvasContext(canvasId);
    const targetPicUrls = data.value.picUrls.slice(0, 3);
    targetPicUrls[2] = targetPicUrls[2].replace('yunxiaoding-mini/share-poster-default-bg@2x.png', 'yunxiaoding-mini/share-poster-default-bg3@2x.png');
    const [avatarImage, qrcodeImage, bgImage, goldLabelImage, pic3Images] = await Promise.all([
      getImageInfo(data.value.avatarUrl),
      getImageInfo(data.value.qrcodeUrl),
      getImageInfo(posterBg),
      getImageInfo(goldLabel),
      Promise.all(targetPicUrls.map(url => getImageInfo(url))),
    ]);

    context.drawImage(bgImage.path, 0, 0, POSTER_WIDTH * pixelRatio, POSTER_HEIGHT * pixelRatio);
    context.drawImage(qrcodeImage.path, 41 * pixelRatio, 417 * pixelRatio, 50 * pixelRatio, 50 * pixelRatio);
    context.save();
    roundRect(context, 41 * pixelRatio, 49 * pixelRatio, 40 * pixelRatio, 40 * pixelRatio, 20 * pixelRatio);
    context.clip();
    context.drawImage(avatarImage.path, 41 * pixelRatio, 49 * pixelRatio, 40 * pixelRatio, 40 * pixelRatio);
    context.restore();
    // 3 张相册图片位置大小
    const pic3Rect: IRect[] = [
      [41, 128, 118, 118].map(i => i * pixelRatio) as IRect,
      [41, 250, 118, 118].map(i => i * pixelRatio) as IRect,
      [164, 127, 121, 242].map(i => i * pixelRatio) as IRect,
    ];
    pic3Images.forEach((picImage, index) => {
      const picRect = pic3Rect[index];
      context.save();
      roundRect(context, ...picRect, 8 * pixelRatio);
      context.clip();
      const selfRect = getAspectFillRect(picImage.width, picImage.height, picRect[2] / picRect[3]);
      context.drawImage(picImage.path, ...selfRect, ...picRect);
      context.restore();
    });

    context.setFontSize(14 * pixelRatio);
    context.setFillStyle('#333333');
    context.fillText(data.value.nickname, 93 * pixelRatio, 64 * pixelRatio);
    const { width } = context.measureText(data.value.nickname);
    context.drawImage(goldLabelImage.path, (93 + 7) * pixelRatio + width, 51 * pixelRatio, 70 * pixelRatio, 18 * pixelRatio);
    return getTempFilePath(context, canvasId);
  };

  // 生成第三种海报
  const gen2 = async (canvasId: string) => {
    const posterBg = `https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-bg2@${pixelRatio}x.png`;
    const crownLabel = `https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-crown-label@${pixelRatio}x.png`;
    const context = Taro.createCanvasContext(canvasId);
    roundRect(context, 0, 0, POSTER_WIDTH * pixelRatio, POSTER_HEIGHT * pixelRatio, 12 * pixelRatio);
    context.setFillStyle('#FFFFFF');
    context.fill();
    const [qrcodeImage, bgImage, crownLabelImage, pic4Images] = await Promise.all([
      getImageInfo(data.value.qrcodeUrl),
      getImageInfo(posterBg),
      getImageInfo(crownLabel),
      Promise.all(data.value.picUrls.map(url => getImageInfo(url))),
    ]);
    // 4 张相册图片位置大小
    const pic4Rect: IRect[] = [
      [17, 26, 144, 144].map(i => i * pixelRatio) as IRect,
      [165, 26, 144, 144].map(i => i * pixelRatio) as IRect,
      [17, 174, 144, 144].map(i => i * pixelRatio) as IRect,
      [165, 174, 144, 144].map(i => i * pixelRatio) as IRect,
    ];

    pic4Images.forEach((picImage, index) => {
      const picRect = pic4Rect[index];
      context.save();
      roundRect(context, ...picRect, 8 * pixelRatio);
      context.clip();
      const selfRect = getAspectFillRect(picImage.width, picImage.height, 1);
      context.drawImage(picImage.path, ...selfRect, ...picRect);
      context.restore();
    });

    context.drawImage(bgImage.path, -1 * pixelRatio, 302 * pixelRatio, 328 * pixelRatio, 210 * pixelRatio);
    context.drawImage(qrcodeImage.path, 216 * pixelRatio, 405 * pixelRatio, 74 * pixelRatio, 74 * pixelRatio);

    context.setFontSize(32 * pixelRatio);
    context.setFillStyle('#333333');
    context.fillText(data.value.nickname, 20 * pixelRatio, 376 * pixelRatio);
    const { width } = context.measureText(data.value.nickname);
    context.drawImage(crownLabelImage.path, (20 + 15) * pixelRatio + width, 350 * pixelRatio, 40 * pixelRatio, 32 * pixelRatio);

    context.setFontSize(12 * pixelRatio);
    context.fillText(data.value.tenantName, 22 * pixelRatio, 400 * pixelRatio);

    return getTempFilePath(context, canvasId);
  };

  return {
    gen0, gen1, gen2,
  };
};
