<template>
  <section class="user-article-create" v-loading="detail.loading" element-loading-text="加载中...">
    <el-form :model="form" :rules="rules" ref="article" label-width="120px" >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <el-select v-model="form.tags" multiple placeholder="请选择">
          <el-option
            v-for="item in tags.list"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <mavon-editor v-model="form.content"
                      ref='md'
                      @imgAdd="imgAdd"
                      @imgDel="imgDel"
        ></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createArticle">发布</el-button>
        <el-button @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import {
    UserCreateArticleModel,
    CommonUploadModel
  } from '../../../model/index';
  import {
    mapGetters
  } from 'vuex'
  import {
    extend,
    difference
  } from 'lodash';

  export default {
    name: "index",
    data(){
      return {
        oldTags: [],
        form: {
          title: '',
          tags: [],
          content: '',
          status: ''
        },

        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur'}
          ],

          tags: [
            {type: 'array', required: true, message: '请选择一个标签', trigger: 'change'}
          ],

          content: [
            {required: true, message: '请输入文章内容', trigger: 'blur'}
          ]
        },
      }
    },


    created(){
      if(this.$route.query && this.$route.query.id){
        this.$store.dispatch('actionGetArticleDetail', this.$route.query.id).then(data=>{
          this.form = extend({}, this.form, data.detail);
          this.oldTags = data.detail.tags;
        });
      }
      this.$store.dispatch('actionGetArticleTags');
    },

    computed: {
      ...mapGetters({
        detail: 'getArticleDetail',
        tags: 'getTagsList'
      })
    },

    methods: {
      imgAdd(pos, $file){
        CommonUploadModel.execute({
          file: $file
        }).then(response =>{
          let url = response.data.url;
          if(process.env.NODE_ENV === 'production'){
            url = url.replace(/(\/uploads)/, '/api' + '$1')
          }
          let vm = this.$refs.md;
          vm.$img2Url(pos, url);
        })
      },

      imgDel(){

      },

      createArticle(){
        this.form.status = 'publish';
        this.submitForm();
      },

      save(){
        this.form.status = 'draft';
        this.submitForm();

      },
      submitForm(){
        this.$refs.article.validate(valid =>{
          if(valid){
            let postData = this.form;
            if(this.__id || this.$route.query.id){
              postData.id = this.__id || this.$route.query.id;
              let addTags = difference(this.form.tags, this.oldTags);
              let deleteTags = difference(this.oldTags, this.form.tags);
              postData = extend({}, postData, {
                addTags,
                deleteTags
              })
            }
            UserCreateArticleModel.execute(postData).then(response=>{
              if(this.form.status === 'draft'){
                this.$message.success("保存成功");
                this.__id = response.data.id
              } else if(this.form.status === 'publish'){
                this.$message.success("发布成功");
                this.$router.push({name: 'user_article_list'})
              }

            })
          } else {

          }
        })
      }
    }
  }
</script>

<style lang="less">

  .user-article-create{
    padding: 20px 40px;

    .el-select{
      width: 400px;
    }
  }
</style>
