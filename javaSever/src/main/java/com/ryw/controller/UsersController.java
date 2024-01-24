package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.common.utils.HttpUtils;
import com.ryw.entity.Users;
import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.common.collect.Maps;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static com.ryw.framework.domain.AjaxResult.success;

@Slf4j
@RestController
public class UsersController {

    @Autowired
    UsersMapper usersMapper;

//    获取openid
    @CrossOrigin
    @RequestMapping("/v1/user/getOpenid")
    public AjaxResult getOpenid(
            @RequestParam("code") String code
    ){
        Map<String, Object> params = Maps.newHashMap();
        params.put("appid", "wx824bf8a1f50fe5cf");
        params.put("secret", "56b31af7627aafadc11883bdb78bfeb3");
        params.put("js_code", code);
        params.put("grant_type", "authorization_code");
        String response = HttpUtils.get("https://api.weixin.qq.com/sns/jscode2session", params);
        JSONObject jsonObject = JSONObject.parseObject(response);
        Object openid = jsonObject.get("openid");
        Object sessionKey = jsonObject.get("session_key");
        return success(jsonObject);
    }
}
