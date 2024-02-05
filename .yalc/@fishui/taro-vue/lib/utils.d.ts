import { SelectorQuery, NodesRef } from '@tarojs/taro';
export declare type IQueryResult = NodesRef.BoundingClientRectCallbackResult | NodesRef.ScrollOffsetCallbackResult | NodesRef.ContextCallbackResult;
/***
 * 递归查询 query.exec 直到有结果或超时报错（第一次可能无法获取到）
 * @param {SelectorQuery} query
 * @param {Number} interval
 * @param {Number} timeout
 * **/
export declare const execSelectQuery: (selectQuery: SelectorQuery, interval?: number, timeout?: number) => Promise<IQueryResult | IQueryResult[]>;
/***
 * 简单尺寸转化：
 * @param {String|Number} size
 * @return {String|0}
 * **/
export declare const getSizeToPx: (size: number | string) => string | 0;
/***
 * _.isEqual 简单判断
 * **/
export declare const isEqual: (a: any, b: any) => any;
