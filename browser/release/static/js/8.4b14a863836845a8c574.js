webpackJsonp([8],{"3O07":function(t,s){},cjjY:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a,i=e("mtWM"),o=(a=i)&&a.__esModule?a:{default:a};s.default={data:function(){return{width:document.body.clientWidth>600?"400px":"95%",card:[{title:"Your backup jobs",btn:"All backup jobs details",inProcessJobs:0,completedJobs:0,failedJobs:0},{title:"Your rebuild jobs",btn:"All rebuild jobs details",inProcessJobs:0,completedJobs:0,failedJobs:0}]}},watch:{},methods:{link:function(t){var s=t?"rebuild_job":"backup_job";this.$router.push({name:"my_account_dashboard_detail",params:{type:s}})},getData:function(){var t=this,s={Offset:0,Limit:10};o.default.post(t.data_api+"/minio/backup/retrieve/volume",s,{headers:{Authorization:"Bearer "+t.$store.getters.accessToken}}).then(function(s){var e=s.data;if("success"!=e.status)return t.$message.error(e.message),!1;t.card[0].inProcessJobs=e.data.inProcessVolumeBackupTasksCounts,t.card[0].completedJobs=e.data.completedVolumeBackupTasksCounts,t.card[0].failedJobs=e.data.failedVolumeBackupTasksCounts}).catch(function(t){console.log(t)}),o.default.post(t.data_api+"/minio/rebuild/retrieve/volume",s,{headers:{Authorization:"Bearer "+t.$store.getters.accessToken}}).then(function(s){var e=s.data;if("success"!=e.status)return t.$message.error(e.message),!1;t.card[1].inProcessJobs=e.data.inProcessVolumeRebuildTasksCounts,t.card[1].completedJobs=e.data.completedVolumeRebuildTasksCounts,t.card[1].failedJobs=e.data.failedVolumeRebuildTasksCounts}).catch(function(t){console.log(t)})}},mounted:function(){this.getData()}}},"fCj+":function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"fs3_back"},[t._m(0),t._v(" "),e("div",{staticClass:"fs3_cont"},[e("el-row",t._l(t.card,function(s,a){return e("el-col",{key:a,attrs:{span:12}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v(t._s(s.title))])]),t._v(" "),e("div",{staticClass:"statusStyle"},[e("div",{staticClass:"list"},[e("svg",{staticClass:"icon",attrs:{t:"1638936551170",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3518",width:"128",height:"128"}},[e("path",{attrs:{d:"M661.333333 170.666667l253.866667 34.133333-209.066667 209.066667zM362.666667 853.333333L108.8 819.2l209.066667-209.066667zM170.666667 362.666667L204.8 108.8l209.066667 209.066667z",fill:"#f8b551","p-id":"3519"}}),e("path",{attrs:{d:"M198.4 452.266667l-89.6 17.066666c-2.133333 14.933333-2.133333 27.733333-2.133333 42.666667 0 98.133333 34.133333 192 98.133333 264.533333l64-55.466666C219.733333 663.466667 192 588.8 192 512c0-19.2 2.133333-40.533333 6.4-59.733333zM512 106.666667c-115.2 0-217.6 49.066667-292.266667 125.866666l59.733334 59.733334C339.2 230.4 420.266667 192 512 192c19.2 0 40.533333 2.133333 59.733333 6.4l14.933334-83.2C563.2 108.8 537.6 106.666667 512 106.666667zM825.6 571.733333l89.6-17.066666c2.133333-14.933333 2.133333-27.733333 2.133333-42.666667 0-93.866667-32-185.6-91.733333-258.133333l-66.133333 53.333333c46.933333 57.6 72.533333 130.133333 72.533333 202.666667 0 21.333333-2.133333 42.666667-6.4 61.866666zM744.533333 731.733333C684.8 793.6 603.733333 832 512 832c-19.2 0-40.533333-2.133333-59.733333-6.4l-14.933334 83.2c25.6 4.266667 51.2 6.4 74.666667 6.4 115.2 0 217.6-49.066667 292.266667-125.866667l-59.733334-57.6z",fill:"#f8b551","p-id":"3520"}}),e("path",{attrs:{d:"M853.333333 661.333333l-34.133333 253.866667-209.066667-209.066667z",fill:"#f8b551","p-id":"3521"}})]),t._v(" \n              In process jobs: "+t._s(s.inProcessJobs)+"\n            ")]),t._v(" "),e("div",{staticClass:"list"},[e("span",{staticClass:"el-icon-success"}),t._v(" Completed jobs: "+t._s(s.completedJobs))]),t._v(" "),e("div",{staticClass:"list"},[e("span",{staticClass:"el-icon-error"}),t._v(" Failed jobs: "+t._s(s.failedJobs))])]),t._v(" "),e("el-button",{on:{click:function(s){return t.link(a)}}},[t._v(t._s(s.btn))])],1)],1)}),1)],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"fs3_head"},[s("div",{staticClass:"fs3_head_text"},[s("div",{staticClass:"titleBg"},[this._v("Dashboard")]),this._v(" "),s("h1",[this._v("Dashboard")])]),this._v(" "),s("img",{staticClass:"bg",attrs:{src:e("3Msz"),alt:""}})])}]};s.a=a},zdve:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("cjjY"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(s,t,function(){return a[t]})}(o);var c=e("fCj+");var l=function(t){e("3O07")},r=e("VU/8")(i.a,c.a,!1,l,"data-v-5fce513b",null);s.default=r.exports}});