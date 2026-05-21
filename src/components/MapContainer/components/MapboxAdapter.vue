<template>
  <div ref="mapContainer" class="map-instance"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated } from 'vue'
import MapboxMap from '@/views/mapbox/core/MapboxMap'

const emit = defineEmits(['map-ready', 'map-error'])

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化 Mapbox 地图
    mapInstance = new MapboxMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager().addZoomControl().addFullscreenControl().addScaleControl()

    // 通知父组件地图已就绪
    emit('map-ready', mapInstance)
  } catch (error) {
    console.error('[MapboxAdapter] 地图初始化失败:', error)
    emit('map-error', error)
  }
})

onActivated(() => {
  // 组件被激活时，清理所有非底图内容，更新地图尺寸
  if (mapInstance) {
    const map = mapInstance.getMap()
    if (map) {
      // 等待样式加载完成
      const cleanUpMap = () => {
        try {
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
          // 只清理我们知道是自己添加的特定图层和源
          try {
            // 清理站点查询相关的
            if (map.getLayer('station-layer')) {
              try { map.removeLayer('station-layer') } catch (e) {}
            }
            if (map.getSource('station-source')) {
              try { map.removeSource('station-source') } catch (e) {}
            }
          } catch (e) {
            console.warn('[MapboxAdapter] 清理图层时出错:', e)
          }
          // 清理 popup
          try {
            if (map._popups && map._popups.length > 0) {
              map._popups.forEach(popup => popup.remove())
            }
          } catch (e) {}
        } catch (e) {
          console.warn('[MapboxAdapter] 清理地图时出错:', e)
        }
        
        // 更新地图尺寸
        if (typeof map.resize === 'function') {
          map.resize()
        }
      }
      
      // 检查样式是否已加载
      if (map.isStyleLoaded()) {
        cleanUpMap()
      } else {
        map.once('styledata', cleanUpMap)
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
