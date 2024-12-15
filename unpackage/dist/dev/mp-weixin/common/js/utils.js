"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "https://code.itndedu.com/pz";
    this.isLoading = false;
  }
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        this.request({
          url: "/auth/wxLogin",
          data: {
            code: res.code
          },
          success: (res2) => {
          }
        });
      }
    });
  }
  request(option = { showLoading: false }) {
    if (!option.url) {
      return false;
    }
    if (option.showLoading) {
      this.showLoading();
    }
    common_vendor.index.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (res) => {
        this.hideLoading();
        if (res.data.code !== 1e4) {
          if (option.fail && typeof option.fail === "function") {
            option.fail(res);
          }
        } else {
          if (option.success && typeof option.success === "function") {
            option.success(res.data);
          }
        }
      },
      fail: (response) => {
        this.hideLoading();
      }
    });
  }
  // 创建加载的loading效果
  showLoading() {
    if (!this.isLoading) {
      common_vendor.index.showLoading({
        title: "加载中",
        success: () => {
          this.isLoading = true;
        },
        fail: () => {
          this.isLoading = false;
        }
      });
    }
  }
  hideLoading() {
    if (this.isLoading) {
      common_vendor.index.hideLoading();
      this.isLoading = false;
    }
  }
}
const utils = new Utils();
exports.utils = utils;
