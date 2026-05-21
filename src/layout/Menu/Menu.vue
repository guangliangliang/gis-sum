<template>
  <div class="menu-container">
    <!-- 菜单选项 -->
    <div class="menu-options">
      <router-link
        v-for="item in menuOptions"
        :key="item.path"
        :to="item.path"
        :class="['menu-option', { active: $route.path === item.path, collapsed: collapse }]"
        @click.native="handleMenuClick(item)"
      >
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-text" v-show="!collapse">{{ item.name }}</span>
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
  { path: '/draw', name: '绘制点线面', icon: '✏️' },
  { path: '/station', name: '站点查询', icon: '📍' }
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
  padding: 16px 8px 8px;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  color: var(--el-text-color-regular);
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 0;
    background: linear-gradient(to bottom, var(--el-color-primary), #85ce61);
    border-radius: 0 4px 4px 0;
    transition: height 0.25s ease;
  }

  &.collapsed {
    justify-content: center;
    padding: 14px;
    
    &::before {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 0;
      height: 4px;
    }
  }

  &:hover {
    background: var(--el-fill-color-light);
    border-color: var(--el-border-color-lighter);
  }

  &.active {
    background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(64, 158, 255, 0.05));
    color: var(--el-color-primary);
    font-weight: 600;
    border-color: rgba(64, 158, 255, 0.3);

    &::before {
      height: 65%;
    }

    &.collapsed::before {
      width: 65%;
    }
  }
}

.menu-icon {
  font-size: 22px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
}

.menu-text {
  font-size: 15px;
  white-space: nowrap;
  letter-spacing: 0.4px;
}

/* 暗黑模式适配 */
html.dark {
  .menu-container {
    background: var(--el-bg-color);
  }
  
  .menu-option {
    &:hover {
      background: var(--el-fill-color-light);
    }
    
    &.active {
      background: linear-gradient(135deg, rgba(64, 158, 255, 0.15), rgba(64, 158, 255, 0.08));
    }
  }
}
</style>