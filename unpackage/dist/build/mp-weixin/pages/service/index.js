"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js");if(!Array){(e.resolveComponent("dtPicker")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../components/dtPicker/dtPicker.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const t={__name:"index",setup(t){const o=e.ref(),i=e.reactive({phone:"",ValidityState:"",validCode:""}),s=e.reactive({validText:"获取验证码",time:"60"}),n=e.ref(),l=e.ref(!1),r=e.ref({}),d=getApp(),c=e.ref([]),u=e.reactive({page_xy:"1",page_fw:"2"}),v=e.ref(0),p=e.reactive({price:"",starttime:"",address:{userName:"",cityName:"",countyName:"",detailInfo:""},receiveAddress:"",tel:"",demand:""}),m=e.reactive({name:""});e.onLoad((e=>{console.log(e),g(e)}));const g=a=>{d.globalData.utils.request({url:"/Service/order",data:{svid:a.svid},success:t=>{r.value=t.data.service,console.log(r.value,"哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇"),c.value=t.data.hospitals;const o=e.toRaw(c.value);if(a.hid>0)for(let e=0;e<o.length;e++)if(o[e].id==a.hid){v.value=e,p.price=o[e].service_price;break}}})},y=()=>{},f=a=>{const t=parseInt(a.detail.value);v.value=t,p.price=e.toRaw(c.value)[t].service_price},h=e=>{p.starttime=e.detail.value};console.log(p.starttime,"我是开始的使劲");const x=()=>{e.index.navigateTo({url:"../clients/index?act=select"})};e.index.$on("clientsChange",(e=>{console.log(e,"我是或者"),m.name=e.name,m.id=e.user_id,m.sex=e.sex,m.age=e.age,m.mobile=e.mobile}));const _=()=>{l.value=!l.value},w=()=>{e.index.chooseAddress({success:e=>{console.log(e),p.address.userName=e.userName,p.address.cityName=e.cityName,p.address.countyName=e.countyName,p.address.detailInfo=e.detailInfo,console.log(p)},fail:e=>{console.log(e,"err")}})};let T;const k=()=>{if(!l.value)return e.index.showToast({title:"请先勾选",icon:"none",duration:1e3});const a=e.toRaw(p),t=e.toRaw(r.value),o=e.toRaw(c.value),i=e.toRaw(m);if(a.service_code=t.code,a.service_id=t.id,a.service_stype=t.stype,a.service_name=t.name,t.type<100&&((v.value=0)&&e.index.showToast({title:"请选择医院",icon:"none",duration:1e3}),a.hospital_id=o[v.value].id,a.hospital_name=o[v.value].name),!a.starttime)return e.index.showToast({title:"请选择时间",icon:"none",duration:1e3});if(10==t.stype||15==t.stype||20==t.stype){if(!i.id)return e.index.showToast({title:"请选择就诊人",icon:"none",duration:1e3});if(a.client={},a.client.age=i.age,a.client.name=i.name,a.client.mobile=i.mobile,a.client.sex=i.sex,15==t.stype&&!a.receiveAddress)return e.index.showToast({title:"请输入接送地址",icon:"none",duration:1e3});if((30==t.stype||40==t.stype)&&a.address.userName)return e.index.showToast({title:"请选择收件信息",icon:"none",duration:1e3});if(!a.tel)return e.index.showToast({title:"请添加联系电话",icon:"none",duration:1e3})}a.hospital_id=o[v.value].id,a.hospital_name=o[v.value].name,T=a,e.index.getStorageSync("token")?(a.hospital_id=o[v.value].id,a.hospital_name=o[v.value].name,P(a)):b()},b=()=>{n.value.open()},N=()=>{n.value.close()},C=()=>{if(!i.phone||!i.validCode)return e.index.showToast({title:"请检查填写的数据",icon:"none",duration:1e3});d.globalData.utils.request({url:"/user/authentication",method:"POST",data:{tel:i.phone,code:i.validCode},success:a=>{e.index.setStorageSync("token",a.data.token),P(T)},fail:a=>e.index.showToast({title:"请检查填写的数据!!!!!!!!",icon:"none",duration:1e3})})};let S=!1;const q=()=>{if(!i.phone)return e.index.showToast({title:"请输入正确的手机号码",icon:"none",duration:1e3});if(S)return;const a=setInterval((()=>{s.time<=0?(s.validText="获取验证码",s.time=60,S=!1,clearInterval(a)):(s.time-=1,s.validText=`剩余${s.time}s`,S=!0)}),1e3);d.globalData.utils.request({url:"/get/code",method:"POST",data:{tel:i.phone},success:a=>(console.log(a),e.index.showToast({title:"验证码发送成功，请尽快验证",icon:"none",duration:1e3})),fail:a=>(console.log(a,"我是失败的回调res"),e.index.showToast({title:a.msg,icon:"none",duration:1e3}))})},P=a=>{console.log(a,"我是最后要发送的综合数据的结果"),d.globalData.utils.request({url:"/pay/createOrder",method:"POST",header:{token:e.index.getStorageSync("token")},data:a,success:a=>{console.log(a),o.value.open("center");const t=new e.UQRCode;t.data=a.wx_code,t.size=150,t.make();var i=e.index.createCanvasContext("qrcode");t.canvasContext=i,t.drawCanvas()},fail:e=>{console.log(e)}})},A=()=>{e.index.switchTab({url:"../order/index"})};return(t,d)=>e.e({a:a._imports_0$5,b:r.value.icon_image?r.value.icon_image_url:"../../static/resource/images/avatar.jpg",c:e.t(r.value.name),d:e.o(y),e:10==r.value.stype||15==r.value.stype||20==r.value.stype},10==r.value.stype||15==r.value.stype||20==r.value.stype?e.e({f:c.value[v.value].name,g:e.o(f),h:v.value,i:c.value,j:e.o(h),k:e.p({timestamp:p.starttime,placeholder:"请选择就诊时间"}),l:m.name,m:e.o(x),n:15==r.value.stype},15==r.value.stype?{o:p.receiveAddress,p:e.o((e=>p.receiveAddress=e.detail.value)),q:p.tel,r:e.o((e=>p.tel=e.detail.value))}:{}):{},{s:30==r.value.stype||40==r.value.stype},30==r.value.stype||40==r.value.stype?{t:c.value[v.value].name,v:e.o(f),w:v.value,x:c.value,y:e.o(h),z:e.p({timestamp:p.starttime,placeholder:"请选择期望服务时间"}),A:p.address.userName?p.address.userName+"("+p.address.cityName+p.address.countyName+p.address.detailInfo+")":"",B:e.o(w),C:p.tel,D:e.o((e=>p.tel=e.detail.value))}:{},{E:p.demand,F:e.o((e=>p.demand=e.detail.value)),G:e.n("is_xieyi "+(l.value?"is_xieyi_on":"")),H:e.o(_),I:u.page_xy,J:u.page_fw,K:p.price>0},p.price>0?{L:e.t(p.price)}:{},{M:e.n("btnp "+(l.value?"":"btnp-disabled")),N:e.o(k),O:i.phone,P:e.o((e=>i.phone=e.detail.value)),Q:i.validCode,R:e.o((e=>i.validCode=e.detail.value)),S:e.t(s.validText),T:e.o(q),U:e.o(N),V:e.o(C),W:e.sr(n,"01fdeaf4-2",{k:"popup"}),X:e.p({type:"center","is-mask-click":!1,"background-color":"#fff"}),Y:a._imports_0$1,Z:e.o(A),aa:e.sr(o,"01fdeaf4-3",{k:"qrcodePopue"}),ab:e.p({type:"center","is-mask-click":!1,"background-color":"#fff"})})}};wx.createPage(t);