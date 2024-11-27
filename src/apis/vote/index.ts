import request from '@/utils/request';
import type * as T from './model';

export const getVoteList = (params: {
  current: number,
  pageSize: number,
  openid:string
}) =>
  request<T.IVoteItem[]>({
    url: '/v1/vote/getVoteList',
    method: 'GET',
    params
  });

export const addVote = (data:{
  imgSrc:string
  title:string
  voteDesc:string
  openid:string
  chooseMap:string
  voteType:number
  voteMaxNum:number
  voteDdl:string
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
