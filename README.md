## WGGW 

### 小程序项目介绍
微信小程序 WGGW 
![wggw微信小程序码](wggwQR.png)


项目地址：https://github.com/SSDWGG/wggw_mini.git   

启动环境参数
buildEnv：通讯ip区别
wxFixProd：是否通过微信审核限制(个人开发者小程序的限制)

注意：
1：小程序开发中不应该在前端显示任何有关openid，可由后端在token中隐藏openid，由于封装的接口层一定会拿到token，所以后端一定是可以获取到当前静默登录的用户信息的
2：分享页面接口采用并传code，可以做到用户静默登录（只要前端不展示用户信息就不需要强制去获取用户信息，接口层的用户信息也是不需要传的，后端可以通过token中的openid或者前端传入的code来获取到数据库中的用户信息）

3:SVGA播放器以及文档： https://github.com/svga/svgaplayer-weapp

4：程序主包大小需要严格管理，插件和第三方库通过分包异步化方式引入或者直接引入在分包中，不要写到通用主包中

5:微信审核人员是根据路由查看页面的，所以页面隐藏是无效的，但是可以在页面上做内容隐藏

6:ehart-taro文档： https://github.com/Cecilxx/echarts-taro3-vue