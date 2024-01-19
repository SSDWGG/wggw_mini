package com.ryw.common.utils;

import cn.hutool.http.HttpUtil;

import java.util.Map;


public class HttpUtils {

    public static String get(String url, Map<String, Object> params) {
        return HttpUtil.get(url, params);
    }

    public static String post(String url, Map<String, Object> params) {
        return HttpUtil.post(url, params);
    }

    public static String post(String url, String body) {
        return HttpUtil.post(url, body);
    }
}
