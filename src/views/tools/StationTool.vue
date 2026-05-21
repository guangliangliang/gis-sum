<template>
  <div class="station-tool">
    <div class="tool-title">站点查询</div>
    <div class="tool-buttons">
      <el-button type="primary" size="small" @click="addStationMarkers">
        <el-icon><Plus /></el-icon>
        叠加点
      </el-button>
      <el-button type="danger" size="small" @click="removeStationMarkers">
        <el-icon><Delete /></el-icon>
        移除点
      </el-button>
    </div>
    <div v-if="markersAdded" class="station-list">
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
    <div v-else class="empty-tip">
      <p>请先点击叠加点按钮添加站点标记</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'
import { useMapStore } from '@/stores'
import { stationData } from './stationData'
import { useRoute } from 'vue-router'
import { Plus, Delete } from '@element-plus/icons-vue'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Overlay from 'ol/Overlay'
import { fromLonLat } from 'ol/proj'

const mapStore = useMapStore()
const route = useRoute()
const mapInstance = computed(() => mapStore.getMapInstance)

const activeStation = ref(null)
const markersAdded = ref(false)
let stationLayer = null
let popupOverlay = null
let clickHandler = null

function addStationMarkers() {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }
  const map = mapInstance.value.getMap()
  if (!map) {
    console.warn('地图对象未就绪')
    return
  }

  const source = new VectorSource()

  stationData.forEach(station => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([station.lng, station.lat])),
      station: station
    })
    source.addFeature(feature)
  })

  const style = new Style({
    image: new Icon({
      src: "/marker.svg",
      scale: 1,
      anchor: [0.5, 1],
      anchorOrigin: 'bottom-left'
    })
  })

  stationLayer = new VectorLayer({
    source: source,
    style: style,
    zIndex: 200
  })

  map.addLayer(stationLayer)
  initPopup(map)

  clickHandler = function(event) {
    const features = map.getFeaturesAtPixel(event.pixel)
    if (features && features.length > 0) {
      const feature = features.find(f => f.get('station'))
      if (feature) {
        const station = feature.get('station')
        showPopup(station)
      }
    } else {
      if (popupOverlay) popupOverlay.setPosition(undefined)
      activeStation.value = null
    }
  }
  map.on('click', clickHandler)

  markersAdded.value = true
}

function removeStationMarkers() {
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
    const el = document.getElementById('popup')
    if (el && el.parentNode) el.parentNode.removeChild(el)
  }

  if (clickHandler) {
    map.un('click', clickHandler)
    clickHandler = null
  }

  markersAdded.value = false
  activeStation.value = null
}

function handleStationClick(station) {
  if (!markersAdded.value) return
  activeStation.value = station
  flyToStation(station)
  showPopup(station)
}

function flyToStation(station) {
  if (!mapInstance.value) return
  const map = mapInstance.value.getMap()
  if (!map) return
  map.getView().animate({
    center: fromLonLat([station.lng, station.lat]),
    zoom: 15,
    duration: 1000
  })
}

function showPopup(station) {
  if (!mapInstance.value) return
  const map = mapInstance.value.getMap()
  if (!map) return
  activeStation.value = station

  const popupContent = document.getElementById('popup-content')
  if (popupContent) {
    popupContent.innerHTML = '<div style="padding:12px;"><h4 style="margin:0 0 10px;color:#333;">' + station.name + '</h4><p style="margin:6px 0;font-size:13px;color:#666;"><strong>地址:</strong>' + station.address + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>电话:</strong>' + station.phone + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>描述:</strong>' + station.description + '</p></div>'
  }

  if (popupOverlay) {
    popupOverlay.setPosition(fromLonLat([station.lng, station.lat]))
  }
}

function initPopup(map) {
  let popupElement = document.getElementById('popup')
  if (!popupElement) {
    popupElement = document.createElement('div')
    popupElement.id = 'popup'
    popupElement.innerHTML = '<div id="popup-content"></div><div id="popup-closer" style="position:absolute;top:5px;right:8px;cursor:pointer;font-size:20px;line-height:1;color:#666;">×</div>'
    document.body.appendChild(popupElement)

    Object.assign(popupElement.style, {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
      transform: 'translate(-50%, -100%)',
      marginTop: '-15px',
      minWidth: '240px',
      maxWidth: '320px'
    })

    const closer = document.getElementById('popup-closer')
    if (closer) {
      closer.onclick = function() {
        if (popupOverlay) popupOverlay.setPosition(undefined)
        activeStation.value = null
        return false
      }
    }
  }

  if (popupOverlay) return
  popupOverlay = new Overlay({
    element: popupElement,
    autoPan: { animation: { duration: 250 } },
    autoPanMargin: 20
  })
  map.addOverlay(popupOverlay)
}

watch(() => route.path, newPath => {
  if (newPath !== '/station') removeStationMarkers()
}, { immediate: true })

onUnmounted(() => removeStationMarkers())
</script>

<style scoped lang="scss">
.station-tool {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.2);
  padding: 16px;
  min-width: 220px;
}

.tool-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
}

.tool-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  .el-button {
    flex: 1;
  }
}

.station-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 350px;
  overflow-y: auto;
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

.empty-tip {
  padding: 20px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
}
</style>