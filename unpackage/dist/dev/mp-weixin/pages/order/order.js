"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_formater2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_formater = () => "../../components/formater/formater.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_formater + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    common_vendor.ref();
    const OrUpdate = common_vendor.ref();
    const order = common_vendor.ref({});
    const orderStatus = common_vendor.computed(() => {
      const map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    common_vendor.onLoad((e) => {
      OrUpdate.value = e;
      getOrderDetail(e);
    });
    const app = getApp();
    const getOrderDetail = (parms) => {
      app.globalData.utils.request({
        url: "/order/detail",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: parms,
        success: (res) => {
          order.value = res.data;
        }
      });
    };
    const onCounterOver = () => {
      getOrderDetail(OrUpdate);
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const makePhoneCall = (e) => {
      common_vendor.index.makePhoneCall({
        // phoneNumber:e.currentTarget.dataset.tel,
        phoneNumber: "15907543388"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        c: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        d: common_vendor.o(onCounterOver),
        e: common_vendor.p({
          second: order.value._exp_time
        }),
        f: common_vendor.t(order.value.price),
        g: common_vendor.o((...args) => _ctx.dopay && _ctx.dopay(...args))
      } : {}, {
        h: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        i: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        j: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        k: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        l: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        m: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        n: order.value._staff.avatar_url,
        o: common_vendor.t(order.value._staff.nickname),
        p: common_vendor.o(makePhoneCall),
        q: order.value._staff.mobile
      } : {}, {
        r: common_vendor.t(order.value.service_name),
        s: order.value.service_stype <= 20
      }, order.value.service_stype <= 20 ? common_vendor.e({
        t: common_vendor.t(order.value.hospital_name),
        v: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        w: common_vendor.t(order.value.client_name),
        x: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        y: common_vendor.t(order.value.client_age),
        z: common_vendor.t(order.value.tel),
        A: order.value.service_stype == 15
      }, order.value.service_stype == 15 ? {
        B: common_vendor.t(order.value.receiveAddress)
      } : {}) : {}, {
        C: order.value.service_stype > 20 && order.value.service_stype < 100
      }, order.value.service_stype > 20 && order.value.service_stype < 100 ? {
        D: common_vendor.t(order.value.hospital_name),
        E: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        F: common_vendor.t(order.value.address.userName),
        G: common_vendor.t(order.value.address.telNumber),
        H: common_vendor.t(order.value.address.cityName),
        I: common_vendor.t(order.value.address.countyName),
        J: common_vendor.t(order.value.address.detailInfo)
      } : {}, {
        K: order.value.service_stype > 100
      }, order.value.service_stype > 100 ? {
        L: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        M: common_vendor.t(order.value.client_name),
        N: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        O: common_vendor.t(order.value.client_age),
        P: common_vendor.t(order.value.client_mobile),
        Q: common_vendor.t(order.value.address.address)
      } : {}, {
        R: common_vendor.t(order.value.demand),
        S: common_vendor.t(order.value.tel),
        T: common_vendor.p({
          timestamp: order.value.order_start_time,
          format: "YYYY-MM-dd hh:mm"
        }),
        U: common_vendor.t(order.value.price),
        V: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        W: common_vendor.t(order.value.price),
        X: common_vendor.p({
          timestamp: order.value.pay_time,
          format: "YYYY-MM-dd hh:mm"
        })
      } : {}, {
        Y: common_vendor.t(order.value.out_trade_no),
        Z: common_vendor.o(payment),
        aa: common_assets._imports_0$1,
        ab: common_vendor.sr("qrcodePopup", "e972b44a-6"),
        ac: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
