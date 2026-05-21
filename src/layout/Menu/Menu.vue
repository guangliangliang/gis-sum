<template>
  <div class="menu-container">
    <!-- 菜单选项 -->
    <div class="menu-options">
      <router-link
        v-for="item in menuOptions"
        :key="item.path"
        :to="item.path"
        :class="['menu-option', { active: $route.path === item.path }]"
        @click.native="handleMenuClick(item)"
      >
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-text">{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMapStore, useAppStore } from '@/stores'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'Menu'
})

const mapStore = useMapStore()
const appStore = useAppStore()
const route = useRoute()
const collapse = computed(() => appStore.collapse)
const layout = computed(() => appStore.getLayout)

// 菜单选项
const menuOptions = [
  { path: '/cluster', name: '点聚合', icon: '🎯' },
  { path: '/draw', name: '绘制点线面', icon: '✏️' }
]

// 菜单点击
function handleMenuClick(item) {
  // 清除地图内容
  clearMapContent()
}

// 清除地图内容
function clearMapContent() {
  const mapInstance = mapStore.getMapInstance
  if (mapInstance) {
    const clusterManager = mapInstance.getClusterManager && mapInstance.getClusterManager()
    if (clusterManager && clusterManager.clearCluster) {
      clusterManager.clearCluster()
    }

    const drawManager = mapInstance.getDrawManager && mapInstance.getDrawManager()
    if (drawManager && drawManager.removeDrawLayer) {
      drawManager.removeDrawLayer()
    }

    const layerManager = mapInstance.getLayerManager && mapInstance.getLayerManager()
    if (layerManager && layerManager.removeAllLayers) {
      layerManager.removeAllLayers()
    }
  }
}
</script>

<style scoped lang="scss">
.menu-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: var(--el-text-color-regular);

  &:hover {
    background: var(--el-fill-color-light);
  }

  &.active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 500;
  }
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  font-size: 14px;
}

/* 暗黑模式适配 */
html.dark {
  .menu-container {
    background: var(--el-bg-color);
  }
}
</style>
