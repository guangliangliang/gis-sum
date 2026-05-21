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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useMapStore } from '@/stores'
import { stationData } from './stationData'
import { useRoute } from 'vue-router'

const mapStore = useMapStore()
const route = useRoute()
const mapInstance = computed(() => mapStore.getMapInstance)

const activeStation = ref(null)
let stationLayer = null
let popupOverlay = null
let clickHandler = null

// 处理站点点击
function handleStationClick(station) {
  activeStation.value = station
  flyToStation(station)
  showPopup(station)
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

// 显示气泡弹框
function showPopup(station) {
  if (!mapInstance.value) return
  
  const map = mapInstance.value.getMap()
  if (!map) return

  activeStation.value = station

  // 创建气泡内容
  const popupContent = document.getElementById('popup-content')
  if (popupContent) {
    popupContent.innerHTML = `
      <div style="padding: 8px 12px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">${station.name}</h4>
        <p style="margin: 4px 0; font-size: 13px; color: #666;"><strong>地址：</strong>${station.address}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #666;"><strong>电话：</strong>${station.phone}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #666;"><strong>描述：</strong>${station.description}</p>
      </div>
    `
  }

  // 设置气泡位置
  if (popupOverlay) {
    popupOverlay.setPosition(window.ol.proj.fromLonLat([station.lng, station.lat]))
  }
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

  // 创建样式 - 地图标记样式
  const style = new window.ol.style.Style({
    image: new window.ol.style.Icon({
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 5.408 3.363 10.04 8.063 12.016L15 40l6.937-12.984C26.637 25.04 30 20.408 30 15c0-8.284-6.716-15-15-15z" fill="#409eff" stroke="#fff" stroke-width="2"/>
          <circle cx="15" cy="14" r="7" fill="white"/>
          <text x="15" y="18" text-anchor="middle" fill="#409eff" font-size="10" font-weight="bold">●</text>
        </svg>
      `),
      scale: 1,
      anchor: [0.5, 1],
      anchorOrigin: 'bottom-left'
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

  // 创建气泡弹框
  initPopup(map)

  // 添加点击事件
  clickHandler = function(event) {
    const features = map.getFeaturesAtPixel(event.pixel)
    if (features && features.length > 0) {
      const feature = features.find(f => f.get('station'))
      if (feature) {
        const station = feature.get('station')
        showPopup(station)
      }
    } else {
      // 点击地图其他地方关闭气泡
      if (popupOverlay) {
        popupOverlay.setPosition(undefined)
      }
      activeStation.value = null
    }
  }
  map.on('click', clickHandler)
}

// 初始化气泡弹框
function initPopup(map) {
  // 检查是否已经有气泡元素
  let popupElement = document.getElementById('popup')
  if (!popupElement) {
    // 创建气泡元素
    popupElement = document.createElement('div')
    popupElement.id = 'popup'
    popupElement.innerHTML = `
      <div id="popup-content"></div>
      <div id="popup-closer" style="position:absolute;top:5px;right:8px;cursor:pointer;font-size:18px;line-height:1;">&times;</div>
    `
    document.body.appendChild(popupElement)

    // 应用气泡样式
    Object.assign(popupElement.style, {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      transform: 'translate(-50%, -100%)',
      marginTop: '-10px',
      minWidth: '200px',
      maxWidth: '300px'
    })

    // 添加关闭按钮事件
    const closer = document.getElementById('popup-closer')
    if (closer) {
      closer.onclick = function() {
        if (popupOverlay) {
          popupOverlay.setPosition(undefined)
        }
        activeStation.value = null
        return false
      }
    }
  }

  // 创建 Overlay
  popupOverlay = new window.ol.Overlay({
    element: popupElement,
    autoPan: {
      animation: {
        duration: 250
      }
    },
    autoPanMargin: 20
  })

  map.addOverlay(popupOverlay)
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

  if (popupOverlay) {
    map.removeOverlay(popupOverlay)
    popupOverlay = null
    const popupElement = document.getElementById('popup')
    if (popupElement && popupElement.parentNode) {
      popupElement.parentNode.removeChild(popupElement)
    }
  }

  if (clickHandler) {
    map.un('click', clickHandler)
    clickHandler = null
  }

  activeStation.value = null
}

// 监听路由变化，只在站点查询页面显示图层
watch(() => route.path, (newPath) => {
  if (newPath === '/station') {
    nextTick(() => {
      setTimeout(() => {
        initStationLayer()
      }, 200)
    })
  } else {
    clearStationLayer()
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
</style>
