## 小程序

### git管理
主分支为main分支，现主分同步人参果空间小程序
其余分支：rsg-master（人参果空间小程序，dlb-master（小老贝儿小程序），sun-master（有一个太阳小程序）

### 小程序项目介绍
人参果空间小程序 
![人参果空间微信小程序码](wggwQR.png)

项目地址：https://github.com/SSDWGG/wggw_mini.git   

启动环境参数
buildEnv：通讯ip区别
wxFixProd：是否通过微信审核限制(个人开发者小程序的限制)

注意：
1：小程序开发中不应该在前端显示任何有关openid，虽然在微信层面该操作是安全的，因为openid处于不同小程序隔离状态
2：SVGA播放器以及文档： https://github.com/svga/svgaplayer-weapp
3：程序主包大小需要严格管理，插件和第三方库通过分包异步化方式引入或者直接引入在分包中，不要写到通用主包中
4：微信审核人员是根据路由查看页面的，所以页面隐藏是无效的，但是可以在页面上做内容隐藏
5:ehart-taro文档： https://github.com/Cecilxx/echarts-taro3-vue
7:π的计算https://segmentfault.com/q/1010000043079850
8:海报生成参考：https://github.com/BibBin/taro-poster-builder?tab=readme-ov-file