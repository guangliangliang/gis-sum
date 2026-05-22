<template>
  <div class="center-map">
    <div ref="mapContainer" class="map-container"></div>
    
    <!-- 乡镇信息弹窗 -->
    <div v-if="popupVisible" class="ol-popup" :style="{ left: popupPosition.x + 'px', top: popupPosition.y + 'px' }">
      <div class="town-popup">
        <div class="popup-title">{{ popupTown.name }}</div>
        <div class="popup-item">
          <span class="popup-label">人口</span>
          <span class="popup-value">{{ formatNumber(popupTown.population) }}人</span>
        </div>
        <div class="popup-item">
          <span class="popup-label">面积</span>
          <span class="popup-value">{{ popupTown.area }}km²</span>
        </div>
        <div class="popup-item">
          <span class="popup-label">GDP</span>
          <span class="popup-value">{{ popupTown.gdp }}亿元</span>
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
import { Style, Fill, Stroke, Text, Circle } from 'ol/style'
import { Point } from 'ol/geom'
import { Feature } from 'ol'
import { fromLonLat } from 'ol/proj'
import { townInfo, XINJIANG_CENTER, XINJIANG_ZOOM } from '@/views/xinjiang-dashboard/core/map-helper.js'
import { 
  schoolPoints, 
  hospitalPoints, 
  scenicPoints, 
  enterprisePoints,
  agriculturePoints,
  beautifulVillages
} from '@/views/xinjiang-dashboard/core/mockData.js'
import xinjiangGeoJSON from '@/assets/json/140825.json'


const props = defineProps({
  activeMenu: {
    type: String,
    default: 'overview'
  }
})

const mapContainer = ref(null)
const popupVisible = ref(false)
const popupPosition = ref({ x: 0, y: 0 })
const popupTown = ref({ name: '', population: 0, area: 0, gdp: 0 })

let mapInstance = null
let townLayer = null
let currentLayers = []
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
      color: isHighlighted ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)'
    }),
    stroke: new Stroke({
      color: isHighlighted ? '#00d4ff' : 'rgba(0, 212, 255, 0.6)',
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

    // 添加控件
    mapInstance.getControlManager()
      .addZoomControl()
      .addFullscreenControl()
      .addScaleControl()

    // 添加乡镇边界图层
    addTownLayer()

    // 绑定事件
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

// 更新地图图层
function updateMapLayers(menu) {
  const olMap = mapInstance.getMap()
  
  // 移除当前图层
  currentLayers.forEach(layer => {
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

  // 点击事件
  clickHandler = olMap.on('click', (evt) => {
    const pixel = olMap.getEventPixel(evt.originalEvent)
    const feature = olMap.forEachFeatureAtPixel(pixel, (f) => f)

    if (feature && feature.get('name')) {
      const townName = feature.get('name')
      const townData = townInfo[townName] || { population: 0, area: 0, gdp: 0 }
      
      popupTown.value = {
        name: townName,
        ...townData
      }

      // 计算弹窗位置
      const coordinate = evt.coordinate
      const pixelPos = olMap.getPixelFromCoordinate(coordinate)
      popupPosition.value = {
        x: pixelPos[0] - 100,
        y: pixelPos[1] - 150
      }
      popupVisible.value = true
    }
  })
}

// 关闭弹窗
function closePopup() {
  popupVisible.value = false
}

// 监听菜单变化
watch(() => props.activeMenu, (newMenu) => {
  if (mapInstance) {
    updateMapLayers(newMenu)
  }
})

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
</script>

<style scoped lang="scss">
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.ol-popup {
  position: absolute;
  z-index: 1000;
}

.popup-close {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  color: #00d4ff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
}
</style>
