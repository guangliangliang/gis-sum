<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MapboxMap from './core/MapboxMap'

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化地图
    mapInstance = new MapboxMap(mapContainer.value, {
      style: 'mapbox://styles/mapbox/light-v11',
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager().addZoomControl().addFullscreenControl().addScaleControl()

    // 添加示例点
    mapInstance.getLayerManager().addPointLayer(
      'sample-point',
      [
        [116.397428, 39.90923],
        [116.410703, 39.919518],
        [116.380362, 39.901079]
      ],
      {
        radius: 8,
        color: '#409eff',
        opacity: 0.8
      }
    )

    // 添加示例线
    mapInstance.getLayerManager().addLineLayer(
      'sample-line',
      [
        [116.397428, 39.90923],
        [116.410703, 39.919518],
        [116.380362, 39.901079]
      ],
      {
        width: 3,
        color: '#67c23a',
        opacity: 0.8
      }
    )

    console.log('Mapbox map loaded successfully')
  } catch (error) {
    console.error('Failed to load Mapbox map:', error)
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
