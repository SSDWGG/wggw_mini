package com.ryw.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ryw.common.utils.HttpUtils;
import com.ryw.entity.Memo;
import com.ryw.entity.Users;
import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.UsersMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.common.collect.Maps;
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
        String openid = (String) jsonObject.get("openid");
//        Object sessionKey = jsonObject.get("session_key");
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("openid",openid);
        Users userdata = usersMapper.selectOne(wrapper);
        if (userdata == null) {
            // 没有openid则创建一个新账户并返回
            Users userInsert = new Users();
            userInsert.setOpenid(openid);
            userInsert.setAvatarurl("https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg");
            userInsert.setUsername("WGGW的神秘用户");
            userInsert.setPhone("");
            userInsert.setEmail("");
            usersMapper.insert(userInsert);
            return success(userInsert);
        }else{
            //        存在账户返回账户信息
            return success(userdata);
        }
    }




    public String getAccessToken() {
        // https://api.weixin.qq.com/cgi-bin/token
        Map<String, Object> params = Maps.newHashMap();
        params.put("appid", "wx824bf8a1f50fe5cf");
        params.put("secret", "56b31af7627aafadc11883bdb78bfeb3");
        params.put("grant_type", "client_credential");
        String response = HttpUtils.get("https://api.weixin.qq.com/cgi-bin/token", params);
        JSONObject jsonObject = JSONObject.parseObject(response);
        Object accessToken = jsonObject.get("access_token");
        return String.valueOf(accessToken);
    }




//    绑定手机号
@RequestMapping("/v1/user/bindPhone")
public AjaxResult bindPhone(
        @RequestParam("code") String code, @RequestParam("phoneCode") String phoneCode
){
//        换取openid
    Map<String, Object> params2openid = Maps.newHashMap();
    params2openid.put("appid", "wx824bf8a1f50fe5cf");
    params2openid.put("secret", "56b31af7627aafadc11883bdb78bfeb3");
    params2openid.put("js_code", code);
    params2openid.put("grant_type", "authorization_code");
    String responseOpenId = HttpUtils.get("https://api.weixin.qq.com/sns/jscode2session", params2openid);
    JSONObject openIdObject = JSONObject.parseObject(responseOpenId);
    String openid = (String) openIdObject.get("openid");
// 换取手机号

    String accessToken = getAccessToken();
    Map<String, Object> params2Phone = Maps.newHashMap();
    params2Phone.put("code", phoneCode);
    params2Phone.put("openid", openid);

    String responsePhone =  HttpUtils.post("https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=" + accessToken,JSONObject.toJSONString(params2Phone));
    JSONObject phoneObject = JSONObject.parseObject(responsePhone);
    WxPhoneResponse wxPhoneResponse = JSONObject.parseObject(String.valueOf(phoneObject), WxPhoneResponse.class);
    WxPhoneResponse.WxPhoneInfo phoneInfo = wxPhoneResponse.getPhone_info();

    QueryWrapper<Users> wrapper = new QueryWrapper<>();
    wrapper.eq("openid",openid);
    Users userdata = usersMapper.selectOne(wrapper);
    userdata.setPhone(phoneInfo.getPhoneNumber());
    usersMapper.update(userdata,wrapper);

    //  存在账户返回账户信息
    return success(userdata);
}


    //    改
    @RequestMapping("/v1/user/updateUser")
    public AjaxResult updateMemo(@RequestBody Users users){
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("openid",users.getOpenid());
        usersMapper.update(users,wrapper);
        return success();
    }
}
