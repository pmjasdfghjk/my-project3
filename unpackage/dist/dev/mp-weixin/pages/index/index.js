"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const slides = common_vendor.ref([]);
    const nav2 = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      app.globalData.utils.getUserInfo();
      app.globalData.utils.request({
        url: "/app/init",
        success: (res) => {
          const { id } = res.data.area;
          app.globalData.utils.request({
            url: "/Index/index",
            data: {
              aid: id
            },
            success: ({ data }) => {
              slides.value = data.slides;
              nav2.value = data.nav2s;
              navs.value = data.navs;
              hospitals.value = data.hospitals;
            }
          });
        }
      });
    });
    const message = common_vendor.ref("");
    const handleData = (data) => {
      message.value = data;
    };
    common_vendor.ref("你好");
    const jump = (nav, type) => {
      if (nav.stype == 1) {
        common_vendor.index.navigateTo({
          url: nav.stype_link
        });
      }
    };
    const onNav2Tap = (event) => {
      const nav = common_vendor.toRaw(nav2.value)[event.currentTarget.dataset.index];
      jump(nav);
    };
    const onNavTap = (event) => {
      const nav = common_vendor.toRaw(navs.value)[event.currentTarget.dataset.index];
      jump(nav);
    };
    const toHospital = (event) => {
      common_vendor.index.navigateTo({
        url: "../hospital/index?hid=" + event.currentTarget.dataset.hid
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr("navBar", "4d3c71e3-0"),
        b: common_vendor.o(handleData),
        c: common_vendor.s("height:" + message.value + "rpx;"),
        d: common_vendor.p({
          isHome: true
        }),
        e: common_assets._imports_0,
        f: common_assets._imports_0$1,
        g: slides.value && slides.value.length > 0
      }, slides.value && slides.value.length > 0 ? {
        h: common_vendor.f(slides.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: item.id
          };
        })
      } : {}, {
        i: nav2.value && nav2.value.length > 0
      }, nav2.value && nav2.value.length > 0 ? {
        j: common_vendor.f(nav2.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: common_vendor.o(onNav2Tap, index),
            d: index
          };
        })
      } : {}, {
        k: navs.value && navs.value.length > 0
      }, navs.value && navs.value.length > 0 ? {
        l: common_vendor.f(navs.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.s("color:" + (item.tcolor ? item.tcolor : "") + ";"),
            d: index,
            e: common_vendor.o(onNavTap, index),
            f: index
          };
        })
      } : {}, {
        m: common_vendor.f(hospitals.value, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar_url : "../../static/resource/images/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.intro),
            f: item.id,
            g: item.id,
            h: common_vendor.o(toHospital, item.id)
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
