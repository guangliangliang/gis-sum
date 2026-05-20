<template>
  <div class="menu-container">
    <!-- 当前地图状态 - 经典布局且不折叠时显示，或顶部左侧布局时显示 -->
    <div v-if="false" class="map-status">
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
import { computed } from 'vue'
import { useMapStore, useAppStore } from '@/stores'

defineOptions({
  name: 'Menu'
})

const mapStore = useMapStore()
const appStore = useAppStore()
const collapse = computed(() => appStore.getCollapse)
const layout = computed(() => appStore.getLayout)

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
</script>

<style scoped lang="scss">
.menu-container {
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 8px;
}

.map-status {
  background: var(--el-fill-color-light);
  border-radius: 6px;
  width: 100%;
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
