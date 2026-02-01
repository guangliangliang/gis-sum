<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GaodeMap from './core/GaodeMap'
const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化地图
    mapInstance = new GaodeMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager().addZoomControl().addScaleControl().addMapTypeControl()

    // 添加示例点
    mapInstance.getLayerManager().addMarkers(
      'sample-markers',
      [
        [116.397428, 39.90923],
        [116.410703, 39.919518],
        [116.380362, 39.901079]
      ],
      {
        title: 'Sample Marker'
      }
    )

    // 添加示例线
    mapInstance.getLayerManager().addLine(
      'sample-line',
      [
        [116.397428, 39.90923],
        [116.410703, 39.919518],
        [116.380362, 39.901079]
      ],
      {
        color: '#67c23a',
        width: 3,
        opacity: 0.8
      }
    )

    console.log('Gaode map loaded successfully')
  } catch (error) {
    console.error('Failed to load Gaode map:', error)
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
</style>
