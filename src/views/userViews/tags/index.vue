<template>
  <section class="tags-manage">
    <el-row>
      <el-col :span="2" class="tac fwb">现有标签：</el-col>
      <el-col :span="16">
        <div class="tags-pool">
            <el-tag
              v-for="tag in tags.list"
              :key="tag.name"
              closable
              :type="tag.type"
              class="ml10 mt10 tags"
              @close="handleClose(tag)"
            >
              {{tag.name}}
            </el-tag>
            <p class="c-gray" v-if="!tags.list.length && tags.loading === false">暂无标签</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <el-col :span="2" class="tac fwb">添加标签：</el-col>
      <el-col :span="10">
        <el-input v-model.trim="newTag"></el-input>
      </el-col>
      <el-col :span="2" class="ml10">
        <el-button type="primary" @click="addNewTag">添加标签</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: "index",

    data(){
      return {
        newTag: ''
      }
    },

    created(){
      this.getTags();
    },

    computed: {
      ...mapGetters({
        tags: 'getTagsList'
      })
    },

    methods: {
      ...mapActions({
        getTags: 'actionGetArticleTags',
        add: 'actionAddNewTag',
        deleteTag: 'actionDeleteTags'
      }),

      addNewTag(){
        if(this.newTag === ''){
          return this.$message.error('新标签不能为空')
        }
        this.add({name: this.newTag});
        this.newTag = '';
      },

      handleClose(tag){
        if(tag.articleCount !== 0 ){
          return this.$message.error('该标签下有文章，不能删除');
        }
        this.deleteTag(tag)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~@/assets/less/variable.less';
  .tags-manage{
    margin: 30px 40px;

    .tags-pool{
      min-height: 200px;
      padding: 10px 10px;
      border: 1px solid @border-color;
      border-radius: 4px;
    }

    .tags{
      transition: transform .3s ease;

      &:hover{
        transform: scale(1.2);
      }
    }
  }
</style>
