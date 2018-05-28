<template>
  <section class="index">
    <div class="top-image"></div>
    <div class="main">
      <div class="left-side fl">
        <div class="author-area">
          <div class="avatar">
            <img src="../../../assets/image/avatar1.jpg" alt="">
          </div>
          <div class="blog-name fwb fz20 mt20">
            <p >FUZHENGSONG'S</p>
            <p style="padding-left: 100px;">BLOG</p>
          </div>
          <div class="desc mt20">一个网球爱好者，一个程序员，喜欢唱歌，喜欢运动</div>
        </div>
        <div class="tagCloud-container">
          <div class="tagcloud">
            <a href="javascript:;"
               v-for="item in tagsList.list"
               @click="changeTags(item)"
            >{{item.name}}</a>
          </div>
        </div>

      </div>

      <div class="right-side fl">
        <transition-group class="article-list" tag="ul" name="article-list">
          <li class="article" v-for="item in articleList.list" :key="item.title">
            <div class="header-article">
              <div class="header-left-article">
                <p class="article-name" @click="toArticleDetail(item)">{{item.title}}</p>
                <div class="tags-name">
                  <span v-for="itm in item.tags" class="tag-name">{{itm}}</span>
                </div>
              </div>
              <div class="header-right-author">
                <p class="create-time">
                  {{item.create_time | time}}
                </p>
                <div class="author-info">
                  <div class="avatar fr">
                    <img src="../../../assets/image/avatar1.jpg">
                  </div>
                  <p class="name fr">fuzhengsong</p>
                </div>
              </div>
            </div>
            <div class="article-content">
              <div class="picture-article">

              </div>
              <div class="article-text">
                <mavon-editor v-model="item.content" defaultOpen="preview" :subfield="false" :toolbarsFlag="false" :imageClick="clickimage"></mavon-editor>
              </div>
            </div>
            <div class="continue-button" v-show="item.isShowContinue" >
              <button @click="toArticleDetail(item)">CONTINUE READING</button>
            </div>
          </li>
        </transition-group>
        <div class="pagenation tac mt20" v-if="articleList.total!==0 && articleList.total > pagenation.size">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="parseInt($route.query.size) || 6"
            :total="articleList.total"
            @current-change="pageChange"
            :current-page="parseInt($route.query.page)"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import tagcloud from '../../../class/tagcloud';
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default {

    data(){
      return {
        pagenation: {
          page: this.$route.query.page || 1,
          size: this.$route.query.size || 6,
          keywords: this.$route.query.keywords || undefined,
          tags: this.$route.query.tags || undefined
        }
      }
    },

    created(){
      this.getarticleList(this.pagenation);
      this.gettagsList();
    },

    computed: {
      ...mapGetters({
        articleList: 'getArticleList',
        tagsList: 'getTagsList'
      })
    },

    watch: {
      tagsList: {
        handler: function(val){
          if(val.list.length){
            this.$nextTick(() =>{
              tagcloud({
                selector: ".tagcloud",  //元素选择器
                fontsize: 16,       //基本字体大小
                radius: 60,         //滚动半径
                mspeed: "normal",   //滚动最大速度
                ispeed: "normal",   //滚动初速度
                direction: 135,     //初始滚动方向
                keep: false          //鼠标移出组件后是否继续随鼠标滚动
              })
            })
          }
        },

        deep: true
      }
    },

    methods: {
      ...mapActions({
        'getarticleList': 'actionGetArticleList',
        'gettagsList': 'actionGetArticleTags'
      }),

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
        this.getarticleList(this.pagenation);
      },

      changeTags(item){
        this.changePagenation('tags', item.name);
        this.$router.replace({name: this.$route.name, query: this.pagenation});
        this.getarticleList(this.pagenation);
      },

      toArticleDetail(item){
        this.$router.push({name: 'article_detail', params: {id: item._id}})
      },

      clickimage(){
        return false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~@/assets/less/variable.less";
  @import "~@/assets/less/mixin.less";


  .article-list-enter-active, .article-list-leave-active{
    transition: all 1s;
  }

  .article-list-enter, .article-list-leave-to{
    opacity: 0;
    transform: translateY(20px);
  }
  .v-show-content{
    padding: 0 !important;
    background-color: #fff !important;
  }
  .tagcloud {
    visibility: hidden;
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .tagcloud > a {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1;
    font-weight: bold;
    text-decoration: none;
    padding: 2px 4px;
    background-color: transparent;
    border: 1px solid transparent;
    color: #333;
  }
  .tagcloud > a:hover {
    background-color: rgba(180, 180, 180, .15);
    border: 1px solid #666;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /* light */
  .tagcloud.tagcloud-light > a {
    color: #fff;
  }
  .tagcloud.tagcloud-light > a:hover {
    background-color: rgba(255, 255, 255, .1);
    border: 1px solid #fff;
  }

  .index{
    background-color: #f4f4f4;
  }

  .top-image{
    width: 100%;
    min-width: 1100px;
    background:  url('../../../assets/image/background.jpg') no-repeat center center;
    background-size: cover;
    height: 400px;
  }

  .main{
    width: 1100px;
    margin: 0 auto;
    padding: 40px 0;
    overflow: hidden;

    .left-side {
      width: 300px;
      padding: 0 20px 40px 0;
      margin-right: 40px;

      .author-area{
        padding-bottom: 40px;
        border-bottom: 1px solid @border-color;
      }
      .avatar {
        width: 60px;
        height: 60px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .blog-name{
        line-height: 1.5;

        p{
          margin: 0
        }
      }

      .desc{
        font-size: 14px;
        color: @second-font-color;
      }

      .tagCloud-container{
        width: 280px;
        height: 200px;
        margin-top: 20px;
      }
    }

    .right-side{
      width: 750px;
    }

    .article{
      background-color: #fff;
      padding-bottom: 40px;
      border: 1px solid @border-color;
      margin-bottom: 40px;
    }

    .header-article{
      .flexbox();
      padding: 0 40px;
      border-bottom: 1px solid @border-color;

      .header-left-article{
        .flex(1);
        padding: 30px 20px 30px 0;

        border-right: 1px solid @border-color;
      }

      .article-name{
        font-size: 20px;
        font-weight: bold;
        margin: 0;
        cursor: pointer;
      }

      .tags-name{
        width: 80%;
        margin-top: 10px;

        .tag-name{
          display: inline-block;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          padding: 0 5px;
          margin-right: 10px;
          border-bottom: 1px dashed @border-color;
          cursor: pointer;
          color: @second-font-color;

          &:hover{
            color: @main-font-color
          }
        }
      }
    }


    .header-right-author{
      width: 200px;
      padding: 30px 0 30px;
      text-align: right;

      .create-time{
        font-size: 12px;
        font-weight: bold;
        letter-spacing: .1em;
      }

      .author-info{
        margin-top: 10px;

        .avatar{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;

          img{
            width: 100%;
          }
        }

        .name{
          height: 35px;
          line-height: 35px;
          padding-right: 6px;
          color: @second-font-color;
          margin: 0;
        }
      }
    }
    .article-content{
      padding: 10px 20px;

      .article-text{
        font-size: 14px;
        color: @main-font-color;
        text-indent: 2em;
      }
    }

    .continue-button{
      margin-left: 40px;
      width: 220px;
      height: 50px;

        button {
          display: block;
          width: 100%;
          height: 100%;
          outline: none;
          border: 1px solid @border-color;
          background-color: #fff;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: .1em;
          transition: all .3s ease;

          &:hover{
            color: @second-font-color;
          }
        }
    }
  }
</style>
