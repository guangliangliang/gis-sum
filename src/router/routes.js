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

// 导入大屏路由
import dashboardRoutes from './modules/dashboard'

const routes = [
  // 新绛县数字孪生一张图（独立全屏布局）
  ...dashboardRoutes,
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/cluster',
    meta: {
      title: 'GIS地图平台'
    },
    children: [
      {
        path: 'cluster',
        name: 'Cluster',
        component: () => import('@/views/tools/ClusterTool.vue'),
        meta: {
          title: '点聚合'
        }
      },
      {
        path: 'draw',
        name: 'Draw',
        component: () => import('@/views/tools/DrawTool.vue'),
        meta: {
          title: '绘制点线面'
        }
      },
      {
        path: 'station',
        name: 'Station',
        component: () => import('@/views/tools/StationTool.vue'),
        meta: {
          title: '站点查询'
        }
      }
    ]
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
