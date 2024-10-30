import request from '@/utils/request-lpt';
import type * as T from './model';

export const getCategoryInfoList = () =>
  request<T.ICategoryInfoItem[]>({
    url: '/category/categoryInfo',
    method: 'GET',
    data: {
      parentId: '',
    },
  });

export const getPageProdList = (data: { categoryId: string; current: number; size: number }) =>
  request<any>({
    url: '/prod/pageProd',
    method: 'GET',
    data,
  });

export const getPageProdDetail = (data: { prodId: string }) =>
  request<any>({
    url: '/prod/prodInfo',
    method: 'GET',
    data,
  });
export const postSubmitOrder = () =>
  request<any>({
    url: '/p/order/submit',
    method: 'POST',
    data: {
      orderShopParam: [
        {
          remarks: '',
          shopId: 1,
        },
      ],
    },
  });
export const postOrderPay = (orderNumbers) =>
  request<any>({
    url: '/p/order/pay',
    method: 'POST',
    data: {
      payType: 1,
      orderNumbers: orderNumbers,
    },
  });
export const postOrderConfirm = (orderItem: { prodCount: number; prodId: string; shopId: string; skuId: string }) =>
  request<any>({
    url: '/p/order/confirm',
    method: 'POST',
    data: {
      couponIds: [],
      userChangeCoupon: 1,
      orderItem,
    },
  });

export const getSceneryPage = (params: { current: number; size: number }) =>
  request<any>({
    url: '/p/scenery/page',
    method: 'GET',
    params,
  });

  export const getSceneryDetail = (id) =>
    request<any>({
      url: `/p/scenery/${id}`,
      method: 'GET',

    });


    export const getSceneryItemPage = (params: { current: number; size: number }) =>
      request<any>({
        url: '/p/sceneryItem/page',
        method: 'GET',
        params,
      });


      export const getSceneryItemDetail = (id) =>
        request<any>({
          url: `/p/sceneryItem/${id}`,
          method: 'GET',

        });
