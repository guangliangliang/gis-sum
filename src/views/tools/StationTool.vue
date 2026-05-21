<template>
  <div class="station-tool">
    <div class="tool-title">站点查询</div>
    <div class="station-list">
      <div
        v-for="station in stationData"
        :key="station.id"
        class="station-item"
        :class="{ active: activeStation?.id === station.id }"
        @click="handleStationClick(station)"
      >
        <span class="station-icon">📍</span>
        <span class="station-name">{{ station.name }}</span>
      </div>
    </div>
  </div>

  <!-- 站点详情弹框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="activeStation?.name"
    width="400px"
  >
    <div class="station-detail" v-if="activeStation">
      <p><strong>地址：</strong>{{ activeStation.address }}</p>
      <p><strong>电话：</strong>{{ activeStation.phone }}</p>
      <p><strong>描述：</strong>{{ activeStation.description }}</p>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMapStore } from '@/stores'
import { stationData } from './stationData'
import { useRoute } from 'vue-router'

const mapStore = useMapStore()
const route = useRoute()
const mapInstance = computed(() => mapStore.getMapInstance)

const activeStation = ref(null)
const dialogVisible = ref(false)
let stationLayer = null
let clickHandler = null

// 处理站点点击
function handleStationClick(station) {
  activeStation.value = station
  dialogVisible.value = true
  flyToStation(station)
}

// 飞到指定站点
function flyToStation(station) {
  if (!mapInstance.value) return
  
  const map = mapInstance.value.getMap()
  if (!map) return

  const view = map.getView()
  view.animate({
    center: window.ol.proj.fromLonLat([station.lng, station.lat]),
    zoom: 15,
    duration: 1000
  })
}

// 初始化站点图层
function initStationLayer() {
  if (!mapInstance.value) return

  const map = mapInstance.value.getMap()
  if (!map) return

  // 创建数据源
  const source = new window.ol.source.Vector()

  // 添加站点标记
  stationData.forEach(station => {
    const feature = new window.ol.Feature({
      geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat([station.lng, station.lat])),
      station: station
    })
    source.addFeature(feature)
  })

  // 创建样式
  const style = new window.ol.style.Style({
    image: new window.ol.style.Circle({
      radius: 10,
      fill: new window.ol.style.Fill({ color: '#409eff' }),
      stroke: new window.ol.style.Stroke({ color: 'white', width: 3 })
    })
  })

  // 创建图层
  stationLayer = new window.ol.layer.Vector({
    source: source,
    style: style,
    zIndex: 200
  })

  // 添加到地图
  map.addLayer(stationLayer)

  // 添加点击事件
  clickHandler = function(event) {
    const features = map.getFeaturesAtPixel(event.pixel)
    if (features && features.length > 0) {
      const feature = features.find(f => f.get('station'))
      if (feature) {
        const station = feature.get('station')
        activeStation.value = station
        dialogVisible.value = true
      }
    }
  }
  map.on('click', clickHandler)
}

// 清除站点图层
function clearStationLayer() {
  if (!mapInstance.value) return

  const map = mapInstance.value.getMap()
  if (!map) return

  if (stationLayer) {
    map.removeLayer(stationLayer)
    stationLayer = null
  }

  if (clickHandler) {
    map.un('click', clickHandler)
    clickHandler = null
  }
}

// 监听路由变化，只在站点查询页面显示图层
watch(() => route.path, (newPath) => {
  if (newPath === '/station') {
    setTimeout(() => {
      initStationLayer()
    }, 200)
  } else {
    clearStationLayer()
    activeStation.value = null
    dialogVisible.value = false
  }
}, { immediate: true })

onUnmounted(() => {
  clearStationLayer()
})
</script>

<style scoped lang="scss">
.station-tool {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.2);
  padding: 16px;
  min-width: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.tool-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
}

.station-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.station-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--el-fill-color-light);
  }

  &.active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 500;
  }
}

.station-icon {
  font-size: 18px;
}

.station-name {
  font-size: 14px;
}

.station-detail {
  p {
    margin-bottom: 12px;
    line-height: 1.6;
  }
}
</style>
