import request from "@/utils/request";
import * as T from "./model";

export const getKunChartList = (params: {
  current: number,
  pageSize: number,
}) =>
  request<T.IBiddingItem[]>({
    url: "/v1/KunChart/getKunChartList",
    method: "GET",
    params
  });

export const addKunChart = (data: {
  imgSrc: string;
  title: string;
  kcDesc: string;
}) =>
  request<boolean>({
    url: "/v1/KunChart/addKunChart",
    method: "POST",
    data,
  });



export const deleteKunChartByShopId = (params: { shopId: string }) =>
  request<boolean>({
    url: "/v1/KunChart/deleteKunChartByShopId",
    method: "POST",
    params,
  });
  
export const getKunCharOne = (params: { shopId: string }) =>
  request<boolean>({
    url: "/v1/KunChart/getKunCharOne",
    method: "GET",
    params,
  });
export const getKunChartLineList = (params: { shopId: string }) =>
  request<boolean>({
    url: "/v1/KunChartLine/getKunChartLineList",
    method: "GET",
    params,
  });



  export const addKunChartLine = (data: {
    shopId: string;
    openid: string;
    username: string;
    price: string;
  }) =>
    request<boolean>({
      url: "/v1/KunChartLine/addKunChartLine",
      method: "POST",
      data,
    });