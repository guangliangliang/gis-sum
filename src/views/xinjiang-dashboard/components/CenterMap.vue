<template>
  <div class="center-map">
    <div ref="mapContainer" class="map-container"></div>

    <!-- 自定义控件容器 -->
    <div ref="controlsContainer" class="map-controls-container"></div>

    <!-- 信息弹窗 (ol/Overlay) -->
    <div ref="popupEl" class="ol-popup" v-show="popupVisible" :style="{
      '--theme-primary': themeColors.primary,
      '--theme-primary-transparent': themeColors.primaryTransparent,
      '--theme-primary-light': themeColors.primaryLight,
      '--theme-primary-dark': themeColors.primaryDark
    }">
      <div class="town-popup">
        <!-- 图片轮播区 -->
        <div v-if="popupSlides.length > 0" class="popup-photos">
          <OSwiper
            :slides="popupSlides"
            :swiper-options="{ autoplay: false }"
            :show-pagination="true"
            :show-navigation="false"
            @slide-change="handleSlideChange"
          >
            <template #default="{ item }">
              <el-image
                :src="item.img"
                :preview-src-list="popupPhotosList"
                :initial-index="getPhotoIndex(item.img)"
                fit="cover"
                class="popup-photo-img"
                preview-teleported
              />
            </template>
          </OSwiper>
        </div>

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
import { ref, computed, onMounted, onUnmounted, watch, reactive } from 'vue'
import OpenlayerMap from '@/views/openlayer/core/OpenlayerMap'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke, Text, Circle, Icon } from 'ol/style'
import { Point } from 'ol/geom'
import { Feature } from 'ol'
import { fromLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay'
import { unByKey } from 'ol/Observable'
import OSwiper from '@/components/Swiper/index.vue'
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

const emit = defineEmits([
  'township-points-change',
  'school-points-change',
  'hospital-points-change'
])

const mapContainer = ref(null)
const controlsContainer = ref(null)
const popupEl = ref(null)
const popupVisible = ref(false)
const popupData = ref({ title: '', items: [], photos: [] })

// 动态主题配色
const themeColors = reactive({
  primary: '#00d4ff',
  primaryTransparent: 'rgba(0, 212, 255, 0.3)',
  primaryLight: 'rgba(0, 212, 255, 0.1)',
  primaryDark: 'rgba(0, 212, 255, 0.5)'
})

// 提取图片主色调
function extractDominantColor(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 50
      canvas.height = 50
      ctx.drawImage(img, 0, 0, 50, 50)
      
      const imageData = ctx.getImageData(0, 0, 50, 50)
      const data = imageData.data
      let r = 0, g = 0, b = 0, count = 0
      
      // 跳过太暗或太亮的像素
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
        if (brightness > 30 && brightness < 230) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
      }
      
      if (count > 0) {
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)
        
        // 增强色彩饱和度
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const saturation = max > 0 ? (max - min) / max : 0
        
        if (saturation < 0.2) {
          // 如果饱和度太低，使用默认的科技蓝
          resolve('#00d4ff')
        } else {
          resolve(`rgb(${r}, ${g}, ${b})`)
        }
      } else {
        resolve('#00d4ff')
      }
    }
    img.onerror = () => {
      resolve('#00d4ff')
    }
    img.src = imgSrc
  })
}

// 更新主题颜色
function updateThemeColors(color) {
  // 将 rgb 转换为 rgba
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch
    themeColors.primary = color
    themeColors.primaryTransparent = `rgba(${r}, ${g}, ${b}, 0.3)`
    themeColors.primaryLight = `rgba(${r}, ${g}, ${b}, 0.1)`
    themeColors.primaryDark = `rgba(${r}, ${g}, ${b}, 0.5)`
  } else {
    // 如果是 hex 颜色
    themeColors.primary = color
    themeColors.primaryTransparent = 'rgba(0, 212, 255, 0.3)'
    themeColors.primaryLight = 'rgba(0, 212, 255, 0.1)'
    themeColors.primaryDark = 'rgba(0, 212, 255, 0.5)'
  }
  
  // 更新 CSS 变量
  if (popupEl.value) {
    popupEl.value.style.setProperty('--theme-primary', themeColors.primary)
    popupEl.value.style.setProperty('--theme-primary-transparent', themeColors.primaryTransparent)
    popupEl.value.style.setProperty('--theme-primary-light', themeColors.primaryLight)
    popupEl.value.style.setProperty('--theme-primary-dark', themeColors.primaryDark)
  }
}

// 当前轮播图索引
let currentSlideIndex = 0

// 处理轮播图变化
async function handleSlideChange(index) {
  currentSlideIndex = index
  if (popupData.value.photos && popupData.value.photos[index]) {
    const color = await extractDominantColor(popupData.value.photos[index])
    updateThemeColors(color)
  }
}

// 计算属性：处理轮播图数据
const popupSlides = computed(() => {
  if (!popupData.value.photos || !Array.isArray(popupData.value.photos)) {
    return []
  }
  return popupData.value.photos.map((url) => ({ img: url }))
})

// 计算属性：用于 Element Plus 图片预览的列表
const popupPhotosList = computed(() => {
  if (!popupData.value.photos || !Array.isArray(popupData.value.photos)) {
    return []
  }
  return popupData.value.photos
})

// 方法：获取当前图片的索引
const getPhotoIndex = (url) => {
  if (!popupData.value.photos || !Array.isArray(popupData.value.photos)) {
    return 0
  }
  return popupData.value.photos.indexOf(url)
}

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
  return new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: 'rgba(0, 212, 255, 0.7)',
      width: 2
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
    controlManager.addScaleControl({}, { bottom: '20px', left: '420px' })

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
    const items = [
      { label: '人口', value: formatNumber(feature.get('population')) + '人' },
      { label: '面积', value: feature.get('area') + 'km²' },
      { label: 'GDP', value: feature.get('gdp') + '亿元' }
    ]
    if (feature.get('address') && feature.get('address') !== '-') {
      items.push({ label: '地址', value: feature.get('address') })
    }
    if (feature.get('tel') && feature.get('tel') !== '-') {
      items.push({ label: '电话', value: feature.get('tel') })
    }
    if (feature.get('openTime') && feature.get('openTime') !== '-') {
      items.push({ label: '办公时间', value: feature.get('openTime') })
    }
    return {
      title: name,
      items,
      photos: feature.get('photos') || []
    }
  }

  if (pointType === 'school') {
    const typeMap = {
      high: '高中',
      middle: '中学',
      primary: '小学',
      vocational: '职业学校',
      kindergarten: '幼儿园',
      school: '学校'
    }
    const items = [
      { label: '类型', value: typeMap[feature.get('type')] || feature.get('type') || '-' }
    ]

    // 添加地址
    if (feature.get('address') && feature.get('address') !== '-') {
      items.push({ label: '地址', value: feature.get('address') })
    }

    // 添加电话
    if (feature.get('tel') && feature.get('tel') !== '-') {
      items.push({ label: '电话', value: feature.get('tel') })
    }

    return {
      title: name,
      items,
      photos: feature.get('photos') || []
    }
  }

  if (pointType === 'hospital') {
    const items = [{ label: '类型', value: feature.get('level') || '医疗机构' }]

    // 添加地址
    if (feature.get('address') && feature.get('address') !== '-') {
      items.push({ label: '地址', value: feature.get('address') })
    }

    // 添加电话
    if (feature.get('tel') && feature.get('tel') !== '-') {
      items.push({ label: '电话', value: feature.get('tel') })
    }

    // 添加营业时间
    if (feature.get('openTime') && feature.get('openTime') !== '-') {
      items.push({ label: '时间', value: feature.get('openTime') })
    }

    return {
      title: name,
      items,
      photos: feature.get('photos') || []
    }
  }

  return { title: name, items: [] }
}

function findLayerAndFeature(name, layer) {
  if (!layer) return null
  return layer
    .getSource()
    .getFeatures()
    .find((f) => f.get('name') === name)
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

  const item = dataList.find((d) => d.name === name)
  if (!item) return

  const olMap = mapInstance.getMap()
  const coordinate = fromLonLat([item.lng, item.lat])

  olMap.getView().animate({
    center: coordinate,
    zoom: 14,
    duration: 800
  })

  if (layer) {
    const layerVisible =
      (layer === townshipPointLayer && townshipPointsVisible) ||
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

async function showPopupAt(coordinate, data) {
  popupData.value = data
  popupOverlay.setPosition(coordinate)
  popupVisible.value = true
  
  // 重置主题色为默认
  updateThemeColors('#00d4ff')
  currentSlideIndex = 0
  
  // 根据第一张图片设置主题色
  if (data.photos && data.photos.length > 0) {
    const color = await extractDominantColor(data.photos[0])
    updateThemeColors(color)
  }
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

  clickHandler = olMap.on('click', (evt) => {
    const feature = olMap.forEachFeatureAtPixel(evt.pixel, (f) => f)

    if (feature && feature.get('name')) {
      const pointType = feature.get('pointType')

      // 只有点要素显示弹窗，面要素不显示
      if (pointType) {
        showPopupAt(evt.coordinate, buildPopupData(feature))
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
  if (clickHandler) unByKey(clickHandler)
  if (moveHandler) unByKey(moveHandler)
  closePopup()
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
  townLayer = null
  currentLayers = []
  townshipPointLayer = null
  schoolPointLayer = null
  hospitalPointLayer = null
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
  right: 420px;
  top: 20px;
  z-index: 100;

  :deep(.ol-control) {
    position: unset;
  }
}

/* ========== 一张图地图控件样式 - 科技蓝主题 ========== */

/* 缩放控件 */
:deep(.ol-zoom-custom),
:deep(.ol-zoom) {
  background: rgba(10, 22, 40, 0.95) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 6px !important;
  padding: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

:deep(.ol-zoom-custom button),
:deep(.ol-zoom button) {
  background: transparent !important;
  color: #00d4ff !important;
  border: none !important;
  border-radius: 4px !important;
  margin: 2px 0 !important;
  width: 32px !important;
  height: 32px !important;
  font-size: 18px !important;
  line-height: 32px !important;
  padding: 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.ol-zoom-custom button:hover),
:deep(.ol-zoom button:hover) {
  background: rgba(0, 212, 255, 0.1) !important;
  color: #00d4ff !important;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3) !important;
}

:deep(.ol-zoom-custom button:disabled),
:deep(.ol-zoom button:disabled) {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
}

/* 全屏控件 */
:deep(.ol-full-screen) {
  background: rgba(10, 22, 40, 0.95) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 6px !important;
  padding: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

:deep(.ol-full-screen button) {
  background: transparent !important;
  color: #00d4ff !important;
  border: none !important;
  border-radius: 4px !important;
  width: 32px !important;
  height: 32px !important;
  font-size: 16px !important;
  line-height: 32px !important;
  padding: 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.ol-full-screen button:hover) {
  background: rgba(0, 212, 255, 0.1) !important;
  color: #00d4ff !important;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3) !important;
}

/* 比例尺控件 */
:deep(.ol-scale-line) {
  background: rgba(10, 22, 40, 0.95) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 4px !important;
  padding: 6px 10px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

:deep(.ol-scale-line-inner) {
  border-color: #00d4ff !important;
  color: #00d4ff !important;
  font-size: 12px !important;
  font-weight: 500 !important;
}

/* 底图切换控件 */
:deep(.ol-base-map-switcher) {
  background: rgba(10, 22, 40, 0.95) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 6px !important;
  padding: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

:deep(.ol-base-map-switcher > button) {
  background: transparent !important;
  color: #00d4ff !important;
  border: none !important;
  border-radius: 4px !important;
  width: 32px !important;
  height: 32px !important;
  font-size: 18px !important;
  line-height: 32px !important;
  padding: 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.ol-base-map-switcher > button:hover) {
  background: rgba(0, 212, 255, 0.1) !important;
  color: #00d4ff !important;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3) !important;
}

/* 底图切换菜单 */
:deep(.image-change-config-menu) {
  background: rgba(10, 22, 40, 0.95) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 6px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
  top: 150px !important;
}

:deep(.image-change-config-menu .single-image) {
  border-color: rgba(0, 212, 255, 0.3) !important;
}

:deep(.image-change-config-menu .single-image.current-image) {
  border-color: #00d4ff !important;
}

:deep(.image-change-config-menu .label-span) {
  background: rgba(0, 212, 255, 0.1) !important;
  color: #00d4ff !important;
}

:deep(.image-change-config-menu .single-image.current-image .label-span) {
  background: #00d4ff !important;
  color: #ffffff !important;
}

/* 弹窗样式 */
.ol-popup {
  pointer-events: auto;
  z-index: 1000;

  --theme-primary: #00d4ff;
  --theme-primary-transparent: rgba(0, 212, 255, 0.3);
  --theme-primary-light: rgba(0, 212, 255, 0.1);
  --theme-primary-dark: rgba(0, 212, 255, 0.5);
}

.popup-close {
  background: none;
  border: none;
  color: var(--theme-primary);
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
  z-index: 10;
}

.popup-photos {
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;

  :deep(.base-swiper) {
    height: 160px;

    .swiper-slide {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}

.popup-photo-img {
  border-radius: 4px;
  cursor: pointer;
  max-height: 160px;
  max-width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

/* 覆盖全局的弹窗样式，使用动态主题色 */
:deep(.town-popup) {
  background: rgb(10 22 40 / 95%);
  border: 1px solid var(--theme-primary-transparent);
  border-radius: 6px;
  max-width: 400px;
  min-width: 280px;
  padding: 12px;
  width: 320px;

  .popup-title {
    border-bottom: 1px solid var(--theme-primary-light);
    color: var(--theme-primary);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 6px;
  }

  .popup-item {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    padding: 4px 0;

    .popup-label {
      color: #9ba7b8;
    }

    .popup-value {
      color: #e0e6ed;
    }
  }
}
</style>
