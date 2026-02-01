<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import OpenlayerMap from './core/OpenlayerMap'

const mapContainer = ref(null)
let mapInstance = null

onMounted(async () => {
  try {
    // 初始化地图
    mapInstance = new OpenlayerMap(mapContainer.value, {
      center: [116.397428, 39.90923],
      zoom: 12
    })

    await mapInstance.init()

    // 添加控件
    mapInstance.getControlManager().addZoomControl().addFullscreenControl().addScaleControl()

    // 直接使用经纬度坐标，MapLayerManager 会处理坐标转换
    const points = [
      [116.397428, 39.90923],
      [116.410703, 39.919518],
      [116.380362, 39.901079]
    ]

    // 添加示例点
    mapInstance.getLayerManager().addPointLayer('sample-point', points, {
      radius: 8,
      color: '#409eff',
      opacity: 0.8
    })

    // 添加示例线
    mapInstance.getLayerManager().addLineLayer('sample-line', points, {
      width: 3,
      color: '#67c23a',
      opacity: 0.8
    })

    console.log('OpenLayers map loaded successfully')
  } catch (error) {
    console.error('Failed to load OpenLayers map:', error)
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
