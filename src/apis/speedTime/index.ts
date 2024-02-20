import request from "@/utils/request";
import * as T from "./model";

export const getUserFastTime = () =>
  request<T.ISpeedTimeItem>({
    url: "/v1/speedTime/getUserFastTime",
    method: "GET",
  });
export const updateSpeedTime = (data) =>
  request<Boolean>({
    url: "/v1/speedTime/updateSpeedTime",
    method: "POST",
    data
  });
export const getCurrentUsersSpeedTime = () =>
  request<T.ISpeedTimeItem[]>({
    url: "/v1/speedTime/getCurrentUsersSpeedTime",
    method: "GET"
  });
export const test = () =>
  request<boolean>({
    url: "/v1/test1",
    method: "GET"
  });