package com.ryw.config;

import com.ryw.interceptors.JWTInterceptors;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JWTInterceptors())
                //开启部分通行
                .excludePathPatterns(
                        //登录注册放行
                        "/v1/user/getOpenid"
                );
                // 全部开启验证
                //.addPathPatterns("/**")
                // 全部放行
                //.excludePathPatterns("/**");
    }
}