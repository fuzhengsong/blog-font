import {
  GetArticleListModel,
  DeleteArticleModel,
  GetArticleDetailModel
} from '@/model/index';
import {
  extend
} from 'lodash';

const state = {
  articleList: {
    list: [],
    total: 0,
    loading: true
  },
  articleDetail: {
    detail: {},
    loading: false
  }
};

const getters = {
  getArticleList: state => state.articleList,
  getArticleDetail: state => state.articleDetail
};

const actions = {
  actionGetArticleList({commit}, data){
    commit('UPDATE_ARTICLE_LIST',{
      list: [],
      total: 0,
      loading: true
    });
    GetArticleListModel.execute(data).then(response =>{
      commit('UPDATE_ARTICLE_LIST', extend({},response.data, {
        loading: false
      }));
    })
  },

  actionDeleteArticle({commit}, data){
    return DeleteArticleModel.execute({id: data}).then(()=>{

    })
  },

  actionGetArticleDetail({commit}, data){
    commit('UPDATE_ARTICLE_DETAIL', {
      detail: {},
      loading: true
    });
    return GetArticleDetailModel.execute({id: data}).then(response =>{
      commit('UPDATE_ARTICLE_DETAIL', {
        detail: response.data.detail,
        loading: false
      });
      return response.data;
    })
  }
};


const mutations = {
  UPDATE_ARTICLE_LIST(state, data){
    state.articleList = data;
  },

  UPDATE_ARTICLE_DETAIL(state, data) {
    state.articleDetail = data;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
