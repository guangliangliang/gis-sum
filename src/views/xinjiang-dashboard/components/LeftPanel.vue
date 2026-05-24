<template>
  <aside class="side-panel left-panel">
    <!-- 城市概览面板 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">📊</span>
        <span class="card-title">城市概览</span>
      </div>
      <div class="card-content city-overview-content">
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-label">总人口</div>
            <div class="stat-value-wrapper">
              <div class="stat-value number-scroll">
                {{ formatNumber(countyData.totalPopulation) }}
              </div>
              <span class="stat-unit">人</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">GDP总量</div>
            <div class="stat-value-wrapper">
              <div class="stat-value">{{ countyData.gdp }}</div>
              <span class="stat-unit">亿元</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">总面积</div>
            <div class="stat-value-wrapper">
              <div class="stat-value">{{ countyData.totalArea }}</div>
              <span class="stat-unit">km²</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">乡镇数量</div>
            <div class="stat-value-wrapper">
              <div class="stat-value">{{ countyData.adminTowns }}</div>
              <span class="stat-unit">个</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 乡镇综合数据表格 -->
    <div class="panel-card town-table-card">
      <div class="card-header">
        <span class="card-icon">📋</span>
        <span class="card-title">乡镇综合数据</span>
        <ToggleIconButton
          :icon="townshipIcon"
          :active="townshipPointsVisible"
          class="header-toggle-btn"
          @toggle="$emit('toggle-township-points')"
        />
      </div>
      <div class="card-content">
        <el-table
          :data="sortedTowns"
          style="width: 100%"
          height="100%"
          :header-cell-style="{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }"
          :cell-style="{ color: '#9ba7b8', borderColor: 'rgba(0, 212, 255, 0.1)' }"
          @row-click="handleRowClick"
        >
          <el-table-column type="index" label="排名" width="50" align="center" />
          <el-table-column prop="name" label="名称" width="70" align="center" />
          <el-table-column
            prop="population"
            label="人口"
            width="70"
            align="center"
            :formatter="formatPopulation"
          />
          <el-table-column
            prop="area"
            label="面积"
            width="60"
            align="center"
            :formatter="formatArea"
          />
          <el-table-column
            prop="gdp"
            label="GDP"
            width="60"
            align="center"
            :formatter="formatGdp"
          />
        </el-table>
      </div>
    </div>

    <!-- GDP趋势图 -->
    <div class="panel-card flex-chart-card">
      <div class="card-header">
        <span class="card-icon">📈</span>
        <span class="card-title">GDP趋势</span>
      </div>
      <div class="card-content chart-flex-content">
        <div ref="gdpChartRef" class="chart-container chart-flex"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import { countyOverview, townData, economicData } from '@/views/xinjiang-dashboard/core/mockData.js'
import ToggleIconButton from '@/components/ToggleIconButton/index.vue'
import townshipIcon from '@/assets/images/map/point/township.png'

const props = defineProps({
  activeMenu: {
    type: String,
    default: 'overview'
  },
  townshipPointsVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-township-points', 'town-row-click'])

const gdpChartRef = ref(null)
let gdpChart = null

const countyData = countyOverview

// 按人口排序的乡镇
const sortedTowns = computed(() => {
  return [...townData].sort((a, b) => b.population - a.population)
})

// 格式化数字
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// el-table 格式化函数
function formatPopulation(row) {
  return formatNumber(row.population)
}

function formatArea(row) {
  return `${row.area}km²`
}

function formatGdp(row) {
  return `${row.gdp}亿`
}

// 行点击事件
function handleRowClick(row) {
  emit('town-row-click', row)
}

// 初始化GDP图表
function initGdpChart() {
  if (!gdpChartRef.value) return

  gdpChart = echarts.init(gdpChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '0%',
      right: '0%',
      top: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: economicData.years,
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.3)'
        }
      },
      axisLabel: {
        color: '#9ba7b8',
        fontSize: 11,
        interval: 0,
        margin: 10,
        overflow: 'truncate'
      }
    },
    tooltip: {
      show: true
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
        fontSize: 11
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: 'GDP',
        type: 'line',
        data: economicData.gdp,
        smooth: true,
        lineStyle: {
          color: '#00d4ff',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
          ])
        },
        itemStyle: {
          color: '#00d4ff'
        }
      }
    ]
  }

  gdpChart.setOption(option)
}

onMounted(() => {
  initGdpChart()
})

// 窗口大小变化时重绘
window.addEventListener('resize', () => {
  gdpChart && gdpChart.resize()
})
</script>

<style scoped lang="scss">
@import url('@/views/xinjiang-dashboard/styles/dashboard.scss');

.side-panel.left-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 90px);
  overflow: hidden;

  .panel-card {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  .card-content {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  .flex-chart-card {
    .chart-flex-content {
      display: flex;
      flex: 1;
      min-height: 0;
    }

    .chart-flex {
      flex: 1;
      min-height: 0;
      width: 100%;
    }
  }

  .stat-card {
    .stat-value-wrapper {
      align-items: baseline;
      display: flex;
      gap: 4px;
      justify-content: center;
    }
  }

  .city-overview-content {
    display: flex;
    flex: 1;
    min-height: 0;

    .stat-cards {
      align-content: space-around;
      display: grid;
      flex: 1;
      gap: 12px;
      grid-template-columns: repeat(2, 1fr);
      min-height: 0;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px;
    }
  }

  .town-table-card {
    .card-header {
      justify-content: flex-start;
    }

    .header-toggle-btn {
      margin-left: auto;
    }
    .card-content {
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
