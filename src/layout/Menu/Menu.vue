<template>
  <div class="menu-container">
    <!-- 地图操作菜单 -->
    <div class="menu-section">
      <div class="section-title">基础操作</div>
      <div class="menu-items">
        <div
          v-for="item in baseOperations"
          :key="item.id"
          :class="['menu-item', { active: activeItem === item.id }]"
          @click="handleMenuClick(item)"
        >
          <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
          <span class="menu-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 标注功能菜单 -->
    <div class="menu-section">
      <div class="section-title">标注功能</div>
      <div class="menu-items">
        <div
          v-for="item in markOperations"
          :key="item.id"
          :class="['menu-item', { active: activeItem === item.id }]"
          @click="handleMenuClick(item)"
        >
          <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
          <span class="menu-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 图层控制菜单 -->
    <div class="menu-section">
      <div class="section-title">图层控制</div>
      <div class="menu-items">
        <div
          v-for="item in layerOperations"
          :key="item.id"
          :class="['menu-item', { active: activeItem === item.id }]"
          @click="handleMenuClick(item)"
        >
          <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
          <span class="menu-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 当前地图状态 -->
    <div class="map-status">
      <div class="status-item">
        <span class="status-label">当前地图:</span>
        <span class="status-value">{{ currentMapName }}</span>
      </div>
      <div class="status-item">
        <span class="status-label">地图状态:</span>
        <span :class="['status-value', isMapReady ? 'ready' : 'loading']">
          {{ isMapReady ? '已就绪' : '加载中' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMapStore } from '@/stores'
import {
  Location,
  ZoomIn,
  ZoomOut,
  FullScreen,
  MapLocation,
  EditPen,
  Delete,
  CircleCheck,
  Hide,
  View
} from '@element-plus/icons-vue'

defineOptions({
  name: 'Menu'
})

const mapStore = useMapStore()
const activeItem = ref('')

// 计算属性
const currentMapName = computed(() => {
  const mapNames = {
    openlayer: 'OpenLayers',
    mapbox: 'Mapbox GL',
    gaode: '高德地图',
    cesium: 'Cesium 3D'
  }
  return mapNames[mapStore.getCurrentMapType] || '未知'
})

const isMapReady = computed(() => mapStore.isMapReady)

// 基础操作菜单
const baseOperations = [
  { id: 'reset-view', name: '重置视图', icon: MapLocation, action: 'resetView' },
  { id: 'zoom-in', name: '放大', icon: ZoomIn, action: 'zoomIn' },
  { id: 'zoom-out', name: '缩小', icon: ZoomOut, action: 'zoomOut' },
  { id: 'fullscreen', name: '全屏', icon: FullScreen, action: 'fullscreen' }
]

// 标注功能菜单
const markOperations = [
  { id: 'add-point', name: '添加点标记', icon: Location, action: 'addPoint' },
  { id: 'draw-line', name: '绘制线', icon: EditPen, action: 'drawLine' },
  { id: 'draw-polygon', name: '绘制面', icon: CircleCheck, action: 'drawPolygon' },
  { id: 'clear-all', name: '清除所有', icon: Delete, action: 'clearAll' }
]

// 图层控制菜单
const layerOperations = [
  { id: 'layer-control', name: '图层管理', icon: Hide, action: 'layerControl' },
  { id: 'show-hide', name: '显示/隐藏', icon: Hide, action: 'toggleVisibility' },
  { id: 'measure', name: '测量工具', icon: View, action: 'measure' }
]

// 处理菜单点击
const handleMenuClick = async (item) => {
  activeItem.value = item.id

  // 获取地图实例
  const mapInstance = mapStore.getMapInstance()

  if (!mapInstance) {
    console.warn('[Menu] 地图实例未就绪，无法执行操作')
    return
  }

  try {
    switch (item.action) {
      // 基础操作
      case 'resetView':
        mapInstance.setCenter([116.397428, 39.90923], 12)
        break
      case 'zoomIn':
        mapInstance.setZoom(mapInstance.getMap().getView().getZoom() + 1)
        break
      case 'zoomOut':
        mapInstance.setZoom(mapInstance.getMap().getView().getZoom() - 1)
        break
      case 'fullscreen':
        mapInstance.getControlManager().toggleFullscreen()
        break

      // 标注功能
      case 'addPoint':
        // 在地图中心添加一个点
        mapInstance.getLayerManager().addPointLayer('menu-point', [[116.397428, 39.90923]], {
          radius: 10,
          color: '#e74c3c',
          opacity: 1
        })
        break
      case 'drawLine':
        // 添加示例线
        mapInstance.getLayerManager().addLineLayer(
          'menu-line',
          [
            [116.397428, 39.90923],
            [116.410703, 39.919518],
            [116.380362, 39.901079]
          ],
          {
            width: 3,
            color: '#3498db',
            opacity: 0.8
          }
        )
        break
      case 'drawPolygon':
        // 添加示例多边形
        mapInstance.getLayerManager().addPolygonLayer(
          'menu-polygon',
          [
            [
              [116.397428, 39.90923],
              [116.410703, 39.919518],
              [116.4, 39.93],
              [116.380362, 39.901079],
              [116.397428, 39.90923]
            ]
          ],
          {
            fillColor: '#2ecc71',
            fillOpacity: 0.3,
            strokeColor: '#27ae60',
            strokeWidth: 2
          }
        )
        break
      case 'clearAll':
        // 清除所有图层
        mapInstance.getLayerManager().removeAllLayers()
        break

      // 图层控制
      case 'layerControl':
        console.log('[Menu] 图层管理功能待实现')
        break
      case 'toggleVisibility':
        console.log('[Menu] 显示/隐藏功能待实现')
        break
      case 'measure':
        console.log('[Menu] 测量工具功能待实现')
        break

      default:
        console.warn(`[Menu] 未知的操作类型: ${item.action}`)
    }
  } catch (error) {
    console.error(`[Menu] 执行操作 "${item.name}" 失败:`, error)
  }
}
</script>

<style scoped lang="scss">
.menu-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.menu-section {
  margin-bottom: 16px;

  .section-title {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 8px 12px;
    text-transform: uppercase;
  }
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  align-items: center;
  border-radius: 6px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  display: flex;
  padding: 10px 12px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--el-fill-color-light);
    color: var(--el-color-primary);
  }

  &.active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 500;
  }

  .menu-icon {
    font-size: 18px;
    margin-right: 10px;
    text-align: center;
    width: 20px;
  }

  .menu-name {
    flex: 1;
    font-size: 13px;
  }
}

.map-status {
  background: var(--el-fill-color-light);
  border-radius: 6px;
  border-top: 1px solid var(--el-border-color);
  margin: 8px;
  margin-top: auto;
  padding: 12px;

  .status-item {
    align-items: center;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .status-label {
    color: var(--el-text-color-secondary);
  }

  .status-value {
    color: var(--el-text-color-primary);
    font-weight: 500;

    &.ready {
      color: var(--el-color-success);
    }

    &.loading {
      color: var(--el-color-warning);
    }
  }
}

/* 暗黑模式适配 */
html.dark {
  .menu-container {
    background: var(--el-bg-color);
  }

  .map-status {
    background: var(--el-fill-color-dark);
  }
}
</style>
