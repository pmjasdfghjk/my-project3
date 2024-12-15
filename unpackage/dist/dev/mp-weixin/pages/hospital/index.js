"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_share2 = common_vendor.resolveComponent("share");
  (_easycom_navbar2 + _easycom_share2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  (_easycom_navbar + _easycom_share)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const services = common_vendor.ref([]);
    const hospital = common_vendor.ref({});
    const app = getApp();
    const message = common_vendor.ref("");
    const handleData = (data) => {
      message.value = data;
      console.log(message.value);
    };
    const navBarHeight = common_vendor.ref("");
    const onNavBarAttached = (e) => {
      navBarHeight.value = e.detail.navBarHeight;
    };
    const showShareModal = () => {
      clone_shareModal.value = true;
    };
    common_vendor.onLoad((e) => {
      app.globalData.utils.request({
        url: "/Hospital/index",
        data: {
          hid: e.hid
        },
        success: (res) => {
          hospital.value = res.data.hospital;
          console.log(res, "我是医院详情的数据");
          services.value = res.data.services;
        }
      });
    });
    const clone_shareModal = common_vendor.ref(false);
    const toMap = () => {
    };
    const toService = (event) => {
      common_vendor.index.navigateTo({
        url: "../service/index?hid=" + hospital.value.id + "&svid=" + event.currentTarget.dataset.svid
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onNavBarAttached),
        b: common_vendor.o(handleData),
        c: common_vendor.s("height:" + message.value + "rpx;"),
        d: common_vendor.p({
          ["title-text"]: "",
          isHeight: false,
          isWhite: true,
          background: "none"
        }),
        e: hospital.value.avatar_url,
        f: hospital.value.avatar_url,
        g: common_vendor.t(hospital.value.name),
        h: common_vendor.t(hospital.value.rank),
        i: common_vendor.t(hospital.value.label),
        j: common_vendor.o(showShareModal),
        k: common_assets._imports_0$4,
        l: common_vendor.t(hospital.value.city),
        m: common_vendor.t(hospital.value.district),
        n: common_vendor.t(hospital.value.address),
        o: common_vendor.o(toMap),
        p: common_vendor.f(services.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.use_switch == 1
          }, item.use_switch == 1 ? {
            b: item.logo_image ? item.logo_image_url : "../../resource/images/avatar.jpg",
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.intro),
            e: common_vendor.t(item.price)
          } : {}, {
            f: common_vendor.o(toService, index),
            g: item.id,
            h: index
          });
        }),
        q: common_vendor.s("position:absolute;top:" + navBarHeight.value + "rpx;padding-top:65rpx;overflow:hidden;width:100%;"),
        r: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
