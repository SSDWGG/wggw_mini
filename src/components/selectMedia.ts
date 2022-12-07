/* eslint-disable prefer-promise-reject-errors */
import Taro from '@tarojs/taro';
import aliossUpload from '@/utils/alioss-upload';
// 因为ui库中的toast无法函数式调用，选择视频抛出的异常需要处理

export type IMediaType = 'image' | 'video' | 'mix';
export interface IResult {
  /**
   * 合并 Taro.chooseMedia.ChooseMedia | Taro.chooseMessageFile.ChooseFile
   * 后续如果需要更多参数，再添加 做兼容
   **/
  path: string;
  type: string; // Exclude<IMediaType, 'mix'>

  // 应当返回或者接受的是兼容两种api的共同属性
  // thumbTempFilePath?:string; // 视频缩略图 chooseMessageFile中无该属性  不可取
  // duration?:number; // 视频时长 chooseMessageFile中无该属性  不可取
}
export interface IFailResult {
  title: string,
  contentTips: string,
  duration: number
}

const toast = (title: string) =>
  Taro.showToast({
    title,
    icon: 'error',
    duration: 2000
  });

export const selectMedia = (mediaType: IMediaType,maxCount = 9): Promise<IResult[] | IFailResult> => {
  // const maxCount = 9; // 最多可以选择的文件个数
  return new Promise((resolve, reject) => {
    // 视频只能选1个
    const mediaCallback = ({
      tempFiles,
      type
    }: Taro.chooseMedia.SuccessCallbackResult) => {
      // if (type === 'video' && tempFiles[0].duration > 30) {
      //   reject({
      //     title: '上传失败',
      //     contentTips: '请上传30s内的视频',
      //     duration: 3500
      //   });

      // }
      resolve(tempFiles.map(i => ({ path: i.tempFilePath, type })));
    };

    const messageFileCallback = ({
      tempFiles
    }: Taro.chooseMessageFile.SuccessCallbackResult) => {
      const firstFileType = tempFiles[0].type;
      // 文件类型为 mix 时
      if (mediaType === 'mix') {
        // 判断文件只能选择视频或者图片：SelectedType 值为 file: 选择了除图片和视频的文件
        if (tempFiles.some(item => item.type === 'file')) {
          toast('请选视频或图片');
          return;
        }
        // 格式不能混选，视频图片强制只选择一种（ chooseMedia api 会自动限制混选）
        if (tempFiles.some(item => item.type !== firstFileType)) {
          toast('格式不能混选');
          return;
        }
      }
      // 视频只能选1个
      if (firstFileType === 'video' && tempFiles.length > 1) {
        toast('视频只能选1个');
        return;
      }
      // 此处无法取到视频时长，需要在产品侧做额外逻辑判断
      // if (tempFiles[0].type === 'video' && tempFiles[0].size > 31457280) {
      //   // eslint-disable-next-line prefer-promise-reject-errors
      //   reject({
      //     title: '上传失败',
      //     contentTips: '请上传10M内的视频',
      //     duration: 3500
      //   });

      // }


      resolve(tempFiles);
    };

    // eslint-disable-next-line no-undef
    const onFailed = (error: TaroGeneral.CallbackResult) => {
      // eslint-disable-line no-undef
      if (error.errMsg.endsWith('cancel')) {
        console.warn('用户取消了', error.errMsg); // eslint-disable-line no-console
      } else {
        reject(error);
      }
    };

    Taro.showActionSheet({
      itemList:
        mediaType === 'video'
          ? ['拍摄', '从手机视频选择', '从聊天文件选择']
          : ['拍照', '从手机相册选择', '从聊天文件选择'],
      success: res => {
        switch (res.tapIndex) {
          case 0:
            // 调用选择拍摄
            Taro.chooseMedia({
              count: mediaType === 'video' ? 1 : maxCount,
              mediaType: mediaType === 'mix' ? ['image', 'video'] : [mediaType],
              sourceType: ['camera'],
              maxDuration: 30,
              camera: 'back',
              success: mediaCallback,
              fail: onFailed
            });
            break;
          case 1:
            // 调用选择手机相册
            Taro.chooseMedia({
              count: mediaType === 'video' ? 1 : maxCount,
              mediaType: mediaType === 'mix' ? ['image', 'video'] : [mediaType],
              sourceType: ['album'],
              maxDuration: 30,
              camera: 'back',
              success: mediaCallback,
              fail: onFailed
            });
            break;
          case 2:
            // 调用选择聊天框图片,做遍历筛选，排除视频图片共选的情况
            Taro.chooseMessageFile({
              count: mediaType === 'video' ? 1 : maxCount,
              type: mediaType === 'mix' ? 'all' : mediaType,
              success: messageFileCallback,
              fail: onFailed
            });
            break;
          default:
        }
      }
    }).catch(onFailed); // showActionSheet must use catch
  });
};

export default selectMedia;

// 返回数组表示组件选择成功，返回对象表示失败信息
export const selectMediaAndUpload  = (mediaType: IMediaType) =>
    selectMedia(mediaType)
      .then(res => aliossUpload((res as IResult[]).map(i => i.path)))
      .catch((err) => err);
