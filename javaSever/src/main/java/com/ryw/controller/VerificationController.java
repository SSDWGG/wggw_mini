package com.ryw.controller;

import com.ryw.controller.util.MD5Utils;
import com.ryw.framework.domain.AjaxResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ryw.framework.domain.AjaxResult.success;
import static com.ryw.framework.domain.AjaxResult.error;

@Controller
public class VerificationController {


    @Value("${mail.fromMail.sender}")
    private String sender;// 发送者

    @Autowired
    private JavaMailSender javaMailSender;




    //  保存验证码的集合
    List<Map<String, Object>> list = new ArrayList<>();

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @CrossOrigin


    //随机数生成x位数
    private String VerifyCode(int n){
        Random r = new Random();
        StringBuffer sb =new StringBuffer();
        for(int i = 0;i < n;i ++){
            int ran1 = r.nextInt(10);
            sb.append(String.valueOf(ran1));
        }
        return sb.toString();
    }

    //保存验证码和时间
    private void saveCode(String code,String email){
        SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MINUTE, 30);
        String currentTime = sf.format(c.getTime());// 生成30分钟后时间，用户校验是否过期
        Map<String, Object> resultMap = new HashMap<>();
        String hash =  MD5Utils.code(code);//生成MD5值
        resultMap.put("hash", hash);
        resultMap.put("tamp", currentTime);
        resultMap.put("email", email);
        if (list.size()==0){
            list.add(resultMap);
        } //验证码集为空，可以直接插入
        else{
            String emailinlist = "";
            for(int i =0;i<list.size();i++){
                emailinlist = list.get(i).get("email").toString();
                if(emailinlist.equals(email)){
                    //在验证码集中找到email 覆盖code
                    list.get(i).put("hash", hash);
                    list.get(i).put("tamp", currentTime);
                }
            }
            //未找到相同，直接插入
            list.add(resultMap);
        }
    }

    @RequestMapping("/v1/verification/testCode")
    @ResponseBody
    //验证验证码是否正确
//    {state；boolean}
    private AjaxResult testCode(String code,String email){
        if (list.size()==0){
            return error("验证邮箱失败");
        } //验证码集为空，请再次申请验证码       代码000
        else{
            /*先拿到email   查找是否有这个email如果存在就对比时间是否过期和验证码是否正确*/
            String emailinlist = "";
            for(int i =0;i<list.size();i++){
                emailinlist = list.get(i).get("email").toString();
                if(emailinlist.equals(email)){
                    String requestHash =  list.get(i).get("hash").toString();
                    String tamp = list.get(i).get("tamp").toString();
                    SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");//当前时间
                    Calendar c = Calendar.getInstance();
                    String currentTime = sf.format(c.getTime());
                    if (tamp.compareTo(currentTime) > 0) {
                        String hash =  MD5Utils.code(code);//生成MD5值
                        if (hash.equalsIgnoreCase(requestHash)){
                            //校验正确
                            //判断数据是否合法（用户名，邮箱不能重复）
                            return success(true);
                        }
                        else {
                            //验证码不正确，校验失败  代码002
                            //attributes.addFlashAttribute("message", "验证码输入不正确");
                            return error("验证邮箱失败");
                        }
                    }
                    else {
                        // 超时代码  001   超时也有可能是验证码不正确（包含关系）
                        //attributes.addFlashAttribute("message", "验证码已过期");
                        return error("验证邮箱失败");
                    }
                }//在验证码集中找到email
                //该条集合中未找到该email继续往下执行如果所有都没有找到则发送未找到
            }
//                return"验证码集不为空";
            return error("验证邮箱失败");
        }
    }


    /**
     * 读取邮件模板
     * 替换模板中的信息
     *
     * @param title 内容
     * @return
     */
    public String buildContent(String title) {
        //加载邮件html模板
        Resource resource = new ClassPathResource("WGGWMailTemplate.html");
        InputStream inputStream = null;
        BufferedReader fileReader = null;
        StringBuffer buffer = new StringBuffer();
        String line = "";
        try {
            inputStream = resource.getInputStream();
            fileReader = new BufferedReader(new InputStreamReader(inputStream));
            while ((line = fileReader.readLine()) != null) {
                buffer.append(line);
            }
        } catch (Exception e) {
//            log.info("发送邮件读取模板失败{}", e);
            System.out.println("发送邮件读取模板失败{}");
        } finally {
            if (fileReader != null) {
                try {
                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        //替换html模板中的参数
        return MessageFormat.format(buffer.toString(), title);
    }

    /**
     * 向用户邮箱发送短信
     *
     * @param email 收件人邮箱
     */
    @RequestMapping("/v1/verification/sendEmail")
    @ResponseBody
    public AjaxResult sendEmailMessage(String email) {

        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            String code = VerifyCode(6);
            //邮箱发送内容组成
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setSubject("【WGGW】的验证码邮件");
            helper.setText(buildContent(code + ""), true);
            helper.setTo(email);
            helper.setFrom(sender);
            javaMailSender.send(message);
            logger.info(email+"文本邮件发送成功！");
            saveCode(code,email);
            return success("文本邮件发送成功！");
        }catch (MailSendException e){
            logger.error(email+"邮箱不存在");
            return error(email+"邮箱不存在");
        } catch (Exception e) {
            logger.error(email+"邮件发送异常", e);
            return error(email+"邮件发送异常");
        }
    }

}
