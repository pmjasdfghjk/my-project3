"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    background: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    color: {
      type: String,
      default: "rgba(0,0,0,1)"
    },
    fontSize: {
      type: Number,
      default: 32
    },
    iconWidth: {
      type: Number,
      default: 116
    },
    iconHeight: {
      type: Number,
      default: 38
    },
    titleText: {
      type: String,
      default: "标题"
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  emits: ["sendData", "navBarAttached"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const pages = common_vendor.ref(getCurrentPages().length);
    const props = __props;
    const menu = common_vendor.ref(common_vendor.index.getMenuButtonBoundingClientRect());
    const containerStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const status = common_vendor.ref(0);
    const navHeight = common_vendor.ref(0);
    const setNavSize = () => {
      const { system, statusBarHeight } = common_vendor.index.getSystemInfoSync();
      status.value = statusBarHeight * 2;
      const isIOS = system.indexOf("ios") > -1;
      if (!isIOS) {
        navHeight.value = 96;
      } else {
        navHeight.value = 88;
      }
    };
    common_vendor.onBeforeMount(() => {
      setNavSize();
      setStyle();
      sendValue();
      sendValue2();
    });
    const setStyle = () => {
      containerStyle.value = ["background:" + props.background].join(";");
      textStyle.value = ["color:" + props.color, "font-size:" + props.fontSize + "rpx"].join(";");
      iconStyle.value = ["width:" + props.iconWidth + "rpx", "height:" + props.iconHeight + "rpx"].join(";");
    };
    const backorhome = () => {
      if (pages.value > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    };
    const sendValue2 = () => {
      emit("navBarAttached", {
        detail: {
          statusHeight: status.value,
          navHeight: navHeight.value,
          navBarHeight: status.value + navHeight.value
        }
      });
    };
    const sendValue = () => {
      const he = common_vendor.ref(status.value + navHeight.value);
      emit("sendData", he.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + status.value + "rpx;" + containerStyle.value),
        b: __props.isHome
      }, __props.isHome ? {
        c: common_vendor.s("height:" + menu.value.height * 2 + "rpx;line-height:" + menu.value.height * 2 + "rpx;margin-top:" + (menu.value.top * 2 - status.value) + "rpx;margin-left:32rpx;margin-right:" + (menu.value.width * 2 + 24) + "rpx;background:#f4f4f4;border-radius:200rpx;text-align:center;"),
        d: common_vendor.s("height:" + navHeight.value + "rpx;line-height:" + navHeight.value + "rpx;padding-left:20rpx;")
      } : common_vendor.e({
        e: pages.value > 1
      }, pages.value > 1 ? {
        f: common_assets._imports_0$6
      } : {
        g: common_assets._imports_1$1
      }, {
        h: common_vendor.o(backorhome),
        i: __props.titleText
      }, __props.titleText ? {
        j: common_vendor.t(__props.titleText),
        k: common_vendor.s("height:" + navHeight.value + "rpx;line-height:" + navHeight.value + "rpx;" + textStyle.value)
      } : {}, {
        l: common_vendor.s("height:" + navHeight.value + "rpx;" + containerStyle.value)
      }), {
        m: common_vendor.s("height:" + (navHeight.value + status.value) + "rpx;")
      });
    };
  }
};
wx.createComponent(_sfc_main);
