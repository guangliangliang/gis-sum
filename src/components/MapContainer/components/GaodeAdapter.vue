<template>
  <div ref="mapContainer" class="map-instance"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated } from 'vue'
import GaodeMap from '@/views/gaode/core/GaodeMap'

const emit = defineEmits(['map-ready', 'map-error'])

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    console.log('[GaodeAdapter] 开始初始化高德地图')
    console.log('[GaodeAdapter] 容器元素:', mapContainer.value)

    // 确保容器有正确的尺寸
    if (!mapContainer.value) {
      throw new Error('地图容器未找到')
    }

    // 初始化高德地图
    mapInstance = new GaodeMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12,
      key: import.meta.env.VITE_APP_GAODE,
      version: '2.0'
    })

    console.log('[GaodeAdapter] 调用 mapInstance.init()')
    await mapInstance.init()
    console.log('[GaodeAdapter] 地图初始化成功')

    // 使用 ControlManager 添加控件
    console.log('[GaodeAdapter] 开始添加控件...')
    try {
      mapInstance.getControlManager()
        .addScaleControl()
        .addMapTypeControl()
        .addGeolocationControl()
      
      console.log('[GaodeAdapter] 控件添加完成')
    } catch (err) {
      console.error('[GaodeAdapter] 控件添加失败:', err)
    }

    // 通知父组件地图已就绪
    emit('map-ready', mapInstance)
  } catch (error) {
    console.error('[GaodeAdapter] 地图初始化失败:', error)
    emit('map-error', error)
  }
})

onActivated(() => {
  // 组件被激活时，清理所有非底图内容
  if (mapInstance) {
    const map = mapInstance.getMap()
    if (map) {
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
      // 清理所有 markers
      if (map.getAllOverlays) {
        const overlays = map.getAllOverlays()
        overlays.forEach(overlay => map.remove(overlay))
      }
      // 清理 infoWindow
      if (map.clearInfoWindow) {
        map.clearInfoWindow()
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
  height: 100%;
  min-height: 400px; /* 确保最小高度 */
  width: 100%;
}
</style>
