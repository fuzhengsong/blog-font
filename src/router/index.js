

export default {
  'default_page': {
    path: '/',
    redirect: {name: 'index'}
  },

  'index': {
    path: '/index',
  },

  'article_detail':{
    path: '/article/detail/:id'
  },

  'user_index': {
    path: '/user/index',
    before: 'login',
    hidden: true,
    meta: {title: '后台首页'}
  },

  'user_article': {
    path: '/article',
    before: 'login',
    redirect: {name: 'user_article_list'},
    meta: {title: '文章管理', icon: 'svgwrite'}
  },

  'user_article_list': {
    parentPath: 'user_article',
    path: 'list',
    before: 'login',
    meta: {title: '文章列表', icon: 'ai-article'},
  },

  'user_article_create': {
    parentPath: 'user_article',
    path: 'create',
    before: 'login',
    meta: {title: '创建文章', icon: 'combinedshapecopy2'}
  },

  'user_tags_manage': {
    path: '/tags',
    before: 'login',
    redirect: {name: 'user_tags_manage_list'},
  },
  'user_tags_manage_list': {
    parentPath: 'user_tags_manage',
    path: 'list',
    before: 'login',
    meta: {title: '标签管理', icon: 'msnui-tag'}
  },

	'user_login': {
		path: '/user/login',
	},

  'user_register': {
	  path: '/user/register'
  },

  '404': {
    path: '*',
    redirect: {name: 'index'}
  }
}
