<template>
  <div ref="mapContainer" class="map-instance"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated } from 'vue'
import CesiumMap from '@/views/cesium/core/CesiumMap'

const emit = defineEmits(['map-ready', 'map-error'])

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化 Cesium 3D 地图
    mapInstance = new CesiumMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 控件暂不添加

    // 通知父组件地图已就绪
    emit('map-ready', mapInstance)
  } catch (error) {
    console.error('[CesiumAdapter] 地图初始化失败:', error)
    emit('map-error', error)
  }
})

onActivated(() => {
  // 组件被激活时，清理所有非底图内容
  if (mapInstance) {
    const viewer = mapInstance.getViewer()
    if (viewer) {
      // 清理聚合
      const clusterManager = mapInstance.getClusterManager && mapInstance.getClusterManager()
      if (clusterManager && clusterManager.clearCluster) {
        clusterManager.clearCluster()
      }
      // 清理绘制
      const drawManager = mapInstance.getDrawManager && mapInstance.getDrawManager()
      if (drawManager && drawManager.removeDrawLayer) {
        drawManager.removeDrawLayer()
      }
      // 清理其他图层
      const layerManager = mapInstance.getLayerManager && mapInstance.getLayerManager()
      if (layerManager && layerManager.removeAllLayers) {
        layerManager.removeAllLayers()
      }
      // 清理所有 entities
      if (viewer.entities && viewer.entities.values) {
        viewer.entities.removeAll()
      }
      // 强制重排
      if (viewer.scene && typeof viewer.scene.requestRender === 'function') {
        viewer.scene.requestRender()
      }
    }
  }
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
})
</script>

<style scoped>
.map-instance {
  width: 100%;
  height: 100%;
}
</style>
