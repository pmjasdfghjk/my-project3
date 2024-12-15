"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "share",
  props: ["shareModal"],
  setup(__props) {
    const props = __props;
    const shareModalClone = common_vendor.ref(false);
    const preventTouchMove = () => {
    };
    const hideShareModal = () => {
      shareModalClone.value = false;
    };
    const shareByPoster = () => {
    };
    common_vendor.watch(() => props.shareModal, (val) => {
      shareModalClone.value = val;
    }, { immediate: true });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: shareModalClone.value
      }, shareModalClone.value ? {
        b: common_vendor.o(preventTouchMove)
      } : {}, {
        c: shareModalClone.value
      }, shareModalClone.value ? {
        d: common_vendor.o(hideShareModal),
        e: common_assets._imports_0$1,
        f: common_vendor.o(hideShareModal),
        g: common_assets._imports_1$2,
        h: common_assets._imports_2$1,
        i: common_vendor.o(shareByPoster)
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
