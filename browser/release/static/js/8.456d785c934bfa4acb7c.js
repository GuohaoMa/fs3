webpackJsonp([8],{"2aiw":function(s,t,e){"use strict";var a={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"fs3_back"},[s._m(0),s._v(" "),e("div",{staticClass:"fs3_cont"},[e("el-row",s._l(s.card,function(t,a){return e("el-col",{key:a,attrs:{span:12}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[s._v(s._s(t.title))])]),s._v(" "),e("div",{staticClass:"statusStyle"},[e("div",{staticClass:"list"},[e("span",{staticClass:"el-icon-loading"}),s._v(" In process jobs: "+s._s(t.inProcessJobs))]),s._v(" "),e("div",{staticClass:"list"},[e("span",{staticClass:"el-icon-success"}),s._v(" Completed jobs: "+s._s(t.completedJobs))]),s._v(" "),e("div",{staticClass:"list"},[e("span",{staticClass:"el-icon-error"}),s._v(" Failed jobs: "+s._s(t.failedJobs))])]),s._v(" "),e("el-button",{on:{click:function(t){return s.link(a)}}},[s._v(s._s(t.btn))])],1)],1)}),1)],1)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"fs3_head"},[t("div",{staticClass:"fs3_head_text"},[t("div",{staticClass:"titleBg"},[this._v("Dashboard")]),this._v(" "),t("h1",[this._v("Dashboard")])]),this._v(" "),t("img",{staticClass:"bg",attrs:{src:e("3Msz"),alt:""}})])}]};t.a=a},"7zB3":function(s,t){},cjjY:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=e("mtWM"),i=(a=o)&&a.__esModule?a:{default:a};t.default={data:function(){return{width:document.body.clientWidth>600?"400px":"95%",card:[{title:"Your backup jobs",btn:"All backup jobs details",inProcessJobs:0,completedJobs:0,failedJobs:0},{title:"Your rebuild jobs",btn:"All rebuild jobs details",inProcessJobs:0,completedJobs:0,failedJobs:0}]}},watch:{},methods:{link:function(s){var t=s?"rebuild_job":"backup_job";this.$router.push({name:"my_account_dashboard_detail",params:{type:t}})},getData:function(){var s=this,t={Offset:0,Limit:10};i.default.post(s.data_api+"/minio/backup/retrieve/volume",t,{headers:{Authorization:"Bearer "+s.$store.getters.accessToken}}).then(function(t){var e=t.data;if("success"!=e.status)return s.$message.error(e.message),!1;s.card[0].inProcessJobs=e.data.inProcessVolumeBackupTasksCounts,s.card[0].completedJobs=e.data.completedVolumeBackupTasksCounts,s.card[0].failedJobs=e.data.failedVolumeBackupTasksCounts}).catch(function(s){console.log(s)}),i.default.post(s.data_api+"/minio/rebuild/retrieve/volume",t,{headers:{Authorization:"Bearer "+s.$store.getters.accessToken}}).then(function(t){var e=t.data;if("success"!=e.status)return s.$message.error(e.message),!1;s.card[1].inProcessJobs=e.data.inProcessVolumeRebuildTasksCounts,s.card[1].completedJobs=e.data.completedVolumeRebuildTasksCounts,s.card[1].failedJobs=e.data.failedVolumeRebuildTasksCounts}).catch(function(s){console.log(s)})}},mounted:function(){this.getData()}}},zdve:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("cjjY"),o=e.n(a);for(var i in a)"default"!==i&&function(s){e.d(t,s,function(){return a[s]})}(i);var c=e("2aiw");var r=function(s){e("7zB3")},n=e("VU/8")(o.a,c.a,!1,r,"data-v-ccfeaed6",null);t.default=n.exports}});