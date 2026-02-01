<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CesiumMap from './core/CesiumMap'

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化地图
    mapInstance = new CesiumMap(mapContainer.value, {
      center: [116.397428, 39.90923, 10000],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager()
      .addDefaultControls()

    // 添加示例点
    mapInstance.getLayerManager().addPoints(
      'sample-points',
      [[116.397428, 39.90923, 0], [116.410703, 39.919518, 0], [116.380362, 39.901079, 0]],
      {
        size: 15,
        color: '#409eff',
        outlineColor: '#ffffff',
        outlineWidth: 2
      }
    )

    // 添加示例线
    mapInstance.getLayerManager().addLine(
      'sample-line',
      [[116.397428, 39.90923, 0], [116.410703, 39.919518, 0], [116.380362, 39.901079, 0]],
      {
        width: 5,
        color: '#67c23a'
      }
    )

    console.log('Cesium map loaded successfully')
  } catch (error) {
    console.error('Failed to load Cesium map:', error)
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
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-box {
  width: 100%;
  height: 100%;
}

/* 修复Cesium样式冲突 */
:deep(.cesium-viewer) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.cesium-viewer-bottom) {
  display: block !important;
}
</style>
