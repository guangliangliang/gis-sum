// 新绛县数字孪生一张图路由配置
const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'XinjiangDashboard',
    component: () => import('@/views/xinjiang-dashboard/index.vue'),
    meta: {
      title: '新绛县数字孪生一张图',
      layout: 'fullscreen'
    }
  }
]

export default dashboardRoutes
