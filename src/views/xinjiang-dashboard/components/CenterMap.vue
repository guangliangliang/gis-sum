<template>
  <div class="center-map">
    <div ref="mapContainer" class="map-container"></div>

    <!-- 自定义控件容器 -->
    <div ref="controlsContainer" class="map-controls-container"></div>

    <!-- 信息弹窗 (ol/Overlay) -->
    <div ref="popupEl" class="ol-popup" v-show="popupVisible">
      <div class="town-popup">
        <div class="popup-title">{{ popupData.title }}</div>
        <div class="popup-item" v-for="item in popupData.items" :key="item.label">
          <span class="popup-label">{{ item.label }}</span>
          <span class="popup-value">{{ item.value }}</span>
        </div>
      </div>
      <button class="popup-close" @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import OpenlayerMap from '@/views/openlayer/core/OpenlayerMap'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke, Text, Circle, Icon } from 'ol/style'
import { Point } from 'ol/geom'
import { Feature } from 'ol'
import { fromLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay'
import {
  townInfo,
  XINJIANG_CENTER,
  XINJIANG_ZOOM
} from '@/views/xinjiang-dashboard/core/map-helper.js'
import {
  townData,
  schoolPoints,
  hospitalPoints,
  scenicPoints,
  enterprisePoints,
  agriculturePoints,
  beautifulVillages
} from '@/views/xinjiang-dashboard/core/mockData.js'
import xinjiangGeoJSON from '@/assets/json/140825.json'
import townshipIconUrl from '@/assets/images/map/point/township.png'
import schoolIconUrl from '@/assets/images/map/point/school.png'
import hospitalIconUrl from '@/assets/images/map/point/hospital.png'

const props = defineProps({
  activeMenu: {
    type: String,
    default: 'overview'
  }
})

const emit = defineEmits(['township-points-change', 'school-points-change', 'hospital-points-change'])

const mapContainer = ref(null)
const controlsContainer = ref(null)
const popupEl = ref(null)
const popupVisible = ref(false)
const popupData = ref({ title: '', items: [] })

let mapInstance = null
let townLayer = null
let currentLayers = []
let townshipPointLayer = null
let schoolPointLayer = null
let hospitalPointLayer = null
let townshipPointsVisible = false
let schoolPointsVisible = false
let hospitalPointsVisible = false
let popupOverlay = null
let highlightFeature = null
let clickHandler = null
let moveHandler = null

// 格式化数字
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 创建乡镇样式
function createTownStyle(feature, resolution) {
  const isHighlighted = feature.get('highlighted')

  return new Style({
    fill: new Fill({
      color: isHighlighted ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: isHighlighted ? '#00d4ff' : 'rgba(0, 212, 255, 0.7)',
      width: isHighlighted ? 3 : 2
    }),
    text: new Text({
      text: feature.get('name') || '',
      fill: new Fill({
        color: '#ffffff'
      }),
      stroke: new Stroke({
        color: '#0a1628',
        width: 3
      }),
      font: '14px "Microsoft YaHei", sans-serif',
      offsetY: -5
    })
  })
}

// 初始化地图
async function initMap() {
  try {
    mapInstance = new OpenlayerMap(mapContainer.value, {
      center: XINJIANG_CENTER,
      zoom: XINJIANG_ZOOM
    })

    await mapInstance.init()

    const controlManager = mapInstance.getControlManager()
    controlManager.addZoomControl({ target: controlsContainer.value })
    controlManager.addFullscreenControl({ target: controlsContainer.value })
    controlManager.addBaseMapSwitcherControl({ 
      target: controlsContainer.value, 
      baseMapManager: mapInstance.getBaseMapManager() 
    })
    controlManager.addScaleControl({}, { bottom: '20px', left: '380px' })

    const olMap = mapInstance.getMap()

    popupOverlay = new Overlay({
      element: popupEl.value,
      autoPan: true,
      autoPanAnimation: { duration: 250 },
      offset: [0, -40],
      positioning: 'bottom-center'
    })
    olMap.addOverlay(popupOverlay)

    addTownLayer()
    bindMapEvents()

    console.log('新绛县地图初始化成功')
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
}

// 添加乡镇边界图层
function addTownLayer() {
  const source = new VectorSource({
    features: new GeoJSON().readFeatures(xinjiangGeoJSON, {
      featureProjection: 'EPSG:3857'
    })
  })

  townLayer = new VectorLayer({
    source: source,
    style: createTownStyle,
    zIndex: 10
  })

  const olMap = mapInstance.getMap()
  olMap.addLayer(townLayer)
}

// 创建点图层
function createPointLayer(points, color) {
  const features = points.map((point, index) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([point.lng, point.lat])),
      name: point.name,
      ...point
    })
    feature.setId(index)
    return feature
  })

  const source = new VectorSource({
    features: features
  })

  const style = new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 2
      })
    })
  })

  return new VectorLayer({
    source: source,
    style: style,
    zIndex: 20
  })
}

function addIconPointLayer(points, iconUrl, pointType, idPrefix) {
  const features = points.map((point, index) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([point.lng, point.lat])),
      name: point.name,
      lng: point.lng,
      lat: point.lat,
      pointType,
      ...point
    })
    feature.setId(idPrefix + '_' + index)
    return feature
  })

  const source = new VectorSource({ features })

  const style = new Style({
    image: new Icon({
      src: iconUrl,
      scale: 0.6,
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction'
    })
  })

  return new VectorLayer({
    source,
    style,
    zIndex: 25
  })
}

function addTownshipPointLayer() {
  if (townshipPointLayer) return

  townshipPointLayer = addIconPointLayer(townData, townshipIconUrl, 'township', 'township')
  const olMap = mapInstance.getMap()
  olMap.addLayer(townshipPointLayer)
  townshipPointsVisible = true
  emit('township-points-change', true)
}

function removeTownshipPointLayer() {
  if (!townshipPointLayer) return

  const olMap = mapInstance.getMap()
  olMap.removeLayer(townshipPointLayer)
  townshipPointLayer = null
  townshipPointsVisible = false
  closePopup()
  emit('township-points-change', false)
}

function addSchoolPointLayer() {
  if (schoolPointLayer) return

  schoolPointLayer = addIconPointLayer(schoolPoints, schoolIconUrl, 'school', 'school')
  const olMap = mapInstance.getMap()
  olMap.addLayer(schoolPointLayer)
  schoolPointsVisible = true
  emit('school-points-change', true)
}

function removeSchoolPointLayer() {
  if (!schoolPointLayer) return

  const olMap = mapInstance.getMap()
  olMap.removeLayer(schoolPointLayer)
  schoolPointLayer = null
  schoolPointsVisible = false
  closePopup()
  emit('school-points-change', false)
}

function addHospitalPointLayer() {
  if (hospitalPointLayer) return

  hospitalPointLayer = addIconPointLayer(hospitalPoints, hospitalIconUrl, 'hospital', 'hospital')
  const olMap = mapInstance.getMap()
  olMap.addLayer(hospitalPointLayer)
  hospitalPointsVisible = true
  emit('hospital-points-change', true)
}

function removeHospitalPointLayer() {
  if (!hospitalPointLayer) return

  const olMap = mapInstance.getMap()
  olMap.removeLayer(hospitalPointLayer)
  hospitalPointLayer = null
  hospitalPointsVisible = false
  closePopup()
  emit('hospital-points-change', false)
}

function toggleTownshipPoints() {
  if (townshipPointsVisible) {
    removeTownshipPointLayer()
  } else {
    addTownshipPointLayer()
  }
}

function toggleSchoolPoints() {
  if (schoolPointsVisible) {
    removeSchoolPointLayer()
  } else {
    addSchoolPointLayer()
  }
}

function toggleHospitalPoints() {
  if (hospitalPointsVisible) {
    removeHospitalPointLayer()
  } else {
    addHospitalPointLayer()
  }
}

function buildPopupData(feature) {
  const pointType = feature.get('pointType')
  const name = feature.get('name')

  if (pointType === 'township') {
    return {
      title: name,
      items: [
        { label: '人口', value: formatNumber(feature.get('population')) + '人' },
        { label: '面积', value: feature.get('area') + 'km²' },
        { label: 'GDP', value: feature.get('gdp') + '亿元' }
      ]
    }
  }

  if (pointType === 'school') {
    const typeMap = { high: '高中', middle: '初中', primary: '小学' }
    return {
      title: name,
      items: [
        { label: '类型', value: typeMap[feature.get('type')] || feature.get('type') || '-' }
      ]
    }
  }

  if (pointType === 'hospital') {
    return {
      title: name,
      items: [
        { label: '等级', value: feature.get('level') || '-' }
      ]
    }
  }

  return { title: name, items: [] }
}

function findLayerAndFeature(name, layer) {
  if (!layer) return null
  return layer.getSource().getFeatures().find(f => f.get('name') === name)
}

function flyToTown(townName) {
  flyToPoint(townName, townData, townshipPointLayer)
}

function flyToSchool(schoolName) {
  flyToPoint(schoolName, schoolPoints, schoolPointLayer)
}

function flyToHospital(hospitalName) {
  flyToPoint(hospitalName, hospitalPoints, hospitalPointLayer)
}

function flyToPoint(name, dataList, layer) {
  if (!mapInstance) return

  const item = dataList.find(d => d.name === name)
  if (!item) return

  const olMap = mapInstance.getMap()
  const coordinate = fromLonLat([item.lng, item.lat])

  olMap.getView().animate({
    center: coordinate,
    zoom: 14,
    duration: 800
  })

  if (layer) {
    const layerVisible = (layer === townshipPointLayer && townshipPointsVisible) ||
      (layer === schoolPointLayer && schoolPointsVisible) ||
      (layer === hospitalPointLayer && hospitalPointsVisible)

    if (layerVisible) {
      setTimeout(() => {
        const feature = findLayerAndFeature(name, layer)
        if (feature) {
          const data = buildPopupData(feature)
          showPopupAt(feature.getGeometry().getCoordinates(), data)
        }
      }, 850)
    }
  }
}

function showPopupAt(coordinate, data) {
  popupData.value = data
  popupOverlay.setPosition(coordinate)
  popupVisible.value = true
}

// 更新地图图层
function updateMapLayers(menu) {
  const olMap = mapInstance.getMap()

  // 移除当前图层
  currentLayers.forEach((layer) => {
    olMap.removeLayer(layer)
  })
  currentLayers = []

  // 根据菜单添加不同图层
  switch (menu) {
    case 'overview':
      // 城市概览 - 添加学校和医院
      const schoolLayer = createPointLayer(schoolPoints, '#409eff')
      const hospitalLayer = createPointLayer(hospitalPoints, '#f56c6c')
      olMap.addLayer(schoolLayer)
      olMap.addLayer(hospitalLayer)
      currentLayers.push(schoolLayer, hospitalLayer)
      break

    case 'economic':
      // 经济发展 - 添加企业
      const enterpriseLayer = createPointLayer(enterprisePoints, '#e6a23c')
      olMap.addLayer(enterpriseLayer)
      currentLayers.push(enterpriseLayer)
      break

    case 'tourism':
      // 文旅资源 - 添加景点
      const scenicLayer = createPointLayer(scenicPoints, '#67c23a')
      olMap.addLayer(scenicLayer)
      currentLayers.push(scenicLayer)
      break

    case 'livelihood':
      // 民生服务 - 添加学校和医院
      const schoolLayer2 = createPointLayer(schoolPoints, '#409eff')
      const hospitalLayer2 = createPointLayer(hospitalPoints, '#f56c6c')
      olMap.addLayer(schoolLayer2)
      olMap.addLayer(hospitalLayer2)
      currentLayers.push(schoolLayer2, hospitalLayer2)
      break

    case 'rural':
      // 乡村振兴 - 添加农业和示范村
      const agricultureLayer = createPointLayer(agriculturePoints, '#67c23a')
      const villageLayer = createPointLayer(beautifulVillages, '#00d4ff')
      olMap.addLayer(agricultureLayer)
      olMap.addLayer(villageLayer)
      currentLayers.push(agricultureLayer, villageLayer)
      break
  }
}

// 绑定地图事件
function bindMapEvents() {
  const olMap = mapInstance.getMap()

  // 鼠标移动事件
  moveHandler = olMap.on('pointermove', (evt) => {
    const pixel = olMap.getEventPixel(evt.originalEvent)
    const feature = olMap.forEachFeatureAtPixel(pixel, (f) => f)

    // 清除之前的高亮
    if (highlightFeature) {
      highlightFeature.set('highlighted', false)
      highlightFeature = null
    }

    // 高亮当前乡镇
    if (feature && feature.get('name')) {
      feature.set('highlighted', true)
      highlightFeature = feature
    }
  })

  clickHandler = olMap.on('click', (evt) => {
    const feature = olMap.forEachFeatureAtPixel(evt.pixel, (f) => f)

    if (feature && feature.get('name')) {
      const pointType = feature.get('pointType')

      if (pointType) {
        showPopupAt(evt.coordinate, buildPopupData(feature))
      } else {
        const townName = feature.get('name')
        const townDataItem = townInfo[townName] || { population: 0, area: 0, gdp: 0 }
        showPopupAt(evt.coordinate, {
          title: townName,
          items: [
            { label: '人口', value: formatNumber(townDataItem.population) + '人' },
            { label: '面积', value: townDataItem.area + 'km²' },
            { label: 'GDP', value: townDataItem.gdp + '亿元' }
          ]
        })
      }
    } else {
      closePopup()
    }
  })
}

function closePopup() {
  popupVisible.value = false
  if (popupOverlay) {
    popupOverlay.setPosition(undefined)
  }
}

// 监听菜单变化
watch(
  () => props.activeMenu,
  (newMenu) => {
    if (mapInstance) {
      updateMapLayers(newMenu)
    }
  }
)

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (mapInstance) {
    const olMap = mapInstance.getMap()
    if (olMap) {
      if (clickHandler) olMap.un(clickHandler)
      if (moveHandler) olMap.un(moveHandler)
    }
    mapInstance.destroy()
    mapInstance = null
  }
})

defineExpose({
  toggleTownshipPoints,
  toggleSchoolPoints,
  toggleHospitalPoints,
  flyToTown,
  flyToSchool,
  flyToHospital
})
</script>

<style scoped lang="scss">
@import url('@/views/xinjiang-dashboard/styles/dashboard.scss');

.map-container {
  height: 100%;
  position: relative;
  width: 100%;
}

/* 自定义控件容器样式 */
.map-controls-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  right: 380px;
  top: 20px;
  z-index: 100;
}

/* 让控件在容器内正确显示 */
:deep(.ol-control) {
  inset: auto !important;
  position: relative !important;
}

.ol-popup {
  pointer-events: auto;
  z-index: 1000;
}

.popup-close {
  background: none;
  border: none;
  color: #00d4ff;
  cursor: pointer;
  font-size: 20px;
  height: 24px;
  line-height: 24px;
  padding: 0;
  position: absolute;
  right: 10px;
  text-align: center;
  top: 5px;
  width: 24px;
}
</style>
