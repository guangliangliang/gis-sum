<template>
  <el-header class="gis-header">
    <!-- 左侧：Logo和标题 -->
    <div class="header-left">
      <div class="collapse-icon" @click="handleCollapse">
        <el-icon :size="24">
          <Fold v-if="!collapse" />
          <Expand v-else />
        </el-icon>
      </div>
      <div class="logo-title">
        <img :src="logoSrc" class="logo-img" />
        <span class="title">{{ baseTitle }}</span>
      </div>
    </div>

    <!-- 中间：地图引擎切换器 -->
    <div class="header-center">
      <div class="map-switcher">
        <div
          v-for="map in mapEngines"
          :key="map.type"
          :class="['map-btn', { active: currentMapType === map.type }]"
          @click="handleSwitchMap(map.type)"
        >
          <span class="map-icon">{{ map.icon }}</span>
          <span class="map-name">{{ map.name }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧：全屏等工具 -->
    <div class="header-right">
      <OScreenfull />
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Fold, Expand } from '@element-plus/icons-vue'
import OScreenfull from './Header/Screenfull.vue'
import { useAppStore, useMapStore } from '@/stores'
import { baseTitle } from '@/config'
import logoSrc from '@/assets/images/login/logo.png'

const appStore = useAppStore()
const mapStore = useMapStore()

const { collapse } = storeToRefs(appStore)

// 地图引擎配置
const mapEngines = [
  { type: 'openlayer', name: 'OpenLayers', icon: '🗺️' },
  { type: 'mapbox', name: 'Mapbox GL', icon: '📍' },
  { type: 'gaode', name: '高德地图', icon: '📌' },
  { type: 'cesium', name: 'Cesium 3D', icon: '🌍' }
]

const currentMapType = computed(() => mapStore.getCurrentMapType)

const handleCollapse = () => {
  appStore.setCollapse(!appStore.collapse)
}

const handleSwitchMap = (type) => {
  if (type === currentMapType.value) return
  mapStore.switchMap(type)
}
</script>

<style scoped lang="scss">
.gis-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
}

/* 左侧区域 */
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  .collapse-icon {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background: var(--el-fill-color-light);
    }
  }

  .logo-title {
    display: flex;
    align-items: center;
    gap: 8px;

    .logo-img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      white-space: nowrap;
    }
  }
}

/* 中间区域 - 地图切换器 */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 16px;

  .map-switcher {
    display: flex;
    gap: 8px;
    background: var(--el-fill-color-light);
    padding: 4px;
    border-radius: 8px;

    .map-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--el-text-color-regular);

      &:hover {
        background: var(--el-fill-color);
        color: var(--el-text-color-primary);
      }

      &.active {
        background: var(--el-color-primary);
        color: white;
        font-weight: 500;
      }

      .map-icon {
        font-size: 14px;
      }

      .map-name {
        font-size: 13px;
        white-space: nowrap;
      }
    }
  }
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* 暗黑模式适配 */
html.dark {
  .gis-header {
    background: var(--el-bg-color-overlay);
  }

  .header-center {
    .map-switcher {
      background: var(--el-fill-color-dark);

      .map-btn:hover {
        background: var(--el-fill-color-light);
      }
    }
  }
}
</style>
