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


    @CrossOrigin
    @RequestMapping("/v2/user/getAllUser")              // 分页查询  和全部数据条数
    public String getUserList(@RequestParam("current") int current  ,
                              @RequestParam("pageSize") int pageSize ){   //接收传来的参数，这里了封装一个实体类
        HashMap<String, Object> resMap = new HashMap<>();
        Page<Users> page = new Page<>(current, pageSize);
        usersMapper.selectPage(page, null);
        List<Users> usersList  = page.getRecords();  //分页查询出的用户数据
        long numbers = page.getTotal();// 总条数
        resMap.put("total",numbers);
        resMap.put("data",usersList);
        resMap.put("current",current);
        resMap.put("pageSize",pageSize);
        return JSON.toJSONString(resMap);
    }


    @RequestMapping("/v2/user/updatePasswordByEmail")         //email验证更新user密码
    public String updatePasswordByEmail( @RequestParam("email") String email, @RequestParam("password") String password){
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        HashMap<String,Object> queryMap = new HashMap<>();
        queryMap.put("email",email);
        wrapper.allEq(queryMap, false);
        Users users = usersMapper.selectOne(wrapper);
        users.setPassword(password);
        return null;
    }



//    获取openid
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
