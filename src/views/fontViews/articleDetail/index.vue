<template>
  <section class="font-article-detail">
    <public-header></public-header>

    <div class="article-header">
      <p class="article-title">{{detail.detail.title}}</p>
      <div class="time tac mt6">
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

  .font-article-detail {

    .v-note-wrapper .v-note-panel {
      margin-top: 20px;
      box-shadow: none !important;
    }

    .v-show-content {
      padding: 0 !important;
      background-color: #fff !important;
    }

    .article-header {
      width: 300px;
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

  }


</style>
