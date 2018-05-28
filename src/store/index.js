import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


import actions from './actions'
import mutations from './mutations'
import * as modules from './modules'

const state = {
  userInfo: {

  }
};

const getters = {
  getUserInfo: state => state.userInfo
};



export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules
})
