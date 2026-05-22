<template>
  <div class="gis-layout" :class="layout">
    <!-- 经典布局模式 -->
    <template v-if="layout === 'classic'">
      <!-- 左侧菜单区域 -->
      <aside
        :class="{
          sidebar: true,
          'sidebar-collapse': appStore.collapse,
          'sidebar-mobile': appStore.mobile
        }"
      >
        <TitleLogo />
        <Menu ref="menuRef" />
      </aside>

      <!-- 右侧主内容区域 -->
      <div class="main-wrapper">
        <!-- 顶部导航栏 -->
        <o-header class="header" :show-logo="false" />

        <!-- 地图主体区域 -->
        <main class="main-content">
          <MapContainer @map-ready="handleMapReady" />
          <!-- 悬浮工具栏 -->
          <div class="floating-toolbar">
            <router-view :key="mapKey" />
          </div>
        </main>

        <!-- 底部 -->
        <footer class="footer">
          <BaseAQ />
        </footer>
      </div>
    </template>

    <!-- 顶部左侧布局模式 -->
    <template v-else-if="layout === 'topLeft'">
      <!-- 顶部区域 -->
      <div class="top-header">
        <TitleLogo />
        <o-header class="header" :show-logo="false" />
      </div>

      <!-- 左侧菜单 -->
      <aside
        :class="{
          sidebar: true,
          'sidebar-collapse': appStore.collapse,
          'sidebar-mobile': appStore.mobile,
          'top-sidebar': true
        }"
      >
        <Menu ref="menuRef" />
      </aside>

      <!-- 右侧主内容区域 -->
      <div class="main-wrapper top-wrapper">
        <!-- 地图主体区域 -->
        <main class="main-content">
          <MapContainer @map-ready="handleMapReady" />
          <!-- 悬浮工具栏 -->
          <div class="floating-toolbar">
            <router-view :key="mapKey" />
          </div>
        </main>

        <!-- 底部 -->
        <footer class="footer">
          <BaseAQ />
        </footer>
      </div>
    </template>

    <!-- 手机端遮罩 -->
    <div
      v-if="appStore.mobile && !appStore.collapse"
      class="mobile-overlay"
      @click="handleClickOutside"
    ></div>

    <!-- 设置面板 -->
    <Settings />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore, useMapStore } from '@/stores'
import OHeader from './Header.vue'
import Menu from './Menu/Menu.vue'
import TitleLogo from './TitleLogo.vue'
import BaseAQ from './BaseAQ.vue'
import MapContainer from '@/components/MapContainer/index.vue'

const appStore = useAppStore()
const mapStore = useMapStore()
const layout = computed(() => appStore.getLayout)
const mapKey = computed(() => mapStore.getMapKey)
const menuRef = ref(null)

const handleClickOutside = () => {
  appStore.setCollapse(true)
}

const handleMapReady = (instance) => {
  if (menuRef.value && menuRef.value.setMapInstance) {
    menuRef.value.setMapInstance(instance)
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.gis-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;

  /* 顶部左侧布局 */
  &.topLeft {
    display: block;
  }
}

/* 顶部左侧布局的顶部区域 */
.top-header {
  display: flex;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 1501;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  top: 0;
  left: 0;

  .header {
    border-bottom: none;
    flex: 1;
  }
}

/* 左侧菜单 */
.sidebar {
  flex-shrink: 0;
  width: var(--left-menu-max-width);
  height: 100%;
  background: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.08s ease-out, transform 0.08s ease-out;
  z-index: 1000;
  overflow: hidden;

  &.sidebar-collapse {
    width: var(--left-menu-min-width);
  }

  &.sidebar-mobile {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    transform: translateX(0);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    width: 260px !important;
    transition: transform 0.2s ease-out;

    &.sidebar-collapse {
      transform: translateX(-100%);
      width: 260px !important;
    }
  }

  /* 顶部左侧布局的菜单 */
  &.top-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100% - 60px);
  }
}

/* 右侧主内容区 */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  /* 顶部左侧布局的主内容区 */
  &.top-wrapper {
    margin-left: var(--left-menu-max-width);
    margin-top: 60px;
    width: calc(100% - var(--left-menu-max-width));
    height: calc(100% - 60px);
    transition: margin-left 0.08s ease, width 0.08s ease;
  }
}

/* 顶部左侧布局菜单折叠时 */
.gis-layout.topLeft .sidebar.sidebar-collapse ~ .main-wrapper.top-wrapper {
  margin-left: var(--left-menu-min-width);
  width: calc(100% - var(--left-menu-min-width));
}

/* 顶部导航栏 */
.header {
  flex-shrink: 0;
  height: 60px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  z-index: 999;
}

/* 地图主体区域 */
.main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
}

/* 悬浮工具栏 */
.floating-toolbar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

/* 底部 */
.footer {
  flex-shrink: 0;
  height: 30px;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

/* 手机端遮罩 */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 暗黑模式适配 */
html.dark {
  .main-content {
    background: #1a1a1a;
  }

  .top-header {
    background: var(--el-bg-color-overlay);
  }
}

/* 移动端适配 */
@include mobile {
  .sidebar {
    width: 260px;
  }

  .header {
    height: 56px;
  }

  .top-header {
    height: 56px;
  }

  .sidebar.top-sidebar {
    top: 56px;
    height: calc(100% - 56px);
  }

  .main-wrapper.top-wrapper {
    margin-top: 56px;
    height: calc(100% - 56px);
  }

  .floating-toolbar {
    top: 10px;
    left: 10px;
    right: 10px;
  }

  .footer {
    height: 26px;
    font-size: 11px;
  }
}
</style>
