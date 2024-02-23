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
<!--     "svgaplayer-weapp": "github:svga/svgaplayer-weapp" -->



