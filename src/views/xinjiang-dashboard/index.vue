<template>
  <div class="dashboard-container">
    <!-- 角落装饰 -->
    <div class="corner-decoration top-left"></div>
    <div class="corner-decoration top-right"></div>
    <div class="corner-decoration bottom-left"></div>
    <div class="corner-decoration bottom-right"></div>

    <!-- 顶部标题栏 -->
    <DashboardHeader @menu-change="handleMenuChange" />

    <!-- 主内容区 -->
    <div class="dashboard-main">
      <!-- 中央地图 - 在底层 -->
      <CenterMap :activeMenu="activeMenu" ref="centerMapRef" />

      <!-- 左侧面板 - 悬浮在地图上 -->
      <LeftPanel :activeMenu="activeMenu" class="panel-float left-panel" />

      <!-- 右侧面板 - 悬浮在地图上 -->
      <RightPanel :activeMenu="activeMenu" class="panel-float right-panel" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardHeader from '@/views/xinjiang-dashboard/components/DashboardHeader.vue'
import LeftPanel from '@/views/xinjiang-dashboard/components/LeftPanel.vue'
import RightPanel from '@/views/xinjiang-dashboard/components/RightPanel.vue'
import CenterMap from '@/views/xinjiang-dashboard/components/CenterMap.vue'

const activeMenu = ref('overview')

// 菜单切换
function handleMenuChange(menuKey) {
  activeMenu.value = menuKey
}
</script>

<style scoped lang="scss">
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';
</style>
