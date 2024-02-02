import request from "@/utils/request";
import * as T from "./model";

export const getMemoList = (params:{
  current: number,
  pageSize: number,
  uid:string
}) =>
  request<T.IMemo[]>({
    url: "/v1/memo/getMemoList",
    method: "GET",
    params,
  });

export const AddMemo = (data: {
  memoType: number
  content: string
  list: string
  uid:string
}) =>
  request<boolean>({
    url: "/v1/memo/AddMemo",
    method: "POST",
    data,
  });

export const deleteMemo = (params: { memoId: string }) =>
  request<boolean>({
    url: "/v1/memo/deleteMemo",
    method: "POST",
    params,
  });

export const getMemoOne = (params: { memoId: string }) =>
  request<T.IMemo>({
    url: "/v1/memo/getMemoOne",
    method: "GET",
    params,
  });
  
export const updateMemo = (data:T.IMemo) =>
  request<boolean>({
    url: "/v1/memo/updateMemo",
    method: "POST",
    data,
  });
