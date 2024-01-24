package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.Memo;
import com.ryw.framework.domain.AjaxResult;
import com.ryw.mapper.MemoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

import static com.ryw.framework.domain.AjaxResult.success;

@Slf4j
@RestController
public class MemoController {

    @Autowired
    MemoMapper memoMapper;

    @CrossOrigin
    @RequestMapping("/v1/memo/getMemoList")              // 分页查询
    public AjaxResult getMemoList(@RequestParam("current") int current  ,
                                  @RequestParam("pageSize") int pageSize,
                                  @RequestParam("uid") String uid){
        Page<Memo> page = new Page<>(current, pageSize);
        QueryWrapper<Memo> wrapper = new QueryWrapper<>();
        wrapper.eq("uid",uid);
        memoMapper.selectPage(page, wrapper);
        List<Memo> memoList  = page.getRecords();  //分页查询的结果
        return success(memoList);
    }
    @RequestMapping("/v1/memo/AddMemo")              // 增加
    public AjaxResult AddMemo(@RequestBody Memo memo){
        memoMapper.insert(memo);
        return success();
    }

    @RequestMapping("/v1/memo/deleteMemo")              // 删除
    public AjaxResult deleteMemo(@RequestParam("memoId") Long memoId){
        memoMapper.deleteById(memoId);
        return success();
    }

    //    改
    @RequestMapping("/v1/memo/updateMemo")
    public AjaxResult updateMemo(@RequestBody Memo memo){
        memoMapper.updateById(memo);
        return success();
    }

}
