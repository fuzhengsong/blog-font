webpackJsonp([3],{HIhP:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t("aozt");var a=t("hiWG"),r={data:function(){return{username:"",password:"",againPassword:""}},methods:{doRegister:function(){var s=this;return""===this.name||""===this.password||""===this.againPassword?this.$message.error("error"):this.password!==this.againPassword?this.$message.error("密码不一致"):void a.k.execute({username:this.username,password:this.password}).then(function(e){s.$message.success("注册成功"),s.$router.push({name:"user_index"}),s.resetData()})},resetData:function(){this.username="",this.password="",this.againPassword=""}}},i={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("section",{staticClass:"user-register"},[t("div",{staticClass:"register-box"},[t("h1",{staticClass:"box-header"},[s._v("用户注册")]),s._v(" "),t("el-form",[t("el-row",{staticClass:"field"},[t("el-col",{attrs:{span:8}},[s._v("用户名：")]),s._v(" "),t("el-col",{attrs:{span:16}},[t("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:s.username,callback:function(e){s.username="string"==typeof e?e.trim():e},expression:"username"}})],1)],1),s._v(" "),t("el-row",{staticClass:"field"},[t("el-col",{attrs:{span:8}},[s._v("密码：")]),s._v(" "),t("el-col",{attrs:{span:16}},[t("el-input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:s.password,callback:function(e){s.password="string"==typeof e?e.trim():e},expression:"password"}})],1)],1),s._v(" "),t("el-row",{staticClass:"field"},[t("el-col",{attrs:{span:8}},[s._v("重复密码：")]),s._v(" "),t("el-col",{attrs:{span:16}},[t("el-input",{attrs:{placeholder:"再次输入密码",type:"password"},model:{value:s.againPassword,callback:function(e){s.againPassword="string"==typeof e?e.trim():e},expression:"againPassword"}})],1)],1)],1),s._v(" "),t("div",{staticClass:"submit-button"},[t("el-button",{attrs:{type:"primary"},on:{click:s.doRegister}},[s._v("注册")]),s._v(" "),t("router-link",{staticClass:"to-register",attrs:{to:{name:"user_login"}}},[s._v("去登录")])],1)],1)])},staticRenderFns:[]};var o=t("C7Lr")(r,i,!1,function(s){t("pX81")},"data-v-ca66abfe",null);e.default=o.exports},pX81:function(s,e){}});
//# sourceMappingURL=3.0326e4c385dd1453a0ca.js.map