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
  padding: 12px 8px;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: var(--el-text-color-regular);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: var(--el-color-primary);
    border-radius: 0 3px 3px 0;
    transition: height 0.3s ease;
  }

  &.collapsed {
    justify-content: center;
    padding: 12px;
    
    &::before {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
    }
  }

  &:hover {
    background: linear-gradient(135deg, var(--el-fill-color-light), rgba(144, 147, 153, 0.1));
    transform: translateX(4px);
  }

  &.active {
    background: linear-gradient(135deg, var(--el-color-primary-light-9), var(--el-color-primary-light-8));
    color: var(--el-color-primary);
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);

    &::before {
      height: 60%;
    }

    &.collapsed::before {
      width: 60%;
    }
  }
}

.menu-icon {
  font-size: 20px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.menu-text {
  font-size: 15px;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

/* 暗黑模式适配 */
html.dark {
  .menu-container {
    background: var(--el-bg-color);
  }
  
  .menu-option {
    &:hover {
      background: linear-gradient(135deg, var(--el-fill-color-light), rgba(144, 147, 153, 0.15));
    }
    
    &.active {
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.35);
    }
  }
}
</style>