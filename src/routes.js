import VueRouter from 'vue-router';
import Vue from 'vue';
import BuildRouter from './class/BuildRouter';
import Store from './store/index';

// 导入所有视图
import * as viewCollections from './views/index';

// 导入所有路由

import routeCollections from './router/index';

let buildRouters = new BuildRouter(routeCollections, viewCollections, Store);
let routes = buildRouters.toRouter();
const Router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})


export default Router;
