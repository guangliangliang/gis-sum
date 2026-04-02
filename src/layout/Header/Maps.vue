<template>
  <div class="menu-list">
    <span
      class="menu-item"
      v-for="item in menuList"
      :key="item.id"
      :class="{ active: activeMenu === item.type }"
      @click="handleSelect(item.type)"
      @mouseenter="preloadMap(item.type)"
      role="link"
      tabindex="0"
      @keydown.enter="handleSelect(item.type)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMapStore } from '@/stores/map'

defineOptions({
  name: 'Maps'
})

const mapStore = useMapStore()

// 基础菜单项
const baseMenu = [
  {
    id: 'mapbox',
    name: 'Mapbox',
    type: 'mapbox'
  },
  {
    id: 'openlayer',
    name: 'Openlayer',
    type: 'openlayer'
  },
  {
    id: 'gaode',
    name: 'Gaode',
    type: 'gaode'
  },
  {
    id: 'cesium',
    name: 'Cesium',
    type: 'cesium'
  }
]

// 根据用户权限动态生成菜单
const menuList = computed(() => {
  const menus = [...baseMenu]
  return menus
})

// 当前激活的菜单
const activeMenu = computed(() => mapStore.getCurrentMapType)

const handleSelect = (type) => {
  if (!type || activeMenu.value === type) return
  mapStore.switchMap(type)
}

// 预加载地图资源
const preloadMap = (type) => {
  // 仅预加载未打开过的地图
  if (activeMenu.value === type) return
  import(`@/views/${type}/index.vue`)
}
</script>

<style lang="scss" scoped>
.menu-container {
  //background-color: var(--el-bg-color-overlay);
  border-right: 1px solid var(--el-border-color);
  bottom: 0;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  height: calc(100% - 60px);
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 60px;
  z-index: 2000;
}

html.dark {
  .menu-container {
    background-color: var(--el-bg-color-overlay);
  }
}

.menu-list {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 24px; /* 中间间隔 */
  padding: 12px 16px;
  white-space: nowrap;
}

.menu-item {
  border-radius: 4px;
  color: var(--el-text-color);
  cursor: pointer;
  padding: 4px 8px;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;
}

.menu-item:hover {
  color: var(--el-color-primary);
}

.menu-item.active {
  box-shadow: inset 0 -2px 0 var(--el-color-primary);
  color: var(--el-color-primary);
  font-weight: 600;
}
</style>
