"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_js_utils = require("./common/js/utils.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/uesr/index.js";
  "./pages/order/index.js";
  "./pages/search/index.js";
  "./pages/hospital/index.js";
  "./pages/service/index.js";
  "./pages/clients/index.js";
  "./pages/order/order.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("我调用了1");
    common_js_utils.utils.request({
      url: "/app/init",
      success: (res) => {
        common_vendor.index.setStorageSync("cfg", res.data.cfg);
        console.log(res, "我在干嘛");
      },
      fail: (res) => {
        console.log(res, "我失败了");
      }
    });
    console.log("我调用了2");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    utils: common_js_utils.utils
  }
};
Date.prototype.VP_FORMAT = function(format) {
  var ds = parseInt(this.getTime() / (24 * 60 * 60 * 1e3)) - parseInt((/* @__PURE__ */ new Date()).getTime() / (24 * 60 * 60 * 1e3));
  var n = "";
  if (ds == 0) {
    n = "(今天)";
  }
  if (ds == 1) {
    n = "(明天)";
  }
  if (ds == 2) {
    n = "(后天)";
  }
  if (ds == -1) {
    n = "(昨天)";
  }
  if (ds == -2) {
    n = "(前天)";
  }
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds(),
    "n+": n
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
