// 定义路由元信息注释（仅供参考，JS 无类型增强）
/**
 * path:'router-name'             跳转地址
 * name:'router-name'             如果用到<keep-alive>，必须设置该属性
 * meta : {
 *   title: 'title',              用于设置网页标签显示的标题
 *   activePath: '',              用于记录菜单活动状态
 *   keepAilve: true              是否缓存，默认 false
 * }
 */

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'GIS地图平台'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

export default routes
