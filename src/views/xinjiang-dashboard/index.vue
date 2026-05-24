<template>
  <div class="dashboard-container">
    <!-- 角落装饰 -->
    <div class="corner-decoration top-left"></div>
    <div class="corner-decoration top-right"></div>
    <div class="corner-decoration bottom-left"></div>
    <div class="corner-decoration bottom-right"></div>

    <!-- 顶部标题栏 -->
    <DashboardHeader />

    <!-- 主内容区 -->
    <div class="dashboard-main">
      <!-- 中央地图 - 在底层 -->
      <CenterMap
        :activeMenu="activeMenu"
        ref="centerMapRef"
        @township-points-change="onTownshipPointsChange"
        @school-points-change="onSchoolPointsChange"
        @hospital-points-change="onHospitalPointsChange"
      />

      <!-- 左侧面板 - 悬浮在地图上 -->
      <LeftPanel
        :activeMenu="activeMenu"
        :townshipPointsVisible="townshipPointsVisible"
        class="panel-float left-panel"
        @toggle-township-points="onToggleTownshipPoints"
        @town-row-click="onTownRowClick"
      />

      <!-- 右侧面板 - 悬浮在地图上 -->
      <RightPanel
        :activeMenu="activeMenu"
        :schoolPointsVisible="schoolPointsVisible"
        :hospitalPointsVisible="hospitalPointsVisible"
        class="panel-float right-panel"
        @toggle-school-points="onToggleSchoolPoints"
        @toggle-hospital-points="onToggleHospitalPoints"
        @school-row-click="onSchoolRowClick"
        @hospital-row-click="onHospitalRowClick"
      />

      <!-- 图例 -->
      <MapLegend :items="legendItems" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardHeader from '@/views/xinjiang-dashboard/components/DashboardHeader.vue'
import LeftPanel from '@/views/xinjiang-dashboard/components/LeftPanel.vue'
import RightPanel from '@/views/xinjiang-dashboard/components/RightPanel.vue'
import CenterMap from '@/views/xinjiang-dashboard/components/CenterMap.vue'
import MapLegend from '@/views/xinjiang-dashboard/components/MapLegend.vue'
import townshipIcon from '@/assets/images/map/point/township.png'
import schoolIcon from '@/assets/images/map/point/school.png'
import hospitalIcon from '@/assets/images/map/point/hospital.png'

const activeMenu = ref('overview')
const centerMapRef = ref(null)
const townshipPointsVisible = ref(false)
const schoolPointsVisible = ref(false)
const hospitalPointsVisible = ref(false)

const legendItems = computed(() => {
  const items = []
  if (townshipPointsVisible.value) {
    items.push({ icon: townshipIcon, label: '乡镇' })
  }
  if (schoolPointsVisible.value) {
    items.push({ icon: schoolIcon, label: '学校' })
  }
  if (hospitalPointsVisible.value) {
    items.push({ icon: hospitalIcon, label: '医院' })
  }
  return items
})

function onToggleTownshipPoints() {
  centerMapRef.value?.toggleTownshipPoints()
}

function onToggleSchoolPoints() {
  centerMapRef.value?.toggleSchoolPoints()
}

function onToggleHospitalPoints() {
  centerMapRef.value?.toggleHospitalPoints()
}

function onTownRowClick(row) {
  centerMapRef.value?.flyToTown(row.name)
}

function onSchoolRowClick(item) {
  centerMapRef.value?.flyToSchool(item.name)
}

function onHospitalRowClick(item) {
  centerMapRef.value?.flyToHospital(item.name)
}

function onTownshipPointsChange(visible) {
  townshipPointsVisible.value = visible
}

function onSchoolPointsChange(visible) {
  schoolPointsVisible.value = visible
}

function onHospitalPointsChange(visible) {
  hospitalPointsVisible.value = visible
}
</script>

<style scoped lang="scss">
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';
</style>
