<template>
  <div ref="mapContainer" class="map-instance"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated } from 'vue'
import OpenlayerMap from '@/views/openlayer/core/OpenlayerMap'

const emit = defineEmits(['map-ready', 'map-error'])

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化 OpenLayers 地图
    mapInstance = new OpenlayerMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager()
      .addZoomControl()
      .addFullscreenControl()
      .addScaleControl()
      .addBaseMapSwitcherControl({
        baseMapManager: mapInstance.getBaseMapManager()
      })

    // 通知父组件地图已就绪
    emit('map-ready', mapInstance)
  } catch (error) {
    console.error('[OpenlayerAdapter] 地图初始化失败:', error)
    emit('map-error', error)
  }
})

onActivated(() => {
  // 组件被激活时，清理所有非底图内容，更新地图尺寸
  if (mapInstance) {
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
    // 清理所有 overlay
    const map = mapInstance.getMap()
    if (map) {
      const overlays = map.getOverlays()
      overlays.forEach(overlay => map.removeOverlay(overlay))
    }
    
    // 更新地图尺寸
    if (map && typeof map.updateSize === 'function') {
      map.updateSize()
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
