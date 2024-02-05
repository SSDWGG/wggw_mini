import Taro, { SelectorQuery, NodesRef, createSelectorQuery } from '@tarojs/taro';


  // 返回一个指定长度的字符串     随机字符串+4位时间戳
export const uuid = (len = 8, radix1 = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const value: string[] = [];
  let i = 0;
  const radix = radix1 || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len-4; i++) {
      value[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    value[8] = value[13] = value[18] = value[23] = '-'; // eslint-disable-line no-multi-assign
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return value.join('')+ new Date().valueOf().toString().slice(9);
};

export const getSizeToPx = (size: number | string): string | 0 => {
  if (String(size).startsWith('0')) return 0;
  if (typeof size === 'number' || /^\d+$/.test(size)) {
    return `${size}px`;
  }
  return size;
};

/***
 * 在 url 尾部添加参数
 * @param {String} url
 * @param {Object} params
 * **/
export const appendQueryParams = (
  url = '',
  params: Record<string, string | number> = {}
): string => {
  const queryParamsString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  if (!queryParamsString) return url;
  if (url.includes('?')) {
    if (url.endsWith('&') || url.endsWith('?')) return url + queryParamsString;
    return `${url}&${queryParamsString}`;
  }
  return `${url}?${queryParamsString}`;
};


// 获取oss视频的预览图片
export const getOSSVideoImg = (fullURL: string) =>
  `${fullURL}?x-oss-process=video/snapshot,t_30,f_jpg,m_fast,ar_auto`;

  
// 复制到剪贴板
export const copyStr = (
  str: string,
  toastParams:Taro.showToast.Option = {
    title: '复制成功',
  },
) => {
  Taro.setClipboardData({
    data: str,
    success: () => {
      Taro.showToast(toastParams);
    },
  });
};


export const formatterLen = (str:string,len=6)=>str.length > len ? str.substring(0, len) : str;

// 指定字符长度，超出展示...或者超长截取
export const changeLongStr = (str: string, len = 15, ellipsis = true) => {
  if (!str) return '';
  const arrStr = Array.from(str);
  return arrStr.length > len ? `${arrStr.slice(0, len).join('')}${ellipsis ? '...' : ''}` : str;
};

export type IQueryResult = NodesRef.BoundingClientRectCallbackResult | NodesRef.ScrollOffsetCallbackResult | NodesRef.ContextCallbackResult;

/***
 * 递归查询 query.exec 直到有结果或超时报错（一般第二次有返回结果）
 * @param {SelectorQuery} query
 * @param {Number} interval
 * @param {Number} timeout
 * **/
export const execSelectQuery = (selectQuery: SelectorQuery, interval = 100, timeout = 5000): Promise<IQueryResult | IQueryResult[]> => {
  const _startTime = Date.now();
  return new Promise((resolve, reject) => {
    const func = () => {
      selectQuery.exec((res) => {
        const result = res[0];
        if (Date.now() - _startTime > timeout) {
          reject(new Error('query time out'));
        } else if (result === null || (Array.isArray(result) && result.length === 0)) {
          setTimeout(func, interval);
        } else {
          resolve(result);
        }
      });
    };
    func();
  });
};
/***
 * 通过 selector 查询单个节点信息
 * **/
export const querySelector = (selector: string, fields: NodesRef.Fields): Promise<IQueryResult> =>
  execSelectQuery(createSelectorQuery().select(selector).fields(fields)) as Promise<IQueryResult>;

/***
 * 通过 selector 查询多个节点信息
 * **/
export const querySelectorAll = (selector: string, fields: NodesRef.Fields): Promise<IQueryResult[]> =>
  execSelectQuery(createSelectorQuery().selectAll(selector).fields(fields)) as Promise<IQueryResult[]>;



// 判断路径中是否包含协议头
export const hasProtocol = (url: string) => url.match(/(https):\/\/([\w.]+\/?)\S*/ig);


// todo：升级成权限限制，权限由admin开通
// 是否显示微信审核内容（返回true表示显示该内容，false为不显示该内容）
export const isPermissions = ()=>  process.env.FIX_ENV === 'nofix'

// 是否是dev状态
export const isDeving = ()=> process.env.NODE_ENV === 'development'
