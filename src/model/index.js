
import buildAxios from '../class/buildAxios';
import {
  each,
  isArrayLikeObject,
  isString
} from 'lodash';

export const UserRegisterModel = buildAxios({
  url: 'api/user/register',
  defaultMethod: 'post'
});

export const UserLoginModel = buildAxios({
  url: 'api/user/login',
  defaultMethod: 'post'
});

export const UserGetInfoModel = buildAxios({
  url: 'api/user/userInfo',
  defaultMethod: 'get'
});

export const UserCreateArticleModel = buildAxios({
  url: 'api/article/create',
  defaultMethod: 'post'
});

export const GetArticleListModel = buildAxios({
  url: 'api/article/list',
  defaultMethod: 'get'
});


export const DeleteArticleModel = buildAxios({
  url: 'api/article/delete',
  defaultMethod: 'post'
});

export const GetArticleDetailModel = buildAxios({
  url: 'api/article/detail',
  defaultMethod: 'get'
});

export const CommonUploadModel = buildAxios({
  url: 'api/upload',
  defaultMethod: 'post',
  before: function (params) {
    let form = new FormData();
      each(params,function (value, key) {
        if(isArrayLikeObject(value)) {
          each(value,function (data) {
            let file = data.localURL ? data._file : data;
            if (data && isString(data.name) ) {
              form.append(key + '[]', file, data.name);
            } else {
              form.append(key + '[]', data);
            }
          });
        } else {
          form.append(key, value);
        }
    });
      return form;
  }
});

export const GetArticleTagsModel = buildAxios({
  url: 'api/tags/list',
  defaultMethod: 'get'
});


export const AddArticleTagModel = buildAxios({
  url: 'api/tags/add',
  defaultMethod: 'post'
});

export const DeleteArticleTagModel = buildAxios({
  url: 'api/tags/delete',
  defaultMethod: 'post'
});
