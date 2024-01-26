package com.ryw.controller;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.KunChart;

import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.KunChartMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.ryw.framework.domain.AjaxResult.success;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ryw.framework.domain.AjaxResult.success;

@Slf4j
@RestController
public class KunChartController {

    @Autowired
    KunChartMapper kunchartMapper;


    @CrossOrigin
    @RequestMapping("/v1/KunChart/getKunChartList")              // 分页查询
    public AjaxResult getKunChartList(@RequestParam("current") int current  ,
                              @RequestParam("pageSize") int pageSize ){
        Page<KunChart> page = new Page<>(current, pageSize);
        kunchartMapper.selectPage(page, null);
        List<KunChart> kunchartList  = page.getRecords();  //分页查询的结果
        return success(kunchartList);
    }
    @RequestMapping("/v1/KunChart/addKunChart")              // 增加
    public AjaxResult addKunChart(@RequestBody KunChart kc){
        kunchartMapper.insert(kc);
        return success();
    }

    @RequestMapping("/v1/KunChart/deleteKunChartByShopId")              // 删除
    public AjaxResult deleteKunChartByShopId(@RequestParam("shopId") Long shopId){
        kunchartMapper.deleteById(shopId);
        return success();
    }

}
