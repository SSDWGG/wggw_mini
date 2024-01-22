package com.ryw;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@MapperScan(basePackages = "com.kaven.mybatisplus.dao")
@SpringBootApplication
public class  WGGW_Application {

    public static void main(String[] args) {
        SpringApplication.run(WGGW_Application.class, args);
    }

}
