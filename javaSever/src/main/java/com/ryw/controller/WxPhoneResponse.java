package com.ryw.controller;

import lombok.Data;

@Data
public class WxPhoneResponse {

    private int errcode;
    private String errmsg;
    private WxPhoneInfo phone_info;


    @Data
    public static class WxPhoneInfo{
        private String phoneNumber;
        private String purePhoneNumber;
        private String countryCode;
        private WxWatermark watermark;

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getPurePhoneNumber() {
            return purePhoneNumber;
        }

        public void setPurePhoneNumber(String purePhoneNumber) {
            this.purePhoneNumber = purePhoneNumber;
        }

        public String getCountryCode() {
            return countryCode;
        }

        public void setCountryCode(String countryCode) {
            this.countryCode = countryCode;
        }

        public WxWatermark getWatermark() {
            return watermark;
        }

        public void setWatermark(WxWatermark watermark) {
            this.watermark = watermark;
        }
    }

    @Data
    public static class WxWatermark{
        private long timestamp;
        private String appid;

        public long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(long timestamp) {
            this.timestamp = timestamp;
        }

        public String getAppid() {
            return appid;
        }

        public void setAppid(String appid) {
            this.appid = appid;
        }
    }

    public int getErrcode() {
        return errcode;
    }

    public void setErrcode(int errcode) {
        this.errcode = errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public WxPhoneInfo getPhone_info() {
        return phone_info;
    }

    public void setPhone_info(WxPhoneInfo phone_info) {
        this.phone_info = phone_info;
    }
}


