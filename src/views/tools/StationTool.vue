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

const mapStore = useMapStore()
const route = useRoute()
const mapInstance = computed(() => mapStore.getMapInstance)
const currentMapType = computed(() => mapStore.getCurrentMapType)

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

  removeStationMarkers()

  if (currentMapType.value === 'openlayer') {
    addStationMarkersOpenlayer()
  } else if (currentMapType.value === 'mapbox') {
    addStationMarkersMapbox()
  }

  markersAdded.value = true
}

function addStationMarkersOpenlayer() {
  const map = mapInstance.value.getMap()
  const VectorSource = window.ol.source.Vector
  const VectorLayer = window.ol.layer.Vector
  const Feature = window.ol.Feature
  const Point = window.ol.geom.Point
  const fromLonLat = window.ol.proj.fromLonLat
  const Style = window.ol.style.Style
  const Icon = window.ol.style.Icon
  const Overlay = window.ol.Overlay

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
      src: '/marker.svg',
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
  initPopupOpenlayer(map, Overlay)

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
}

function addStationMarkersMapbox() {
  const map = mapInstance.value.getMap()

  const features = stationData.map(station => ({
    type: 'Feature',
    properties: { id: station.id, station: station },
    geometry: { type: 'Point', coordinates: [station.lng, station.lat] }
  }))

  map.addSource('station-source', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features }
  })

  map.addLayer({
    id: 'station-layer',
    type: 'symbol',
    source: 'station-source',
    layout: {
      'icon-image': 'marker-15',
      'icon-size': 1.5,
      'icon-anchor': 'bottom'
    }
  })

  stationLayer = true

  clickHandler = function(e) {
    const features = map.queryRenderedFeatures(e.point, { layers: ['station-layer'] })
    if (features.length > 0) {
      const station = features[0].properties.station
      showPopup(station)
    } else {
      if (popupOverlay) {
        popupOverlay.remove()
        popupOverlay = null
      }
      activeStation.value = null
    }
  }
  map.on('click', clickHandler)
}

function removeStationMarkers() {
  if (!mapInstance.value) return

  if (currentMapType.value === 'openlayer') {
    removeStationMarkersOpenlayer()
  } else if (currentMapType.value === 'mapbox') {
    removeStationMarkersMapbox()
  }

  markersAdded.value = false
  activeStation.value = null
}

function removeStationMarkersOpenlayer() {
  const map = mapInstance.value.getMap()
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
    map.off('click', clickHandler)
    clickHandler = null
  }
}

function removeStationMarkersMapbox() {
  const map = mapInstance.value.getMap()
  if (map.getLayer('station-layer')) map.removeLayer('station-layer')
  if (map.getSource('station-source')) map.removeSource('station-source')
  if (popupOverlay) {
    popupOverlay.remove()
    popupOverlay = null
    const el = document.getElementById('popup')
    if (el && el.parentNode) el.parentNode.removeChild(el)
  }
  if (clickHandler) {
    map.off('click', clickHandler)
    clickHandler = null
  }
}

function handleStationClick(station) {
  if (!markersAdded.value) return
  activeStation.value = station
  flyToStation(station)
  showPopup(station)
}

function flyToStation(station) {
  if (!mapInstance.value) return
  if (currentMapType.value === 'openlayer') {
    const map = mapInstance.value.getMap()
    const fromLonLat = window.ol.proj.fromLonLat
    map.getView().animate({
      center: fromLonLat([station.lng, station.lat]),
      zoom: 15,
      duration: 1000
    })
  } else if (currentMapType.value === 'mapbox') {
    const map = mapInstance.value.getMap()
    map.flyTo({
      center: [station.lng, station.lat],
      zoom: 15,
      speed: 0.8
    })
  }
}

function showPopup(station) {
  if (!mapInstance.value) return
  activeStation.value = station

  if (currentMapType.value === 'openlayer') {
    showPopupOpenlayer(station)
  } else if (currentMapType.value === 'mapbox') {
    showPopupMapbox(station)
  }
}

function initPopupOpenlayer(map, Overlay) {
  let el = document.getElementById('popup')
  if (!el) {
    el = document.createElement('div')
    el.id = 'popup'
    el.innerHTML = '<div id="popup-content"></div><div id="popup-closer" style="position:absolute;top:5px;right:8px;cursor:pointer;font-size:20px;line-height:1;color:#666;">×</div>'
    document.body.appendChild(el)

    Object.assign(el.style, {
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

  if (!popupOverlay) {
    popupOverlay = new Overlay({
      element: el,
      autoPan: { animation: { duration: 250 } },
      autoPanMargin: 20
    })
    map.addOverlay(popupOverlay)
  }
}

function showPopupOpenlayer(station) {
  const fromLonLat = window.ol.proj.fromLonLat
  const popupContent = document.getElementById('popup-content')
  if (popupContent) {
    popupContent.innerHTML = '<div style="padding:12px;"><h4 style="margin:0 0 10px;color:#333;">' + station.name + '</h4><p style="margin:6px 0;font-size:13px;color:#666;"><strong>地址:</strong>' + station.address + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>电话:</strong>' + station.phone + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>描述:</strong>' + station.description + '</p></div>'
  }

  if (popupOverlay) {
    popupOverlay.setPosition(fromLonLat([station.lng, station.lat]))
  }
}

function showPopupMapbox(station) {
  if (popupOverlay) {
    popupOverlay.remove()
  }

  const el = document.createElement('div')
  el.id = 'popup'
  el.innerHTML = '<div id="popup-content"></div><div id="popup-closer" style="position:absolute;top:5px;right:8px;cursor:pointer;font-size:20px;line-height:1;color:#666;">×</div>'
  document.body.appendChild(el)

  Object.assign(el.style, {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
    transform: 'translate(-50%, -100%)',
    marginTop: '-15px',
    minWidth: '240px',
    maxWidth: '320px',
    zIndex: '1000'
  })

  const closer = el.querySelector('#popup-closer')
  if (closer) {
    closer.onclick = function() {
      if (popupOverlay) popupOverlay.remove()
      activeStation.value = null
      return false
    }
  }

  const popupContent = el.querySelector('#popup-content')
  if (popupContent) {
    popupContent.innerHTML = '<div style="padding:12px;"><h4 style="margin:0 0 10px;color:#333;">' + station.name + '</h4><p style="margin:6px 0;font-size:13px;color:#666;"><strong>地址:</strong>' + station.address + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>电话:</strong>' + station.phone + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>描述:</strong>' + station.description + '</p></div>'
  }

  const map = mapInstance.value.getMap()
  const mapboxgl = window.mapboxgl
  popupOverlay = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([station.lng, station.lat])
    .setDOMContent(el)
    .addTo(map)
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
  width: 220px;
}

.tool-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
}

.tool-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  .el-button {
    width: 100%;
    justify-content: flex-start;
    padding-left: 12px;
    margin-left: 0 !important;
    
    .el-icon {
      margin-right: 6px;
    }
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
