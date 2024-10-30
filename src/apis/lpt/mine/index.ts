import request from '@/utils/request-lpt';
import Taro from '@tarojs/taro';
// import { useAccountStore } from '@/stores/account';
// const account = useAccountStore();

// 获取token和用户类型
export const getToken = () =>
  Taro.login().then((res) =>
    request<any>({
      url: '/login',
      method: 'POST',
      data: {
        wxCode: res.code,
      },
    }),
  );

export const getUserInfo = () =>
  request<any>({
    url: '/p/user/userInfo',
    method: 'GET',
  });
export const setUserInfo = (data) =>
  request<any>({
    url: '/p/user/setUserInfo',
    method: 'PUT',
    data
  });
export const getOssConfig = () =>
  request<any>({
    url: '/oss/get_post_signature_for_oss_upload',
    method: 'GET',
  });

export const getIndexImgs = () =>
  request<any>({
    url: '/indexImgs',
    method: 'GET',
  });

  export const getAboutUs = () =>
    request<any>({
      url: '/p/aboutUs',
      method: 'GET',
    });
