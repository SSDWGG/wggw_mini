import request from '@/utils/request';
import type * as T from './model';

export const getVoteList = (params: { current: number; pageSize: number; openid: string }) =>
  request<T.IVoteItem[]>({
    url: '/v1/vote/getVoteList',
    method: 'GET',
    params,
  });

export const addVote = (data: {
  imgSrc: string;
  title: string;
  voteDesc: string;
  openid: string;
  chooseMap: string;
  voteType: number;
  voteMaxNum: number;
  voteDdl: string;
}) =>
  request<string>({
    url: '/v1/vote/addVote',
    method: 'POST',
    data,
  });

export const deleteVoteByVoteId = (params: { voteId: string }) =>
  request<boolean>({
    url: '/v1/vote/deleteVoteByVoteId',
    method: 'POST',
    params,
  });

export const getVoteOne = (params: { voteId: string }) =>
  request<T.IVoteItem>({
    url: '/v1/vote/getVoteOne',
    method: 'GET',
    params,
  });

export const updateVote = (data: T.IVoteItem) =>
  request<boolean>({
    url: '/v1/vote/updateVote',
    method: 'POST',
    data,
  });

// 投票接口

export const getVoteHistoryListByOpenidAndVoteId = (params: { current: number; pageSize: number; openid: string; voteId: string }) =>
  request<T.IVoteChooseItem[]>({
    url: '/v1/voteHistory/getVoteHistoryListByOpenidAndVoteId',
    method: 'GET',
    params,
  });

export const getVoteHistoryListByVoteId = (params: { current: number; pageSize: number; voteId: string }) =>
  request<T.IVoteChooseItem[]>({
    url: '/v1/voteHistory/getVoteHistoryListByVoteId',
    method: 'GET',
    params,
  });

export const addVoteHistory = (data) =>
  request<boolean>({
    url: '/v1/voteHistory/addVoteHistory',
    method: 'POST',
    data,
  });
