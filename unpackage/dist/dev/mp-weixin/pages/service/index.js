"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const qrcodePopue = common_vendor.ref();
    const validMobile = common_vendor.reactive({
      phone: "",
      ValidityState: "",
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: "60"
    });
    const popup = common_vendor.ref();
    const is_xieyi = common_vendor.ref(false);
    const service = common_vendor.ref({});
    const app = getApp();
    const hospitals = common_vendor.ref([]);
    const cfg = common_vendor.reactive({
      page_xy: "1",
      page_fw: "2"
    });
    const hospital_index = common_vendor.ref(0);
    const order = common_vendor.reactive({
      price: "",
      starttime: "",
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      },
      receiveAddress: "",
      tel: "",
      demand: ""
    });
    const client = common_vendor.reactive({
      name: ""
    });
    common_vendor.onLoad((option) => {
      main_load(option);
    });
    const main_load = (option) => {
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid: option.svid
        },
        success: (res) => {
          service.value = res.data.service;
          hospitals.value = res.data.hospitals;
          const hospitalsData = common_vendor.toRaw(hospitals.value);
          if (option.hid > 0) {
            for (let i = 0; i < hospitalsData.length; i++) {
              if (hospitalsData[i].id == option.hid) {
                hospital_index.value = i;
                order.price = hospitalsData[i].service_price;
                break;
              }
            }
          }
        }
      });
    };
    const handleTap = () => {
    };
    const onHospitalChange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.price = common_vendor.toRaw(hospitals.value)[value].service_price;
    };
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
    };
    const onClientChange = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientsChange", (data) => {
      client.name = data.name;
      client.id = data.user_id;
      client.sex = data.sex;
      client.age = data.age;
      client.mobile = data.mobile;
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          order.address.userName = res.userName;
          order.address.cityName = res.cityName;
          order.address.countyName = res.countyName;
          order.address.detailInfo = res.detailInfo;
        },
        fail: (res) => {
        }
      });
    };
    let sumbitOrderData;
    const submit = () => {
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请先勾选",
          icon: "none",
          duration: 1e3
        });
      }
      const orderData = common_vendor.toRaw(order);
      const serviceData = common_vendor.toRaw(service.value);
      const hospitalsData = common_vendor.toRaw(hospitals.value);
      const clientData = common_vendor.toRaw(client);
      orderData.service_code = serviceData.code;
      orderData.service_id = serviceData.id;
      orderData.service_stype = serviceData.stype;
      orderData.service_name = serviceData.name;
      if (serviceData.type < 100) {
        if (hospital_index.value = 0) {
          common_vendor.index.showToast({
            title: "请选择医院",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.hospital_id = hospitalsData[hospital_index.value].id;
        orderData.hospital_name = hospitalsData[hospital_index.value].name;
      }
      if (!orderData.starttime) {
        return common_vendor.index.showToast({
          title: "请选择时间",
          icon: "none",
          duration: 1e3
        });
      }
      if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
        if (!clientData.id) {
          return common_vendor.index.showToast({
            title: "请选择就诊人",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.client = {};
        orderData.client.age = clientData.age;
        orderData.client.name = clientData.name;
        orderData.client.mobile = clientData.mobile;
        orderData.client.sex = clientData.sex;
        if (serviceData.stype == 15) {
          if (!orderData.receiveAddress) {
            return common_vendor.index.showToast({
              title: "请输入接送地址",
              icon: "none",
              duration: 1e3
            });
          }
        }
        if (serviceData.stype == 30 || serviceData.stype == 40) {
          if (orderData.address.userName) {
            return common_vendor.index.showToast({
              title: "请选择收件信息",
              icon: "none",
              duration: 1e3
            });
          }
        }
        if (!orderData.tel) {
          return common_vendor.index.showToast({
            title: "请添加联系电话",
            icon: "none",
            duration: 1e3
          });
        }
      }
      orderData.hospital_id = hospitalsData[hospital_index.value].id;
      orderData.hospital_name = hospitalsData[hospital_index.value].name;
      sumbitOrderData = orderData;
      if (!common_vendor.index.getStorageSync("token")) {
        open();
      } else {
        orderData.hospital_id = hospitalsData[hospital_index.value].id;
        orderData.hospital_name = hospitalsData[hospital_index.value].name;
        createOrder(orderData);
      }
    };
    const open = () => {
      popup.value.open();
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查填写的数据",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.phone,
          code: validMobile.validCode
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.token);
          createOrder(sumbitOrderData);
        },
        fail: (res) => {
          return common_vendor.index.showToast({
            title: "请检查填写的数据!!!!!!!!",
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    let isflag = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请输入正确的手机号码",
          icon: "none",
          duration: 1e3
        });
      }
      if (isflag) {
        return;
      }
      const time = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          isflag = false;
          clearInterval(time);
        } else {
          countdown.time -= 1;
          countdown.validText = `剩余${countdown.time}s`;
          isflag = true;
        }
      }, 1e3);
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.phone
        },
        success: (res) => {
          return common_vendor.index.showToast({
            title: "验证码发送成功，请尽快验证",
            icon: "none",
            duration: 1e3
          });
        },
        fail: (res) => {
          return common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const createOrder = (orderData) => {
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: orderData,
        success: (res) => {
          qrcodePopue.value.open("center");
          const qr = new common_vendor.UQRCode();
          qr.data = res.wx_code;
          qr.size = 150;
          qr.make();
          var canvasContext = common_vendor.index.createCanvasContext("qrcode");
          qr.canvasContext = canvasContext;
          qr.drawCanvas();
        },
        fail: (res) => {
        }
      });
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: service.value.icon_image ? service.value.icon_image_url : "../../static/resource/images/avatar.jpg",
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleTap),
        e: service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20
      }, service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalChange),
        h: hospital_index.value,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChanged),
        k: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        l: client.name,
        m: common_vendor.o(onClientChange),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.receiveAddress,
        p: common_vendor.o(($event) => order.receiveAddress = $event.detail.value),
        q: order.tel,
        r: common_vendor.o(($event) => order.tel = $event.detail.value)
      } : {}) : {}, {
        s: service.value.stype == 30 || service.value.stype == 40
      }, service.value.stype == 30 || service.value.stype == 40 ? {
        t: hospitals.value[hospital_index.value].name,
        v: common_vendor.o(onHospitalChange),
        w: hospital_index.value,
        x: hospitals.value,
        y: common_vendor.o(onStartTimeChanged),
        z: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        A: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : "",
        B: common_vendor.o(onAddressChange),
        C: order.tel,
        D: common_vendor.o(($event) => order.tel = $event.detail.value)
      } : {}, {
        E: order.demand,
        F: common_vendor.o(($event) => order.demand = $event.detail.value),
        G: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        H: common_vendor.o(onXieyiChange),
        I: cfg.page_xy,
        J: cfg.page_fw,
        K: order.price > 0
      }, order.price > 0 ? {
        L: common_vendor.t(order.price)
      } : {}, {
        M: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        N: common_vendor.o(submit),
        O: validMobile.phone,
        P: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        Q: validMobile.validCode,
        R: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        S: common_vendor.t(countdown.validText),
        T: common_vendor.o(countdownChange),
        U: common_vendor.o(cancal),
        V: common_vendor.o(ok),
        W: common_vendor.sr(popup, "01fdeaf4-2", {
          "k": "popup"
        }),
        X: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        Y: common_assets._imports_0$1,
        Z: common_vendor.o(payment),
        aa: common_vendor.sr(qrcodePopue, "01fdeaf4-3", {
          "k": "qrcodePopue"
        }),
        ab: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
