import request from '@/utils/request';
import type * as T from './model';


// Fmenu

export const addFmenu = (data: {
  openid: string
  firstCdName: string
}) =>
  request<boolean>({
    url: '/v1/orderMenu/addFmenu',
    method: 'POST',
    data,
  });

export const getFmenuList = (openid: string ) =>
  request<T.IFmenuItem[]>({
    url: '/v1/orderMenu/getFmenuList',
    method: 'GET',
    params:{ openid },
  });
export const deleteFmenu = ( firstCdId: string ) =>
  request<boolean>({
    url: '/v1/orderMenu/deleteFmenu',
    method: 'GET',
    params:{ firstCdId },
  });


  // Smenu



  export const addSmenu = (data: {
    openid: string
    secondCdName: string
    firstCdId: string
  }) =>
    request<boolean>({
      url: '/v1/orderMenu/addSmenu',
      method: 'POST',
      data,
    });

  export const getSmenuList = (openid: string ) =>
    request<T.ISmenuItem[]>({
      url: '/v1/orderMenu/getSmenuList',
      method: 'GET',
      params:{ openid },
    });
  export const getSmenuListByFid = (openid: string,firstCdId : string) =>
    request<T.ISmenuItem[]>({
      url: '/v1/orderMenu/getSmenuListByFid',
      method: 'GET',
      params:{ openid,firstCdId },
    });

  export const deleteSmenu = ( secondCdId: string ) =>
    request<boolean>({
      url: '/v1/orderMenu/deleteSmenu',
      method: 'GET',
      params:{ secondCdId },
    });

