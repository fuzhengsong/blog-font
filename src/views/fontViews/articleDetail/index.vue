<template>
  <section class="font-article-detail">
    <public-header></public-header>

    <div class="article-header" v-if="detail.detail.title">
      <p class="article-title">{{detail.detail.title}}</p>
      <div class="time tac mt16">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-rili"></use>
        </svg>
        <span class="fz14 ml4">{{detail.detail.create_time | time}}</span>
      </div>
    </div>

    <div class="article-content">
      <mavon-editor
        v-model="detail.detail.content"
        defaultOpen="preview"
        :subfield="false"
        :toolbarsFlag="false"
        :imageClick="clickimage"
      ></mavon-editor>
      <div class="article-footer mt20 c-blue mb20" v-if="detail.near">
        <router-link
          v-if="detail.near.pre"
          :to="{name: 'article_detail', params: {id: detail.near.pre.id}}"
          class="pre-article"><<&nbsp;上一篇：{{detail.near.pre.title}}</router-link>
        <router-link
          v-if="detail.near.next"
          :to="{name: 'article_detail', params: {id: detail.near.next.id}}"
          class="next-article">下一篇：{{detail.near.next.title}}&nbsp;>></router-link>
      </div>

    </div>

    <catalog-bar></catalog-bar>
  </section>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import PublicHeader from '@/components/PublicHeader/index.vue';
  import CatalogBar from '@/components/Catalog/index.vue';

  export default {
    data(){
      return {
        renderList: [],
      }
    },

    components: {
      PublicHeader,
      CatalogBar
    },

    watch: {
      '$route'(to,from){
          if(to.name === 'article_detail' && to.params.id !== from.params.id){
            window.location.reload();
          }
      }
    },

    created() {
      this.getDetail(this.$route.params.id);
    },

    computed: {
      ...mapGetters({
        detail: 'getArticleDetail'
      })
    },

    methods: {
      ...mapActions({
        getDetail: 'actionGetArticleDetail'
      }),

      clickimage() {
        return false;
      }
    }
  }
</script>

<style lang="less">

  @import '~@/assets/less/mixin.less';

  .font-article-detail {

    @media screen and(max-width: 769px) {
      .article-header {
        width: 80%;
        margin: 0 auto;
      }

      .article-title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
      }

      .article-content {
        width: 100%;
        padding: 0 20px;

        .article-footer{

          a{
            display: block;
            margin: 10px 0;
          }

        }
      }
    }

    @media screen and(min-width: 769px) and(max-width: 1100px) {

      .article-header {
        width: 400px;
        margin: 0 auto;
      }

      .article-title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
      }

      .article-content {
        width: 100%;
        padding: 0 20px;

        .article-footer{
          .clearfix();

          .pre-article{
            float: left;
          }

          .next-article{
            float: right;
          }
        }
      }
    }

    @media screen and (min-width: 1100px) {
      .article-header {
        width: 500px;
        margin: 0 auto;
      }

      .article-title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
      }

      .article-content {
        width: 900px;
        margin: 0 auto;
      }

      .article-footer{
        .clearfix();

        .pre-article{
          float: left;
        }

        .next-article{
          float: right;
        }
      }
    }

    .v-note-wrapper .v-note-panel {
      margin-top: 20px;
      box-shadow: none !important;
    }

    .v-show-content {
      padding: 0 !important;
      background-color: #fff !important;
    }


  }


</style>
