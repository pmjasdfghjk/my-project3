"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js");if(!Array){(e.resolveComponent("navbar")+e.resolveComponent("share"))()}Math||((()=>"../../components/navbar/navbar.js")+(()=>"../../components/share/share.js"))();const t={__name:"index",setup(t){const o=e.ref([]),r=e.ref({}),s=getApp(),i=e.ref(""),l=e=>{i.value=e,console.log(i.value)},n=e.ref(""),u=e=>{n.value=e.detail.navBarHeight},v=()=>{d.value=!0};e.onLoad((e=>{s.globalData.utils.request({url:"/Hospital/index",data:{hid:e.hid},success:e=>{r.value=e.data.hospital,console.log(e,"我是医院详情的数据"),o.value=e.data.services}})}));const d=e.ref(!1),c=()=>{},p=a=>{e.index.navigateTo({url:"../service/index?hid="+r.value.id+"&svid="+a.currentTarget.dataset.svid})};return(t,s)=>({a:e.o(u),b:e.o(l),c:e.s("height:"+i.value+"rpx;"),d:e.p({"title-text":"",isHeight:!1,isWhite:!0,background:"none"}),e:r.value.avatar_url,f:r.value.avatar_url,g:e.t(r.value.name),h:e.t(r.value.rank),i:e.t(r.value.label),j:e.o(v),k:a._imports_0$4,l:e.t(r.value.city),m:e.t(r.value.district),n:e.t(r.value.address),o:e.o(c),p:e.f(o.value,((a,t,o)=>e.e({a:1==a.use_switch},1==a.use_switch?{b:a.logo_image?a.logo_image_url:"../../resource/images/avatar.jpg",c:e.t(a.name),d:e.t(a.intro),e:e.t(a.price)}:{},{f:e.o(p,t),g:a.id,h:t}))),q:e.s("position:absolute;top:"+n.value+"rpx;padding-top:65rpx;overflow:hidden;width:100%;"),r:e.p({shareModal:d.value})})}};wx.createPage(t);