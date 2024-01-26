import { Image, ImageProps } from '@tarojs/components';
import { cdnHost } from '@/utils/env';
import { appendQueryParams } from '@/utils/index';
// @ts-ignore
import placeholder from './image-placeholder.png';
/**
 * 图片处理文档 https://help.aliyun.com/document_detail/144582.html
 * props src 转化示例：
 * 可自行添加过 x-oss-process=image 参数将不追加处理
 * 完整URL: http://cdn.example.com/a.jpg => http://cdn.example.com/a.jpg?x-oss-process=image...
 * 图片名字：imagename => http://cdn.example.com/imagename?x-oss-process=image...
 * @param src 
*/
interface IProps extends ImageProps {
  quality?: number; // 设置图片的绝对质量Q [1,100]
  width?: number; // 指定目标缩放图的宽度 这里*2 作二倍图
  height?: number; // 指定目标缩放图的高度 这里*2 作二倍图
  sourceMode?: 'lfit'|'mfit'|'fill'|'pad'|'fixed'; // 指定缩放的模式 default mfit
  interlace?: 0|1; // 渐进显示
  origin?: boolean; // 原生 src，不做转化
  class?:any
}

const defaultProps: IProps = {
  src: '',
  quality: 90,
  width: 120,
  height: 120,
  sourceMode: 'mfit',
  interlace: 1,
  mode: 'aspectFill',
  lazyLoad: true,
  origin: false,
};

export default (props: IProps) => {
  const {
    quality,
    width = 120,
    height = 120,
    sourceMode,
    interlace,
    src,
    origin,
    ...imgProps
  } = {
    ...defaultProps,
    ...props,
  };

  const getImageURL = (): string => {
    if (!src) return placeholder;
    if (origin) return src;
    const url = src.startsWith('http') ? src : `${cdnHost}/${src}`;
    if (url.includes('x-oss-process=image')) {
      return url;
    }
    // 如果没有处理过图片，将拼接图片处理参数
    return appendQueryParams(url, {
      'x-oss-process': `image/interlace,${interlace}/resize,m_${sourceMode},w_${width*2},h_${height*2}/quality,Q_${quality}`,
    });
  };

  const url = getImageURL();

  return (
    <Image
      {...imgProps}
      src={url}
    />
  );
};