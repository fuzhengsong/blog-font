
import {
  keys,
  flatten,
  each,
  isFunction
} from 'lodash';
import {
  UserGetInfoModel
} from '../model/index'
import NProgress from 'nprogress' // Progress 进度条
import Store from '../store/index'
/**
 * 把字母转换成骆峰式命名
 *
 * @param {string} keys
 * @return {string}
 */
function studlyCase(keys){
  return keys.replace(/_(\S)|(^\S)/gi, function (all, rep1, rep2) {
    return String(rep1 || rep2).toUpperCase();
  });
}


class BuildRoute {

  route;
  views;
  store;
  namespace;
  result;
  element;

  /**
   * 构建路由配置
   * @param route
   * @param views
   * @param Store
   * @param namespace
   * @param element
   */
  constructor(route, views,Store, namespace = false, element = document.body){
    this.route = route;
    this.views = views;
    this.element = element;
    this.store = Store;
    this.namespace = namespace
  }

  studlyCase = studlyCase;
  /**
   *
   * @returns {*}
   */
  toRouter(){
    if( this.result ) {
      return this.result;
    }
    let route = this.route;
    let views = this.views;
    let namespace = this.namespace;
    return namespace ? flatten(map(route, (item)=>this.buildRoute(item, views))) : this.buildRoute(route, views);
  }

  buildRoute(routes, views, parentPath){
    let itemKeys = keys(routes);

    let returnValue = [];
    for (let i = 0,current; current = itemKeys[i]; i++ ){
      let currentRouteConfig = routes[current];
      if (currentRouteConfig.parentPath === parentPath) {
        let defaultView = views[this.studlyCase(current)];
        let currentRoute = {
          caseSensitive: !!currentRouteConfig.caseSensitive,
          name: current,
          path: currentRouteConfig['path'],
          components: {
            default: defaultView,
          }
        };
        if( !defaultView && !currentRouteConfig.redirect ) {
          console.warn(`can't find view ${current}`);
        }

        // 处理通用配置
        each({
          redirect: 'redirect',
          alias: 'alias',
          before: 'beforeEnter',
          props: 'props',
          meta: 'meta'
        }, (value, key)=>{
          if(currentRouteConfig[key]) {
            currentRoute[value] = isFunction(this[key]) ? this[key](currentRouteConfig[key]) : currentRouteConfig[key];
          }
        });

        // // 处理头部及底部
        // each({
        //   header: 'header',
        //   footer:'footer',
        // }, (value, key)=>{
        //   let ret = this[key](currentRoute, currentRouteConfig[key], currentRouteConfig.meta || {});
        //   if(ret) {
        //     currentRoute.components[value] = ret;
        //   }
        // });

        // 子路由
        let childrenView = this.buildRoute(routes, views, current);
        if(childrenView.length) {
          currentRoute.children = childrenView;
        }
        returnValue.push(currentRoute);
      }
    }

    return returnValue;
  }

  before(params){
    if(params === 'login'){
      return function(to,from,next){
        NProgress.start();
        let userInfo = Store.getters.getUserInfo;
        if(userInfo && userInfo.username){
          to.params.userInfo = userInfo;
          next(true);
          NProgress.done()
        } else {
          UserGetInfoModel.execute().then(response =>{
            Store.commit('UPDATE_USER_INFO', response.userInfo);
            next(true);
            NProgress.done()
          }).catch(err => {
            next({name: 'user_login'});
            NProgress.done()
          })
        }
      }
    }
  }
}

export default BuildRoute;
