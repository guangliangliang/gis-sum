export default [
  {
    path: '/mapbox',
    name: 'mapbox',
    component: () => import('@/views/mapbox/index.vue'),
    meta: {
      title: 'mapbox',
      activePath: '/mapbox'
    }
  },
  {
    path: '/openlayer',
    name: 'openlayer',
    component: () => import('@/views/openlayer/index.vue'),
    meta: {
      title: 'openlayer',
      activePath: '/openlayer'
    }
  },
  {
    path: '/cesium',
    name: 'cesium',
    component: () => import('@/views/cesium/index.vue'),
    meta: {
      title: 'cesium',
      activePath: '/cesium'
    }
  },
  {
    path: '/gaode',
    name: 'gaode',
    component: () => import('@/views/gaode/index.vue'),
    meta: {
      title: 'gaode',
      activePath: '/gaode'
    }
  }
]
