/**
 * 封装好的阿里上传模块,未使用切片上传
 */
import dayjs from 'dayjs';
import { uuid } from './index';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import Taro from '@tarojs/taro';

// 获取文件后缀名
function getExtName(filePath) {
  const matched = filePath.match(/.*\.(.*)/);
  return matched ? matched[1] : null;
}
const uploadFile = function(path, hasStatus, hash = '') {
  console.log(path);
  
  const cdnHost = 'https://panshi-on.meipingmi.com.cn'
  // 自定义生成的文件名
  const name = uuid();

  const filePath = `yunxiaoding-mini/account/${dayjs().format('YYYY-MM-DD')}/${name}.${getExtName(path)}`;

  return Taro.uploadFile({
    url: `${cdnHost}/`,
    filePath: path,
    name: 'file',
    timeout: 6000000, // 超时不在全局配置
    formData: {
      key: filePath,
      OSSAccessKeyId: 'LTAIa2dE04R5knjA', // oss accesskey
      policy:
        // eslint-disable-next-line max-len
        'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMlQxNzowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==', // 策略
      signature: 'eHCOz2eHMdmNGu38NF0WBaScFxE=', // 签名
      // eslint-disable-next-line camelcase
      success_action_status: '200' // 成功上传时，返回状态码为200
    }
  }).then(res => {
    console.log('upload [res]', res);

    // 不能判断errMsg，上传返回的都会是ok，需要通过判断状态码为200
    if (Number(res.statusCode) === 200) {
      return {
        status: 'success',
        name,
        path: `/${filePath}`,
        fullpath: `${cdnHost}/${filePath}`,
        hash
      };
    } else {
      return hasStatus
        ? {
            status: 'fail',
            name
          }
        : Promise.reject(res);
    }
  });
};

const DEFAULT_OPTIONS = {
  deduplicate: false,
  hasStatus: false
};

/**
 * 阿里云文件上传文件
 * 如果上传失败，则抛出错误,
 *
 * @param filePath
 * @returns {Promise<unknown>}
 */
function aliossUpload(options = {}) {
  let mutatedOptions;

  if (isArray(options)) {
    mutatedOptions = {
      ...DEFAULT_OPTIONS,
      path: options
    };
  } else if (isString(options)) {
    mutatedOptions = {
      ...DEFAULT_OPTIONS,
      path: [options]
    };
  } else {
    mutatedOptions = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  const { path, deduplicate, hasStatus } = mutatedOptions;

  // 如果需要排重
  if (deduplicate) {
    const getFileInfoPromiseAll = path.map(filePath =>
      Taro.getFileInfo({
        filePath
      })
    );

    return Promise.all(getFileInfoPromiseAll).then(fileInfoList => {
      const pickedDigest: any[] = [];
      const pickedIndex: number[] = [];

      fileInfoList.forEach((fileInfoItem, index) => {
        if (pickedDigest.indexOf(fileInfoItem.digest) === -1) {
          pickedDigest.push(fileInfoItem.digest);
          pickedIndex.push(index);
        }
      });

      const uploadPromiseAll = path
        .filter((_pathItem, index) => pickedIndex.indexOf(index) >= 0)
        .map((filePath, index) =>
          uploadFile(filePath, hasStatus, pickedDigest[index])
        );

      return Promise.all(uploadPromiseAll).then(uploadList => {
        // 没有重复项
        if (pickedDigest.length !== fileInfoList.length) {
          Taro.showToast({
            title: '部分图片已存在，已自动过滤',
            icon: 'none',
            duration: 2000,
          });
        }

        return uploadList;
      });
    });
  } else {
    const uploadPromiseAll: Promise<{
      status: string;
      name: string;
      path?: undefined;
      fullpath?: undefined;
      hash?: undefined;
    }>[] = path.map(filePath => uploadFile(filePath, hasStatus));

    return Promise.all(uploadPromiseAll);
  }
}

export default aliossUpload;
