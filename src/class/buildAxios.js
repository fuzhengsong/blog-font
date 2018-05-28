import axios from 'axios';
import config from '../config/index';
import {
  extend
} from 'lodash';
import {
  Message
} from 'element-ui';
import LocalStorage from '../class/localStorage';

var storage = new LocalStorage();
class BuildAjaxModel {

  constructor(config){
    this.config = config;
  }

  execute(data){
    var self = this;
    let requestData;
    let method = this.config.defaultMethod;
    let url = this.config.url;
    let requestUrl = (process.env.NODE_ENV === 'production'? '/': config.prefix) +　url;
    if(url === '' || method === ''){
      console.warn('url or method can not empty');
    }
    let request = {
      method: method,
      url: requestUrl,
    };
    if(this.config.before){
      data = this.config.before(data);
      request = extend({}, request, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
    }

    if(method === 'get' && data){
      request = extend({},request,{
        params: data
      });
    }
    if(method === 'post' && data){
      request = extend({},request,{
        data: data
      });
    }
    let token = storage.getItem('jwt');
    if(token){
      request.headers = extend({}, request.headers, {Authorization: token})
    }
    return axios(request).then(response =>{
      return self.afterRunner(response);
    })

  }


  afterRunner(response){
    return new Promise((resolve, reject)=>{
      let res = response.data;
      if(res.errno === 1){
        Message.error(res.message);
        reject(res);
      } else {
        if(res.token){
          storage.setItem('jwt', res.token);
        }
        resolve(res);
      }
    })

  }
}

function buildAxios(config){
  return new BuildAjaxModel(config);
}

export default buildAxios;
