webpackJsonp([5],{J82o:function(e,t){},cPJ9:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("4YfN"),a=r.n(i),s=r("hiWG"),l=r("9rMa"),o=r("psq8"),n={name:"index",data:function(){return{oldTags:[],form:{title:"",tags:[],content:"",status:""},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:1,max:50,message:"长度在1-50个字符",trigger:"blur"}],tags:[{type:"array",required:!0,message:"请选择一个标签",trigger:"change"}],content:[{required:!0,message:"请输入文章内容",trigger:"blur"}]}}},created:function(){var e=this;this.$route.query&&this.$route.query.id&&this.$store.dispatch("actionGetArticleDetail",this.$route.query.id).then(function(t){e.form=Object(o.extend)({},e.form,t.detail),e.oldTags=t.detail.tags}),this.$store.dispatch("actionGetArticleTags")},computed:a()({},Object(l.c)({detail:"getArticleDetail",tags:"getTagsList"})),methods:{imgAdd:function(e,t){var r=this;s.b.execute({file:t}).then(function(t){var i=t.data.url;i=i.replace(/(\/uploads)/,"/api$1"),r.$refs.md.$img2Url(e,i)})},imgDel:function(){},createArticle:function(){this.form.status="publish",this.submitForm()},save:function(){this.form.status="draft",this.submitForm()},submitForm:function(){var e=this;this.$refs.article.validate(function(t){if(t){var r=e.form;if(e.__id||e.$route.query.id){r.id=e.__id||e.$route.query.id;var i=Object(o.difference)(e.form.tags,e.oldTags),a=Object(o.difference)(e.oldTags,e.form.tags);r=Object(o.extend)({},r,{addTags:i,deleteTags:a})}s.h.execute(r).then(function(t){"draft"===e.form.status?(e.$message.success("保存成功"),e.__id=t.data.id):"publish"===e.form.status&&(e.$message.success("发布成功"),e.$router.push({name:"user_article_list"}))})}})}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{directives:[{name:"loading",rawName:"v-loading",value:e.detail.loading,expression:"detail.loading"}],staticClass:"user-article-create",attrs:{"element-loading-text":"加载中..."}},[r("el-form",{ref:"article",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"文章标签",prop:"tags"}},[r("el-select",{attrs:{multiple:"",placeholder:"请选择"},model:{value:e.form.tags,callback:function(t){e.$set(e.form,"tags",t)},expression:"form.tags"}},e._l(e.tags.list,function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[r("mavon-editor",{ref:"md",on:{imgAdd:e.imgAdd,imgDel:e.imgDel},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.createArticle}},[e._v("发布")]),e._v(" "),r("el-button",{on:{click:e.save}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]};var u=r("C7Lr")(n,c,!1,function(e){r("J82o")},null,null);t.default=u.exports}});
//# sourceMappingURL=5.4c617142bacaef38b9a2.js.map