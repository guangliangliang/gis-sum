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
import mapboxgl from 'mapbox-gl'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Icon } from 'ol/style'
import { Overlay } from 'ol'

const mapStore = useMapStore()
const route = useRoute()
const mapInstance = computed(() => mapStore.getMapInstance)
const currentMapType = computed(() => mapStore.getCurrentMapType)

const activeStation = ref(null)
const markersAdded = ref(false)
let lastMapType = null // 最后添加标记时的地图类型
let stationLayer = null
let popupOverlay = null
let clickHandler = null
let clickHandlerKey = null // OpenLayers 事件键
let iconLoaded = false

function addStationMarkers() {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }

  removeStationMarkers()

  lastMapType = currentMapType.value
  if (lastMapType === 'openlayer') {
    addStationMarkersOpenlayer()
  } else if (lastMapType === 'mapbox') {
    addStationMarkersMapbox()
  }

  markersAdded.value = true
}

function addStationMarkersOpenlayer() {
  const map = mapInstance.value.getMap()

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
  clickHandlerKey = map.on('click', clickHandler)
}

function addStationMarkersMapbox() {
  const map = mapInstance.value.getMap()

  const features = stationData.map(station => ({
    type: 'Feature',
    properties: { 
      id: station.id, 
      lng: station.lng,
      lat: station.lat,
      name: station.name,
      address: station.address,
      phone: station.phone,
      description: station.description
    },
    geometry: { type: 'Point', coordinates: [station.lng, station.lat] }
  }))

  map.addSource('station-source', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features }
  })

  const tryLoadIcon = () => {
    map.loadImage('/marker.png', (error, image) => {
      if (!error) {
        if (!map.hasImage('custom-marker')) {
          map.addImage('custom-marker', image)
        }
        addSymbolLayer()
      } else {
        map.loadImage('/marker.svg', (svgError, svgImage) => {
          if (!svgError) {
            if (!map.hasImage('custom-marker')) {
              map.addImage('custom-marker', svgImage)
            }
            addSymbolLayer()
          } else {
            addCircleLayer()
          }
        })
      }
    })
  }

  const addSymbolLayer = () => {
    const layers = map.getStyle().layers
    const lastSymbolLayer = layers.filter(l => l.type === 'symbol').pop()

    map.addLayer({
      id: 'station-layer',
      type: 'symbol',
      source: 'station-source',
      layout: {
        'icon-image': 'custom-marker',
        'icon-size': 1,
        'icon-anchor': 'bottom',
        'icon-allow-overlap': true
      }
    }, lastSymbolLayer ? lastSymbolLayer.id : undefined)
    stationLayer = true
    setupClickHandler()
  }

  const addCircleLayer = () => {
    map.addLayer({
      id: 'station-layer',
      type: 'circle',
      source: 'station-source',
      paint: {
        'circle-radius': 12,
        'circle-color': '#00D500',
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 3
      }
    })
    stationLayer = true
    setupClickHandler()
  }

  const setupClickHandler = () => {
    clickHandler = function(e) {
      const features = map.queryRenderedFeatures(e.point, { layers: ['station-layer'] })
      if (features.length > 0) {
        const props = features[0].properties
        showPopup(props)
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

  if (map.hasImage('custom-marker')) {
    addSymbolLayer()
  } else {
    tryLoadIcon()
  }
}

function removeStationMarkers() {
  if (!lastMapType) {
    markersAdded.value = false
    activeStation.value = null
    return
  }

  try {
    const map = mapInstance.value.getMap()
    
    if (lastMapType === 'openlayer') {
      // 清理 OpenLayers 的资源
      if (stationLayer && typeof map.removeLayer === 'function') {
        try { map.removeLayer(stationLayer) } catch (e) {}
        stationLayer = null
      }
      if (popupOverlay && typeof map.removeOverlay === 'function') {
        try { map.removeOverlay(popupOverlay) } catch (e) {}
        popupOverlay = null
      }
      if (clickHandlerKey && typeof map.unByKey === 'function') {
        try { map.unByKey(clickHandlerKey) } catch (e) {}
        clickHandlerKey = null
      }
    } else if (lastMapType === 'mapbox') {
      // 清理 Mapbox 的资源
      if (typeof map.getLayer === 'function' && map.getLayer('station-layer')) {
        try { map.removeLayer('station-layer') } catch (e) {}
      }
      if (typeof map.getSource === 'function' && map.getSource('station-source')) {
        try { map.removeSource('station-source') } catch (e) {}
      }
      if (popupOverlay && typeof popupOverlay.remove === 'function') {
        try { popupOverlay.remove() } catch (e) {}
        popupOverlay = null
      }
      if (clickHandler && typeof map.off === 'function') {
        try { map.off('click', clickHandler) } catch (e) {}
        clickHandler = null
      }
    }
    
    // 清理 popup DOM 元素
    const el = document.getElementById('popup')
    if (el && el.parentNode) el.parentNode.removeChild(el)
    
    // 重置所有状态
    clickHandler = null
    clickHandlerKey = null
  } catch (e) {
    console.warn('[StationTool] 清理资源时出错:', e)
  }

  markersAdded.value = false
  activeStation.value = null
  lastMapType = null
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

  const map = mapInstance.value.getMap()
  
  const popupHtml = '<div style="padding:12px;"><h4 style="margin:0 0 10px;color:#333;">' + station.name + '</h4><p style="margin:6px 0;font-size:13px;color:#666;"><strong>地址:</strong>' + station.address + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>电话:</strong>' + station.phone + '</p><p style="margin:6px 0;font-size:13px;color:#666;"><strong>描述:</strong>' + station.description + '</p></div>'

  popupOverlay = new mapboxgl.Popup({ 
    closeOnClick: false, 
    closeButton: true,
    offset: [0, -50]
  })
    .setLngLat([station.lng, station.lat])
    .setHTML(popupHtml)
    .addTo(map)
}

watch(() => route.path, newPath => {
  if (newPath !== '/station') removeStationMarkers()
}, { immediate: true })

watch(currentMapType, (newType, oldType) => {
  console.log(`[StationTool] 地图从 ${oldType} 切换到 ${newType}，清理站点标记`)
  const mapInstances = mapStore.getMapInstances
  // 如果有旧地图类型，并且标记是在旧地图上添加的，使用旧地图实例清理
  if (oldType && oldType === lastMapType && mapInstances && mapInstances[oldType]) {
    const oldMapInstance = mapInstances[oldType]
    const oldMap = oldMapInstance.getMap()
    
    if (oldMap) {
      try {
        if (oldType === 'openlayer') {
          if (stationLayer && typeof oldMap.removeLayer === 'function') {
            oldMap.removeLayer(stationLayer)
          }
          if (popupOverlay && typeof oldMap.removeOverlay === 'function') {
            oldMap.removeOverlay(popupOverlay)
          }
          if (clickHandlerKey && typeof oldMap.unByKey === 'function') {
            oldMap.unByKey(clickHandlerKey)
          }
        } else if (oldType === 'mapbox') {
          if (typeof oldMap.getLayer === 'function' && oldMap.getLayer('station-layer')) {
            oldMap.removeLayer('station-layer')
          }
          if (typeof oldMap.getSource === 'function' && oldMap.getSource('station-source')) {
            oldMap.removeSource('station-source')
          }
          if (popupOverlay && typeof popupOverlay.remove === 'function') {
            popupOverlay.remove()
          }
          if (clickHandler && typeof oldMap.off === 'function') {
            oldMap.off('click', clickHandler)
          }
        }
      } catch (e) {
        console.warn('[StationTool] 清理旧地图资源时出错:', e)
      }
    }
    
    // 清理 DOM 元素
    const el = document.getElementById('popup')
    if (el && el.parentNode) el.parentNode.removeChild(el)
    
    // 重置所有状态
    stationLayer = null
    popupOverlay = null
    clickHandler = null
    clickHandlerKey = null
    markersAdded.value = false
    activeStation.value = null
    lastMapType = null
  }
})

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
