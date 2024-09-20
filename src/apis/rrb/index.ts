import request from '@/utils/request';
import type * as T from './model';

export const getImgListByTuser = (params: {
  current: number,
  pageSize: number,
  tuser:string
}) =>
  request<T.IImgFallItem[]>({
    url: '/v1/imgFall/getImgListByTuser',
    method: 'GET',
    params
  });

export const addOneImgFall = (data: {
  imgSrc: string;
  tuser: string;
  cuser: string;
}) =>
  request<string>({
    url: '/v1/imgFall/addOneImgFall',
    method: 'POST',
    data,
  });


