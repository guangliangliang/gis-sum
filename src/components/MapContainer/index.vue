<template>
  <div class="map-container">
    <!-- 地图包装器 -->
    <div ref="mapWrapper" class="map-wrapper">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在加载 {{ currentEngineName }}...</div>
      </div>

      <!-- 动态地图组件 - keep-alive缓存已打开实例 -->
      <keep-alive include="OpenlayerAdapter,MapboxAdapter,GaodeAdapter,CesiumAdapter">
        <component :is="currentMapComponent" @map-ready="onMapReady" @map-error="onMapError" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useMapStore } from '@/stores/map'

// 导入各地图引擎适配器组件
import OpenlayerAdapter from './components/OpenlayerAdapter.vue'
import MapboxAdapter from './components/MapboxAdapter.vue'
import GaodeAdapter from './components/GaodeAdapter.vue'
import CesiumAdapter from './components/CesiumAdapter.vue'

const mapStore = useMapStore()

// 组件映射表
const mapComponentMap = {
  openlayer: OpenlayerAdapter,
  mapbox: MapboxAdapter,
  gaode: GaodeAdapter,
  cesium: CesiumAdapter
}

// 地图引擎配置（用于显示名称）
const mapEngines = [
  { type: 'openlayer', name: 'OpenLayers' },
  { type: 'mapbox', name: 'Mapbox GL' },
  { type: 'gaode', name: '高德地图' },
  { type: 'cesium', name: 'Cesium 3D' }
]

// 响应式数据
const isLoading = ref(false)
const mapWrapper = ref(null)
// 已加载完成的地图缓存
const loadedMaps = ref(new Set())

// 计算属性
const currentMapType = computed(() => mapStore.getCurrentMapType)
const currentMapComponent = computed(() => mapComponentMap[currentMapType.value])
const currentEngineName = computed(() => {
  const engine = mapEngines.find((e) => e.type === currentMapType.value)
  return engine?.name || ''
})

// 监听地图类型变化
watch(currentMapType, (newType) => {
  // 仅未加载过的地图才显示loading
  if (!loadedMaps.value.has(newType)) {
    isLoading.value = true
  }
})

function onMapReady(instance) {
  console.log(`[MapContainer] ${currentEngineName.value} 地图已就绪`)
  mapStore.setMapInstance(instance)
  // 标记地图已加载
  loadedMaps.value.add(currentMapType.value)
  isLoading.value = false
  console.log(`[MapContainer] ${currentEngineName.value} 地图加载完成`)
}

function onMapError(error) {
  console.error(`[MapContainer] 地图加载失败:`, error)
  isLoading.value = false
}

// 监听地图容器
watch(mapWrapper, (el) => {
  if (el) {
    mapStore.setMapContainer(el)
  }
})
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
}

/* 地图包装器 */
.map-wrapper {
  background: #f0f0f0;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 加载遮罩 */
.loading-overlay {
  align-items: center;
  background: rgb(255 255 255 / 90%);
  display: flex;
  flex-direction: column;
  inset: 0;
  justify-content: center;
  position: absolute;
  z-index: 1001;

  .loading-spinner {
    animation: spin 0.8s linear infinite;
    border: 3px solid var(--el-border-color);
    border-radius: 50%;
    border-top-color: var(--el-color-primary);
    height: 40px;
    width: 40px;
  }

  .loading-text {
    color: var(--el-text-color-regular);
    font-size: 14px;
    margin-top: 16px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 暗黑模式适配 */
html.dark {
  .map-wrapper {
    background: #1a1a1a;
  }

  .loading-overlay {
    background: rgb(0 0 0 / 90%);
  }
}
</style>
