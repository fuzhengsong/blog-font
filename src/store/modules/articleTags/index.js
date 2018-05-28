import {
  GetArticleTagsModel,
  AddArticleTagModel,
  DeleteArticleTagModel
} from '@/model/index';
import {
  extend,
  isArray,
  isObject,
  findIndex
} from 'lodash';

function randomColor(tags) {
  let colors = ['', 'success', 'info', 'warning', 'danger'];
  if(isArray(tags)){
    tags.forEach(item=>{
      let index = Math.floor(Math.random() * colors.length);
      item.type = colors[index];
    })
  } else if(isObject(tags)){
    let index = Math.floor(Math.random() * colors.length);
    tags.type = colors[index];
  }
  return tags;
}
const state = {
  tags: {
    list: [],
    loading: true
  }
};

const getters = {
  getTagsList: state => state.tags
};

const actions = {
  actionGetArticleTags({commit}, data){
    GetArticleTagsModel.execute().then(response =>{
      // 随机配色
      let list = response.data.list;
      let newList = randomColor(list);
      commit('UPDATE_TAGS_LIST', {
        list: newList,
        loading: false
      })
    })
  },

  actionAddNewTag({commit,state}, data){
    AddArticleTagModel.execute(data).then(response =>{
      let item = randomColor(response.data.tag);
      let tags = extend({}, state.tags);
      tags.list.push(item);
      commit('UPDATE_TAGS_LIST', {
        list: tags.list,
        loading: false
      })
    })
  },

  actionDeleteTags({commit,state}, data){
    let postData = {
      id: data._id
    };
    let tags = extend({}, state.tags);
    DeleteArticleTagModel.execute(postData).then(response =>{
      let index = findIndex(tags.list, {_id: response.data.id});
      tags.list.splice(index, 1);
      commit('UPDATE_TAGS_LIST', {
        list: tags.list,
        loading: false
      })
    })
  }
};


const mutations = {
  UPDATE_TAGS_LIST(state, data){
    state.tags = data;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
