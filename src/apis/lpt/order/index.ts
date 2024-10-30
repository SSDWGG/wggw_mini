import request from '@/utils/request-lpt';
// import type * as T from './model';

export const getMyOrdertList = (status) =>
  request<any>({
    url: '/p/myOrder/myOrder',
    method: 'GET',
    data: {
      current: 0,
      size: 100,
      status
    },
  });
export const cancelOrder = (ordernum) =>
  request<any>({
    url: `/p/myOrder/cancel/${ordernum}`,
    method: 'PUT',
    data:{}
  });
export const orderRefund = (data:{
  orderNumber: string,
  buyerMsg:string,
  sellerMsg: string,
  refundAmount: number,
}) =>
  request<any>({
    url: '/orderRefund/save',
    method: 'POST',
    data
  });
