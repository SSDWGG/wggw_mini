package com.ryw.dto;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.User;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UsersDto {

  @TableId
  private String openid;
  private String username;
  private String avatarurl;
  private String phone;
  private String email;


  @TableLogic //逻辑删除注解    (内部进行更新)
  private Integer deleted;

  @Version    //乐观锁注解
  private  Integer version;

  @TableField(fill = FieldFill.INSERT)        //内容自动填充（插入时自动填充时间）
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
  private Date createTime;
  @TableField(fill = FieldFill.INSERT_UPDATE)//内容自动填充（修改时自动填充时间）
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
  private Date updateTime;

    private String useTime;

  public String getOpenid() {
    return openid;
  }

  public void setOpenid(String openid) {
    this.openid = openid;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getAvatarurl() {
    return avatarurl;
  }

  public void setAvatarurl(String avatarurl) {
    this.avatarurl = avatarurl;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Integer getDeleted() {
    return deleted;
  }

  public void setDeleted(Integer deleted) {
    this.deleted = deleted;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  public Date getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  public Date getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }

  public String getUseTime() {
    return useTime;
  }

  public void setUseTime(String useTime) {
    this.useTime = useTime;
  }
}
