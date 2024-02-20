package com.ryw.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.KunChart;
import com.ryw.entity.SpeedTime;
import com.ryw.entity.Users;
import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.SpeedTimeMapper;
import com.ryw.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.ryw.framework.domain.AjaxResult.error;
import static com.ryw.framework.domain.AjaxResult.success;


@Slf4j
@RestController
public class SpeedTimeController {

  @Autowired
  SpeedTimeMapper speedTimeMapper;

  @Autowired
  UsersMapper usersMapper;

  //获取用户最快一次的speedTime
  @CrossOrigin
  @RequestMapping("/v1/speedTime/getUserFastTime")
  public AjaxResult getUserFastTime(HttpServletRequest request)
  {
    try {
      DecodedJWT verify = JWTUtils.verify(request.getHeader("token"));

      QueryWrapper<SpeedTime> wrapper = new QueryWrapper<>();
      wrapper.eq("openid",verify.getClaim("openid").asString());
       SpeedTime speedTimeQuery  =   speedTimeMapper.selectOne(wrapper);
       if(speedTimeQuery==null){

         SpeedTime speedTimeInsert = new SpeedTime();

         QueryWrapper<Users> wrapperSelectUser = new QueryWrapper<>();
         wrapperSelectUser.eq("openid",verify.getClaim("openid").asString());
         Users userdata = usersMapper.selectOne(wrapperSelectUser);
         speedTimeInsert.setOpenid(userdata.getOpenid());
         speedTimeInsert.setAvatarurl(userdata.getAvatarurl());
         speedTimeInsert.setUsername(userdata.getUsername());
         speedTimeInsert.setUseTime("5");
         speedTimeMapper.insert(speedTimeInsert);
         return  success(speedTimeInsert);

       }else{
         return  success(speedTimeQuery);
       }

    } catch (Exception e){
      return error("token异常");
    }
  }

  //    改
  @RequestMapping("/v1/speedTime/updateSpeedTime")
  public AjaxResult updateSpeedTime(@RequestBody SpeedTime speedTime){
    QueryWrapper<SpeedTime> wrapper = new QueryWrapper<>();
    wrapper.eq("openid",speedTime.getOpenid());
    speedTimeMapper.update(speedTime,wrapper);
    return success();
  }


  //  获取分页用户时长并排序
  @RequestMapping("/v1/speedTime/getCurrentUsersSpeedTime")
  public AjaxResult getCurrentUsersSpeedTime(){
    Page<SpeedTime> page = new Page<>(1, 20);
    QueryWrapper<SpeedTime> wrapper = new QueryWrapper<>();
    wrapper.orderByAsc("use_time","update_time");
    speedTimeMapper.selectPage(page, wrapper);
    List<SpeedTime> speedTimeList  = page.getRecords();  //分页查询的结果
    return success(speedTimeList);
  }


  //  test1
  @RequestMapping("/v1/test1")
  public AjaxResult test(){
    Page<SpeedTime> page = new Page<>(1, 20);
    List  UsersDto =  speedTimeMapper.getUsersWithSpeedTimeByPage(page);
    return success(UsersDto);
  }

  //  test2
  @RequestMapping("/v1/test2")
  public AjaxResult test2(){
    speedTimeMapper.changeDeletedStatus("2on2kW47NjXqCj22nJUszMgoq-z5M",1);
    return success();
  }

  //  test3
  @RequestMapping("/v1/test3")
  public AjaxResult test3(){
    return success(  speedTimeMapper.getAllDeleted());
  }

}
