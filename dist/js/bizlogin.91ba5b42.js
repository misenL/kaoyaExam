(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bizlogin"],{1654:function(t,e,n){"use strict";var i=n("71c1")(!0);n("30f1")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},"1a66":function(t,e,n){"use strict";var i=n("468d"),o=n.n(i);o.a},"278d":function(t,e,n){"use strict";var i=n("5f31"),o=n.n(i);o.a},2955:function(t,e,n){},"30f1":function(t,e,n){"use strict";var i=n("b8e3"),o=n("63b6"),a=n("9138"),r=n("35e8"),s=n("481b"),c=n("8f60"),u=n("45f2"),l=n("53e2"),h=n("5168")("iterator"),f=!([].keys&&"next"in[].keys()),d="@@iterator",g="keys",b="values",p=function(){return this};t.exports=function(t,e,n,v,m,y,A){c(n,e,v);var Q,L,C,E=function(t){if(!f&&t in S)return S[t];switch(t){case g:return function(){return new n(this,t)};case b:return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",N=m==b,I=!1,S=t.prototype,G=S[h]||S[d]||m&&S[m],D=G||E(m),k=m?N?E("entries"):D:void 0,B="Array"==e&&S.entries||G;if(B&&(C=l(B.call(new t)),C!==Object.prototype&&C.next&&(u(C,_,!0),i||"function"==typeof C[h]||r(C,h,p))),N&&G&&G.name!==b&&(I=!0,D=function(){return G.call(this)}),i&&!A||!f&&!I&&S[h]||r(S,h,D),s[e]=D,s[_]=p,m)if(Q={values:N?D:E(b),keys:y?D:E(g),entries:k},A)for(L in Q)L in S||a(S,L,Q[L]);else o(o.P+o.F*(f||I),e,Q);return Q}},"456d":function(t,e,n){var i=n("4bf8"),o=n("0d58");n("5eda")("keys",function(){return function(t){return o(i(t))}})},"468d":function(t,e,n){},"481b":function(t,e){t.exports={}},"4fff":function(t,e,n){},"50ed":function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},"53e2":function(t,e,n){var i=n("07e3"),o=n("241e"),a=n("5559")("IE_PROTO"),r=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),i(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?r:null}},"5d58":function(t,e,n){t.exports=n("d8d6")},"5dd1":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"confirmJoinContent"},[i("img",{attrs:{src:n("d4e8"),alt:"",srcset:""}}),i("p",{staticClass:"fontSize"},[t._v("对方邀请您加入商家")]),i("p",[t._v("【考点】："+t._s(t.school_name)+" | 【商家】："+t._s(t.biz_name))]),i("span",[t._v("点击下方按钮即可绑定成为员工")])]),i("div",{staticClass:"confirmJoinBtn",on:{click:t.toRouterProfit}},[t._v("接受邀请")])])},o=[],a=n("5d58"),r=n.n(a),s=n("67bb"),c=n.n(s);function u(t){return u="function"===typeof c.a&&"symbol"===typeof r.a?function(t){return typeof t}:function(t){return t&&"function"===typeof c.a&&t.constructor===c.a&&t!==c.a.prototype?"symbol":typeof t},u(t)}function l(t){return l="function"===typeof c.a&&"symbol"===u(r.a)?function(t){return u(t)}:function(t){return t&&"function"===typeof c.a&&t.constructor===c.a&&t!==c.a.prototype?"symbol":u(t)},l(t)}var h={data:function(){return{joinQuery:"",school_name:"",biz_name:""}},created:function(){this.joinQuery=this.$route.query,console.log("joinQuery:",this.joinQuery),this.getExaminfo()},methods:{getExaminfo:function(){var t=this,e="/api/biz/info?biz_id="+this.joinQuery.biz_id,n="/api/bizuser/info";this.axios.get(e).then(function(e){e=e.data,0===e.code&&e.data!==[]&&(t.school_name=e.data.examination_info.school_name,t.biz_name=e.data.biz_name)}).catch(function(e){t.$notify(res.msg)}),this.axios.get(n).then(function(e){e=e.data,console.log("判断用户有没有注册:",e.data),0===e.code&&(e.data===[]?t.$router.push({path:"/biz/login",query:t.joinQuery}):t.joinQuery.user_id=e.data.user_info.id)}).catch(function(e){t.$notify(res.msg)})},toRouterProfit:function(){var t=this,e="/api/bizuser/bindbizuser?biz_id=".concat(this.joinQuery.biz_id,"&biz_user_id=").concat(this.joinQuery.user_id);console.log("acceptURL:",e),console.log("toRouterProfit:",this.joinQuery),this.axios.get(e).then(function(e){e=e.data,console.log(l(e.code)),0===e.code||"0"===e.code?t.$router.push({path:"/biz/profit?user_id=".concat(t.joinQuery.user_id,"&biz_id=").concat(t.joinQuery.biz_id)}):41001!==e.code&&"41001"!==e.code||alert("网络繁忙,"+e.msg)}).catch(function(e){t.$notify(e)})}}},f=h,d=(n("b5bf"),n("2877")),g=Object(d["a"])(f,i,o,!1,null,"5ced88a0",null);e["default"]=g.exports},"5eda":function(t,e,n){var i=n("5ca1"),o=n("8378"),a=n("79e5");t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],r={};r[t]=e(n),i(i.S+i.F*a(function(){n(1)}),"Object",r)}},"5f31":function(t,e,n){},"67bb":function(t,e,n){t.exports=n("f921")},"69a4":function(t,e,n){"use strict";var i=n("2955"),o=n.n(i);o.a},"69d3":function(t,e,n){n("6718")("asyncIterator")},"6c1c":function(t,e,n){n("c367");for(var i=n("e53d"),o=n("35e8"),a=n("481b"),r=n("5168")("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<s.length;c++){var u=s[c],l=i[u],h=l&&l.prototype;h&&!h[r]&&o(h,r,u),a[u]=a.Array}},"71c1":function(t,e,n){var i=n("3a38"),o=n("25eb");t.exports=function(t){return function(e,n){var a,r,s=String(o(e)),c=i(n),u=s.length;return c<0||c>=u?t?"":void 0:(a=s.charCodeAt(c),a<55296||a>56319||c+1===u||(r=s.charCodeAt(c+1))<56320||r>57343?t?s.charAt(c):a:t?s.slice(c,c+2):r-56320+(a-55296<<10)+65536)}}},"765d":function(t,e,n){n("6718")("observable")},"78d9":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"QRcode"},[n("span",[t._v("员工注册二维码")]),n("span",[t._v("扫描以下二维码，即可邀请您的团队成员参与核销商品")]),n("img",{attrs:{src:"data:image/png;base64,"+t.QRimg,alt:"",srcset:""}})])},o=[],a={data:function(){return{QRimg:""}},created:function(){var t=this,e=this.$route.query;console.log("getuserInfo:",e),this.axios.get("/api/biz/createstaff?bizid=".concat(e.biz_id)).then(function(e){e=e.data,0===e.code?(console.log(e),t.QRimg=e.data):t.$notify(e.msg)}).catch(function(e){t.$notify(res.msg)})}},r=a,s=(n("1a66"),n("2877")),c=Object(s["a"])(r,i,o,!1,null,"1eba9a5e",null);e["default"]=c.exports},"7a1d":function(t,e,n){t.exports=n.p+"img/examAlertClose.c10878c2.png"},8436:function(t,e){t.exports=function(){}},"8b22":function(t,e,n){t.exports=n.p+"img/VCode.01bff741.png"},"8f60":function(t,e,n){"use strict";var i=n("a159"),o=n("aebd"),a=n("45f2"),r={};n("35e8")(r,n("5168")("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(r,{next:o(1,n)}),a(t,e+" Iterator")}},9347:function(t,e){t.exports="data:image/png;base64,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"},ac6a:function(t,e,n){for(var i=n("cadf"),o=n("0d58"),a=n("2aba"),r=n("7726"),s=n("32e9"),c=n("84f2"),u=n("2b4c"),l=u("iterator"),h=u("toStringTag"),f=c.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},g=o(d),b=0;b<g.length;b++){var p,v=g[b],m=d[v],y=r[v],A=y&&y.prototype;if(A&&(A[l]||s(A,l,f),A[h]||s(A,h,v),c[v]=f,m))for(p in i)A[p]||a(A,p,i[p],!0)}},b5bf:function(t,e,n){"use strict";var i=n("4fff"),o=n.n(i);o.a},c207:function(t,e){},c367:function(t,e,n){"use strict";var i=n("8436"),o=n("50ed"),a=n("481b"),r=n("36c3");t.exports=n("30f1")(Array,"Array",function(t,e){this._t=r(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),a.Arguments=a.Array,i("keys"),i("values"),i("entries")},d4e8:function(t,e,n){t.exports=n.p+"img/confirmJoin.b8b2474d.png"},d8d6:function(t,e,n){n("1654"),n("6c1c"),t.exports=n("ccb9").f("iterator")},eb14:function(t,e,n){t.exports=n.p+"img/xiaozhi.7b66542a.jpg"},f4b9:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bizLoginParent"},[t._m(0),i("div",{staticClass:"login-form"},[i("el-select",{staticClass:"school bizInputStyle",attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择学校",disabled:!0,"remote-method":t.getSchool,loading:t.loading},model:{value:t.school_id,callback:function(e){t.school_id=e},expression:"school_id"}},t._l(t.schoolOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),i("van-cell-group",{staticClass:"phone bizInputStyle"},[i("img",{attrs:{src:n("9347"),alt:"",srcset:""}}),i("van-field",{attrs:{type:"number",maxlength:"11",placeholder:"请输入手机号码"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("van-cell-group",{staticClass:"code bizInputStyle"},[i("img",{attrs:{src:n("8b22"),alt:"",srcset:""}}),i("van-field",{attrs:{type:"number",maxlength:"6",center:"",clearable:"",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}},[i("van-button",{attrs:{slot:"button",size:"small",type:"primary",disabled:t.isPhone||t.wait},on:{click:t.sendCode},slot:"button"},[t._v(t._s(t.codeHint)+"\n          ")])],1)],1),i("div",{staticClass:"btnLoginDiv"},[i("van-button",{staticClass:"btn-login",attrs:{type:"default",disabled:!t.phone||!t.code},on:{click:t.doLogin}},[t._v("注册")])],1),i("div",{staticClass:"agreeCheck"},[i("p",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"checked"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.checked)?t._i(t.checked,null)>-1:t.checked},on:{change:function(e){var n=t.checked,i=e.target,o=!!i.checked;if(Array.isArray(n)){var a=null,r=t._i(n,a);i.checked?r<0&&(t.checked=n.concat([a])):r>-1&&(t.checked=n.slice(0,r).concat(n.slice(r+1)))}else t.checked=o}}}),i("span",[t._v("我已阅读并同意")]),i("span",{on:{click:t.zhikaoAgree}},[t._v("《小智助考协议》")])])])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showAgreeAlert,expression:"showAgreeAlert"}],staticClass:"showAgreeAlert"},[i("img",{staticClass:"agreeAlertColse",attrs:{src:n("7a1d")},on:{click:t.closeAgree}}),i("div",{staticClass:"agreeAlertContent"},[i("span",{staticClass:"ContentTop"},[t._v("\n          《小智助考协议》\n        ")]),i("span",{staticClass:"ContentTitle"},[t._v("欢迎注册小智助考")]),t._m(1),i("div",{staticClass:"IKnow",on:{click:function(e){return t.closeAgree("agree")}}},[t._v("\n          我同意\n        ")])])])])},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"headerImg"},[i("img",{attrs:{src:n("eb14"),alt:"",srcset:""}}),i("span",[t._v("小智助考")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"Content"},[n("b",[t._v("\n            以下内容是《小智助考协议》，在您注册前请务必审慎阅读、充分理解协议中相关条款内容。你一旦注册小智助考，即视为你已了解并完全同意本协议各项内容，包括小智助考对使用协议随时所做的任何修改。如你不同意本协议及/或随时对其的修改，请你立即停止注册及使用小智助考所提供的全部服务。\n          ")]),t._v("\n          1、为了能使用本服务，按照中国法律的要求，你同意以下事项：依本服务注册提示填写你正确的手机号码等信息，并确保今后更新的手机号码等资料的真实性、有效性和合法性。若你提供任何违法、不道德或小智助考认为不适合在网上展示的资料；或者小智助考有理由怀疑你的行为属于程序或恶意操作，小智助考有权无须事先通知即可暂停或终止你使用账号，并拒绝你于现在和未来使用本服务之全部或任何部分。"),n("br"),t._v("\n          2、用户账号及安全"),n("br"),t._v("\n          2.1 完成本服务的注册程序并成功注册之后，你可使用手机号码及验证码，登录到你在小智助考的账号（下称“账号”）。注册完成之时，你便获得了账号的使用权。保护账号安全，是你的责任。"),n("br"),t._v("\n          3、用户个人信息保护"),n("br"),t._v("\n          3.1 保护你个人信息安全既是法律要求，也是小智助考长期坚持的一项基本原则。你提供的注册资料及小智助考保留的有关你的其它资料将受到中国有关法律的保护。小智助考将根据中国法律及本协议的规定收集、存储、使用你的个人信息。"),n("br"),t._v("\n          3.2 一般情况下，你可随时浏览、修改你在小智助考上的个人信息，但出于安全性和身份识别的考虑，你可能无法修改注册时提供的初始注册信息及其他验证信息。"),n("br"),t._v("\n          3.3 在本平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本平台有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。"),n("br"),t._v("\n          4、服务变更、中断或终止"),n("br"),t._v("\n          4.1 小智助考可能会对服务内容进行变更、也可能会中断、终止服务。"),n("br"),t._v("\n          4.2 鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为或小智助考无法控制的情形），你同意小智助考有权随时中断或终止部分或全部的服务。"),n("br"),t._v("\n          4.3 你理解，小智助考需要定期或不定期对提供服务的平台或相关设备进行维护、升级或其他目的暂停部分或全部服务，如因此类情况而造成服务在合理时间内的中断，小智助考无需为此承担任何责任。瓣对你或任何第三人均不承担任何责任。"),n("br"),t._v("\n          5、担保与保证"),n("br"),t._v("\n          你明确了解并同意∶"),n("br"),t._v("\n          1）本使用协议的任何规定不会免除小智助考因过错而造成你人身伤害或财产损失的任何责任；"),n("br"),t._v("\n          2）小智助考不保证以下事项∶"),n("br"),t._v("\n          　　· 本服务将符合你的要求；"),n("br"),t._v("\n          　　· 本服务将不受干扰、及时提供、安全可靠或不会出错；"),n("br"),t._v("\n          　　· 使用本服务取得之结果正确可靠；"),n("br"),t._v("\n          　　· 你经由本服务购买或取得之任何产品、服务、资讯或其它信息将符合你的期望；"),n("br"),t._v("\n          3）是否使用本服务下载或取得任何资料应由你自行考虑且自负风险，因任何资料之下载而导致的你电脑系统之任何损坏或数据丢失等后果，由你自行承担；"),n("br"),t._v("\n          6、用户行为"),n("br"),t._v("\n          6.1 你应遵守中华人民共和国相关法律法规，并同意对以任何方式使用你的登录账号而使用本服务的任何行为及其结果承担全部责任。如你的行为违反国家法律，你将依法承担全部法律责任；如涉嫌构成犯罪，司法机关将追究你的刑事责任，小智助考将严格按照法律规定的义务及司法机关的要求进行配合。"),n("br"),t._v("\n          同时，如果小智助考有理由认为你的任何行为，包括但不限于你的任何言论或其它行为违反或可能违反国家法律法规的任何规定，小智助考可在任何时候不经任何事先通知终止向你提供服务。"),n("br"),t._v("\n          7、知识产权"),n("br"),t._v("\n          7.1 小智助考在本服务中提供的内容（包括但不限于网页、界面设计、版面框架、文字、、图片或其他资料等）等知识产权归小智助考或相关权利人所有。除另有约定外，小智助考标识及产品、服务名称，均为小智助考之商标。 "),n("br")])}],a=n("cebc"),r=(n("a481"),n("ac6a"),n("456d"),n("2f62")),s={name:"Login",data:function(){return{checked:!0,code:null,phone:null,isPhone:!0,wait:!1,showAgreeAlert:!1,codeHint:"获取验证码",schoolOptions:[],school_id:"",loading:!1,biz_id:null}},watch:{phone:function(){11===this.phone.length?this.isPhone=!1:this.isPhone=!0}},created:function(){var t=this,e=this.$route.query;if(0===Object.keys(e).length)this.axios.get("/api/bizuser/info").then(function(e){e=e.data,0===e.code&&(console.log(e.data),e.data!==[]?(console.log("info有内容"),t.$router.replace({path:"/biz/profit"})):t.$router.replace({path:"/contactAdmin"}))}).catch(function(e){t.$notify("ERR: 十分抱歉，网络繁忙，请稍后重试")});else e.expire_time;var n=this.$cookies.get("login");0!==Object.keys(e).length&&n&&(this.biz_id=e.biz_id,this.getSchoolByBizId())},methods:Object(a["a"])({},Object(r["b"])(["toggleUpdateUserInfoFlag"]),{getSchoolByBizId:function(){var t=this,e="/api/biz/info?biz_id="+this.biz_id;this.axios.get(e).then(function(e){if(e=e.data,0===e.code){var n={label:e.data.examination_info.school_name+"-"+e.data.biz_name,value:e.data.examination_info.school_id};console.log("biz:",n),t.schoolOptions.push(n),t.school_id=e.data.examination_info.school_name+"-"+e.data.biz_name}else t.$notify(e.msg)}).catch(function(e){t.$notify("ERR: 获取考场信息失败，请稍后重试！")})},getSchool:function(t){var e=this;if(""!==t){this.loading=!0;var n="/api/exam/searchhall?hall="+t;this.axios.get(n).then(function(t){t=t.data,0===t.code?(e.loading=!1,e.schoolOptions=[],t.data&&t.data.forEach(function(t){var n={};n.label=t.school_name,n.value=t.school_id,e.schoolOptions.push(n)})):e.$notify(t.msg)}).catch(function(t){e.loading=!1,e.$notify(t)})}},doLogin:function(){var t=this;this.axios.post("/api/bizuser/reg",{biz_id:this.biz_id,tel:this.phone,code:this.code,truename:"biz"}).then(function(e){e=e.data,0===e.code?(t.toggleUpdateUserInfoFlag(),t.$router.replace({path:"/biz/verify"})):t.$notify(e.msg)}).catch(function(e){t.$notify("ERR: 注册失败，请稍后重试！")})},sendCode:function(){var t=this;console.log(this.phone.length);var e=60;this.wait=!0,this.codeHint=e+"s后重试";var n=setInterval(function(){e--,0===e?(window.clearInterval(n),t.codeHint="发送验证码",t.wait=!1):t.codeHint=e+"s后重试"},1e3),i="/api/tool/telcode?tel="+this.phone;this.axios.get(i).then(function(e){e=e.data,0===e.code?t.$notify({message:"验证码发送成功",background:"#1989fa"}):t.$notify(e.msg)}).catch(function(e){t.$notify("数据获取失败")})},zhikaoAgree:function(){this.showAgreeAlert=!0},closeAgree:function(t){"agree"===t&&(this.checked=!0),this.showAgreeAlert=!1}})},c=s,u=(n("69a4"),n("278d"),n("2877")),l=Object(u["a"])(c,i,o,!1,null,null,null);e["default"]=l.exports},f921:function(t,e,n){n("014b"),n("c207"),n("69d3"),n("765d"),t.exports=n("584a").Symbol}}]);