<template>
  <section class="user_article-list">
    <el-table :data="articleList.list" v-loading="articleList.loading" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1 + ($route.query.page?parseInt($route.query.page -1) * 15 : 0)}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="200"
        align="center"
        :filters="currenttags"
        :filter-method="filterTag"
        filter-placement="bottom-start">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item"
            type="success"
            disable-transitions
            style="margin:5px;"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time | time('-')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.update_time | time('-')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation tac mt20" v-if="articleList.total!==0 && articleList.total >=pagenation.size">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="parseInt($route.query.size) || 15"
        :total="articleList.total"
        @current-change="pageChange"
        :current-page="parseInt($route.query.page)"
      >
      </el-pagination>
    </div>
  </section>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    extend
  } from 'lodash';

  export default {
    name: "index",
    data() {
      return {
        pagenation: {
          page: this.$route.query.page || 1,
          size: this.$route.query.size || 15,
          keywords: undefined,
          tags: undefined
        }
      }
    },

    created(){
      this.getArticleList(this.pagenation);
      this.$store.dispatch('actionGetArticleTags');
    },

    filters: {
      statusFilter(status) {
        const statusMap = {
          publish: 'primary',
          draft: 'info'
        };
        return statusMap[status]
      },
    },

    computed: {
      ...mapGetters({
        articleList: 'getArticleList',
        tags: 'getTagsList'
      }),
      currenttags(){
        return this.tags.list.map(item =>{
          return {text: item.name, value: item.name}
        });
      }
    },

    methods: {
      ...mapActions({
        getArticleList: 'actionGetArticleList',
        deleteArticle: 'actionDeleteArticle'
      }),
      filterTag(value,row,tag){
        return row.tags.indexOf(value) !== -1;
      },
      changePagenation(type, value){
        if(type === 'page'){
          this.pagenation.page = value;
        }
        if(type === 'size'){
          this.pagenation.size = value;
        }
        if(type === 'keywords'){
          this.pagenation.keywords = value;
        }
        if(type === 'tags'){
          this.pagenation.tags = value;
        }
      },
      pageChange(currentpage){
        this.changePagenation('page', currentpage);
        this.$router.replace({name: this.$route.name, query: this.pagenation});
        this.getArticleList(this.pagenation);
      },

      handleDelete(index, item){
        this.$confirm('确认删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.deleteArticle(item._id).then(()=>{
            if(index === 0 && (this.$route.query && this.$route.query.page > 1)){
              this.changePagenation('page', parseInt(this.$route.query.page) -1);
              this.$router.replace({name: this.$route.name, query: this.pagenation});
            }
            this.getArticleList(this.pagenation);
          });
        })
      },

      handleEdit(index, item){
        this.$router.push({name: 'user_article_create', query: {id: item._id}});
      }
    },
  }
</script>

<style scoped lang="less">

  .user_article-list{
    padding: 20px;
  }
</style>
