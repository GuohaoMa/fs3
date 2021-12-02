webpackJsonp([8],{"+SOK":function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=r("kl55"),l=r.n(t);for(var i in t)"default"!==i&&function(e){r.d(a,e,function(){return t[e]})}(i);var s=r("waDN");var o=function(e){r("XMHb")},u=r("VU/8")(l.a,s.a,!1,o,"data-v-5fbfd084",null);a.default=u.exports},XMHb:function(e,a){},kl55:function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t,l=r("mtWM"),i=(t=l)&&t.__esModule?t:{default:t};a.default={data:function(){return{width:document.body.clientWidth>600?"400px":"95%",dialogWidth:document.body.clientWidth<=600?"95%":"50%",dialogVisible:!1,dialogConfirm:!1,ruleForm:{name:"",price:"",duration:"",verified:"2",fastRetirval:"1",frequency:"1",frequencyOptions:[{value:"1",label:"Backup Daily"},{value:"7",label:"Backup Weekly"}],region:"Global",regionOptions:[{value:"Global",label:"Global"},{value:"Asia",label:"Asia"},{value:"Africa",label:"Africa"},{value:"North America",label:"North America"},{value:"Sorth America",label:"Sorth America"},{value:"Europe",label:"Europe"},{value:"Oceania",label:"Oceania"}]},rules:{name:[{required:!0,message:"Please enter Backup plan Name",trigger:"blur"}],price:[{required:!0,message:"Please enter Price",trigger:"blur"}],duration:[{required:!0,message:"Please enter Duration",trigger:"blur"}]}}},watch:{},methods:{confirm:function(){this.dialogVisible=!1,this.dialogConfirm=!0},submitForm:function(e){var a=this;a.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var r={BackupPlanName:a.ruleForm.name,BackupInterval:a.ruleForm.frequency,Price:a.ruleForm.price,Duration:String(24*a.ruleForm.duration*60*2),VerifiedDeal:"2"!=a.ruleForm.verified,FastRetrieval:"2"!=a.ruleForm.fastRetirval},t=a.data_api+"/minio/backup/add/plan";i.default.post(t,r,{headers:{Authorization:"Bearer "+a.$store.getters.accessToken}}).then(function(e){var r=e.data;if("success"!=r.status)return a.$message.error(r.message),!1;a.dialogVisible=!0}).catch(function(e){console.log(e)})})}},mounted:function(){}}},waDN:function(e,a,r){"use strict";var t={render:function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"fs3_back"},[e._m(0),e._v(" "),r("div",{staticClass:"fs3_cont"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"Backup plan name:",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Choose your backup frequency:",prop:"frequency"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.ruleForm.frequency,callback:function(a){e.$set(e.ruleForm,"frequency",a)},expression:"ruleForm.frequency"}},e._l(e.ruleForm.frequencyOptions,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"Price:",prop:"price"}},[r("el-input",{staticClass:"input",attrs:{onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,20})?).*$/g, '$1')"},model:{value:e.ruleForm.price,callback:function(a){e.$set(e.ruleForm,"price",a)},expression:"ruleForm.price"}}),e._v(" FIL\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"Duration:",prop:"duration"}},[r("el-input",{staticClass:"input",attrs:{onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},model:{value:e.ruleForm.duration,callback:function(a){e.$set(e.ruleForm,"duration",a)},expression:"ruleForm.duration"}}),e._v(" Days\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"Verified-Deal:",prop:"verified"}},[r("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.verified,callback:function(a){e.$set(e.ruleForm,"verified",a)},expression:"ruleForm.verified"}},[e._v("Yes")]),e._v(" "),r("el-radio",{attrs:{label:"2"},model:{value:e.ruleForm.verified,callback:function(a){e.$set(e.ruleForm,"verified",a)},expression:"ruleForm.verified"}},[e._v("No")])],1),e._v(" "),r("el-form-item",{attrs:{label:"Fast-Retrival:",prop:"fastRetirval"}},[r("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.fastRetirval,callback:function(a){e.$set(e.ruleForm,"fastRetirval",a)},expression:"ruleForm.fastRetirval"}},[e._v("Yes")]),e._v(" "),r("el-radio",{attrs:{label:"2"},model:{value:e.ruleForm.fastRetirval,callback:function(a){e.$set(e.ruleForm,"fastRetirval",a)},expression:"ruleForm.fastRetirval"}},[e._v("No")])],1),e._v(" "),r("el-form-item",[r("el-button",{on:{click:function(a){return e.submitForm("ruleForm")}}},[e._v("Create")])],1)],1)],1),e._v(" "),r("el-dialog",{attrs:{title:e.ruleForm.name,"custom-class":"formStyle",visible:e.dialogVisible,width:e.dialogWidth},on:{"update:visible":function(a){e.dialogVisible=a}}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"statusStyle"},[r("div",{staticClass:"list"},[r("span",[e._v("Backup frequency:")]),e._v(" "+e._s("1"==e.ruleForm.frequency?"Backup Daily":"Backup Weekly"))]),e._v(" "),r("div",{staticClass:"list"},[r("span",[e._v("Price:")]),e._v(" "+e._s(e.ruleForm.price)+" FIL")]),e._v(" "),r("div",{staticClass:"list"},[r("span",[e._v("Duration:")]),e._v(" "+e._s(e.ruleForm.duration)+" days")]),e._v(" "),r("div",{staticClass:"list"},[r("span",[e._v("Verified deal:")]),e._v(" "+e._s("2"==e.ruleForm.verified?"No":"Yes"))]),e._v(" "),r("div",{staticClass:"list"},[r("span",[e._v("Fast retrieval:")]),e._v(" "+e._s("2"==e.ruleForm.fastRetirval?"No":"Yes"))])])]),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.confirm}},[e._v("OK")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"Backup Plans","custom-class":"formStyle",visible:e.dialogConfirm,width:e.dialogWidth},on:{"update:visible":function(a){e.dialogConfirm=a}}},[r("span",{staticClass:"span"},[e._v("Your backup has created successfully")]),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("router-link",{attrs:{to:{name:"my_account_myPlans"}}},[e._v("VIEW")]),e._v(" "),r("el-button",{on:{click:function(a){e.dialogConfirm=!1}}},[e._v("OK")])],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"fs3_head"},[a("div",{staticClass:"fs3_head_text"},[a("div",{staticClass:"titleBg"},[this._v("Backup Plans")]),this._v(" "),a("h1",[this._v("Backup Plans")])]),this._v(" "),a("img",{staticClass:"bg",attrs:{src:r("3Msz"),alt:""}})])}]};a.a=t}});