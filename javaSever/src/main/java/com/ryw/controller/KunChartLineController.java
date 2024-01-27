package com.ryw.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.KunChart;
import com.ryw.entity.KunChartLine;
import com.ryw.entity.Users;
import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.KunChartLineMapper;
import com.ryw.mapper.KunChartMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ryw.framework.domain.AjaxResult.success;

@Slf4j
@RestController
public class KunChartLineController {

    @Autowired
    KunChartLineMapper kunchartlineMapper;

    @CrossOrigin
    @RequestMapping("/v1/KunChartLine/addKunChartLine")              // 增加
    public AjaxResult addKunChartLine(@RequestBody KunChartLine kcl){
        kunchartlineMapper.insert(kcl);
        return success();
    }

    @RequestMapping("/v1/KunChartLine/getKunChartLineList")              // 查询列表
    public AjaxResult getKunChartLineList(@RequestParam("shopId") Long shopId){
        QueryWrapper<KunChartLine> wrapper = new QueryWrapper<>();
        wrapper.eq("shop_id",shopId);
        List<KunChartLine> kunchartlineList  =   kunchartlineMapper.selectList(wrapper);
        return success(kunchartlineList);
    }


}
