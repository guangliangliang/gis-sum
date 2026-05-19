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
        <Menu />
      </aside>

      <!-- 右侧主内容区域 -->
      <div class="main-wrapper">
        <!-- 顶部导航栏 -->
        <o-header class="header" :show-logo="false" />

        <!-- 地图主体区域 -->
        <main class="main-content">
          <MapContainer />
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
        <Menu />
      </aside>

      <!-- 右侧主内容区域 -->
      <div class="main-wrapper top-wrapper">
        <!-- 地图主体区域 -->
        <main class="main-content">
          <MapContainer />
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
import { computed } from 'vue'
import { useAppStore } from '@/stores'
import OHeader from './Header.vue'
import Menu from './Menu/Menu.vue'
import TitleLogo from './TitleLogo.vue'
import BaseAQ from './BaseAQ.vue'
import MapContainer from '@/components/MapContainer/index.vue'

const appStore = useAppStore()
const layout = computed(() => appStore.getLayout)

const handleClickOutside = () => {
  appStore.setCollapse(true)
}
</script>

<style scoped lang="scss">
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
  transition: width 0.3s ease;
  z-index: 1000;

  &.sidebar-collapse {
    width: var(--left-menu-min-width);
  }

  &.sidebar-mobile {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    transform: translateX(0);

    &.sidebar-collapse {
      transform: translateX(-100%);
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
    transition: margin-left 0.3s ease, width 0.3s ease;
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

/* 底部 */
.footer {
  flex-shrink: 0;
  height: 30px;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
