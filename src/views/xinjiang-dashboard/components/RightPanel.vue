<template>
  <aside class="side-panel right-panel">
    <!-- 学校资源 -->
    <div class="panel-card equal-card table-card">
      <div class="card-header">
        <span class="card-icon">🏫</span>
        <span class="card-title">学校资源</span>
      </div>
      <div class="card-content equal-content">
        <el-table
          :data="schoolTableData"
          style="width: 100%"
          height="100%"
          :header-cell-style="{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }"
          :cell-style="{ color: '#9ba7b8', borderColor: 'rgba(0, 212, 255, 0.1)' }"
        >
          <el-table-column prop="category" label="分类" align="center" />
          <el-table-column prop="count" label="数量" align="center" />
          <el-table-column prop="unit" label="单位" align="center" />
        </el-table>
      </div>
    </div>

    <!-- 医疗资源 -->
    <div class="panel-card equal-card table-card">
      <div class="card-header">
        <span class="card-icon">🏥</span>
        <span class="card-title">医疗资源</span>
      </div>
      <div class="card-content equal-content">
        <el-table
          :data="hospitalTableData"
          style="width: 100%"
          height="100%"
          :header-cell-style="{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }"
          :cell-style="{ color: '#9ba7b8', borderColor: 'rgba(0, 212, 255, 0.1)' }"
        >
          <el-table-column prop="category" label="分类" align="center" />
          <el-table-column prop="count" label="数量" align="center" />
          <el-table-column prop="unit" label="单位" align="center" />
        </el-table>
      </div>
    </div>

    <!-- 旅游数据 -->
    <div class="panel-card equal-card">
      <div class="card-header">
        <span class="card-icon">🎯</span>
        <span class="card-title">游客趋势</span>
      </div>
      <div class="card-content equal-content">
        <div ref="tourismChartRef" class="chart-container chart-flex"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import {
  livelihoodData as livelihoodMockData,
  tourismData
} from '@/views/xinjiang-dashboard/core/mockData.js'

const tourismChartRef = ref(null)
let tourismChart = null

const livelihoodData = livelihoodMockData

// 学校表格数据
const schoolTableData = computed(() => [
  { category: '高中', count: livelihoodData.schools.high, unit: '所' },
  { category: '初中', count: livelihoodData.schools.middle, unit: '所' },
  { category: '小学', count: livelihoodData.schools.primary, unit: '所' },
  { category: '幼儿园', count: livelihoodData.schools.kindergarten, unit: '所' }
])

// 医院表格数据
const hospitalTableData = computed(() => [
  { category: '二级医院', count: livelihoodData.hospitals.level2, unit: '所' },
  { category: '一级医院', count: livelihoodData.hospitals.level1, unit: '所' },
  { category: '诊所/卫生室', count: livelihoodData.hospitals.clinics, unit: '所' }
])

// 初始化旅游趋势图
function initTourismChart() {
  if (!tourismChartRef.value) return

  tourismChart = echarts.init(tourismChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: {
        color: '#e0e6ed'
      }
    },
    grid: {
      left: '15%',
      right: '10%',
      top: '15%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: tourismData.years,
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.3)'
        }
      },
      axisLabel: {
        color: '#9ba7b8',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.3)'
        }
      },
      axisLabel: {
        color: '#9ba7b8',
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '游客量',
        type: 'bar',
        data: tourismData.visitors,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: '#409eff' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  }

  tourismChart.setOption(option)
}

onMounted(() => {
  initTourismChart()
})

// 窗口大小变化时重绘
window.addEventListener('resize', () => {
  tourismChart && tourismChart.resize()
})
</script>

<style scoped lang="scss">
@import url('@/views/xinjiang-dashboard/styles/dashboard.scss');

.side-panel.right-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 90px);
  overflow: hidden;

  .equal-card {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .equal-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;

    .chart-flex {
      flex: 1;
      min-height: 0;
      width: 100%;
    }
  }

  .table-card {
    .equal-content {
      overflow: hidden;
      padding: 0;
    }

    :deep(.el-table) {
      background-color: transparent;
      font-size: 12px;
    }

    :deep(.el-table tr) {
      background-color: transparent;
    }

    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: transparent;
      border-bottom: 1px solid rgb(0 212 255 / 30%);
      border-top: 1px solid rgb(0 212 255 / 30%);
      color: #00d4ff;
      cursor: pointer;
    }

    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell:first-child) {
      border-left: 1px solid rgb(0 212 255 / 30%);
    }

    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell:last-child) {
      border-right: 1px solid rgb(0 212 255 / 30%);
    }

    :deep(.el-table__body tr:hover td) {
      border-bottom: 1px solid rgb(0 212 255 / 30%);
      border-top: 1px solid rgb(0 212 255 / 30%);
      color: #00d4ff;
    }

    :deep(.el-table__body tr:hover td:first-child) {
      border-left: 1px solid rgb(0 212 255 / 30%);
    }

    :deep(.el-table__body tr:hover td:last-child) {
      border-right: 1px solid rgb(0 212 255 / 30%);
    }

    :deep(.el-table td),
    :deep(.el-table th.is-leaf) {
      border-color: rgb(0 212 255 / 10%);
    }

    :deep(.el-table::before) {
      display: none;
    }

    :deep(.el-table--fit .el-table__inner-wrapper::before) {
      display: none;
    }

    :deep(.el-table th) {
      padding: 8px 0;
    }

    :deep(.el-table td) {
      padding: 6px 0;
    }
  }
}
</style>
