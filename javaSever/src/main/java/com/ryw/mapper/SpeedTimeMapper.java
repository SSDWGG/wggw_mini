package com.ryw.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.SpeedTime;
import com.ryw.dto.UsersDto;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SpeedTimeMapper extends BaseMapper<SpeedTime> {
  String querySqlGetUsersWithSpeedTimeByPage = "SELECT a.*, b.use_time FROM users AS a,speed_time AS b where b.openid = a.openid";

//  获取表总数量
  String querySqlGetCount =  "SELECT COUNT(*) FROM speed_time";

//  这个联合类型咋定义？现在只能查询出来a的字段，b的无法查出来
  @Select(querySqlGetUsersWithSpeedTimeByPage)                    //多表的关联并且分页查询
  List<UsersDto> getUsersWithSpeedTimeByPage(Page page);

  int changeDeletedStatus(String openid, int deleted);

  List<SpeedTime> getAllDeleted();

  @Select(querySqlGetCount)
  int GetCount();
}
