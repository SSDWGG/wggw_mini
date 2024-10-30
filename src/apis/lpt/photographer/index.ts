import request from '@/utils/request-lpt';
// import type * as T from './model';

// 核销返回景点列表
export const postBindOrder = (orderNumber) =>
  request<any>({
    url: `/p/order/active/${orderNumber}`,
    method: 'POST',
  });
// 核销返回景点列表
export const postVerification = (orderNumber) =>
  request<any>({
    url: `/p/order/verification/${orderNumber}`,
    method: 'POST',
  });

  // 上传照片
export const postSceneryPic = (data) =>
  request<any>({
    url: '/p/sceneryPic',
    method: 'POST',
    data
  });

  // 查询照片
export const getSceneryPic = (data) =>
  request<any>({
    url: '/p/sceneryPic/page',
    method: 'GET',
    data
  });
  // 删除照片
export const deleteSceneryPic = (id) =>
  request<any>({
    url: `/p/sceneryPic/${id}`,
    method: 'DELETE'
  });
