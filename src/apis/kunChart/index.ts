import request from "@/utils/request";
import * as T from "./model";

export const getKunChartList = () =>
  request<T.IBiddingItem[]>({
    url: "/v1/KunChart/getKunChartList",
    method: "GET",
    params: {
      current: 1,
      pageSize: 100,
    },
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
