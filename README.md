## 项目介绍

项目地址：https://github.com/SSDWGG/wggw_mini.git

WGGW 小程序项目

小程序搜索WGGW查看线上项目效果

纯前端的小程序不走服务接口，数据由前端实现存储持久化
（页面中的数据直接调用store的数据或者页面初始化的时候将数据存在data然后再useDidShow方法中同步store到data）
（数据修改需同步，数据改动的时候先修改到store，然后立即调用store中的方法同步数据到storage）
（storeage的数据总量是10mb）

功能：时间钟表
计划开发的功能：前端备忘录


