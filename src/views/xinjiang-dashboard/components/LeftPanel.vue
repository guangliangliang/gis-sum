<template>
  <aside class="side-panel left-panel">
    <!-- 城市概览面板 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">📊</span>
        <span class="card-title">城市概览</span>
      </div>
      <div class="card-content">
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-label">总人口</div>
            <div class="stat-value number-scroll">{{ formatNumber(countyData.totalPopulation) }}</div>
            <span class="stat-unit">人</span>
          </div>
          <div class="stat-card">
            <div class="stat-label">总面积</div>
            <div class="stat-value">{{ countyData.totalArea }}</div>
            <span class="stat-unit">km²</span>
          </div>
          <div class="stat-card">
            <div class="stat-label">GDP总量</div>
            <div class="stat-value number-scroll">{{ countyData.gdp }}</div>
            <span class="stat-unit">亿元</span>
          </div>
          <div class="stat-card">
            <div class="stat-label">乡镇数量</div>
            <div class="stat-value">{{ countyData.adminTowns }}</div>
            <span class="stat-unit">个</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 乡镇人口排行 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">👥</span>
        <span class="card-title">乡镇人口排行</span>
      </div>
      <div class="card-content">
        <div class="list-item" v-for="(town, index) in sortedTowns" :key="town.name">
          <span class="item-name">
            <span style="color: #00d4ff; margin-right: 8px;">{{ index + 1 }}</span>
            {{ town.name }}
          </span>
          <span class="item-value">{{ formatNumber(town.population) }}人</span>
        </div>
      </div>
    </div>

    <!-- GDP趋势图 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">📈</span>
        <span class="card-title">GDP趋势</span>
      </div>
      <div class="card-content">
        <div ref="gdpChartRef" class="chart-container" style="height: 160px;"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { countyOverview, townData, economicData } from '@/views/xinjiang-dashboard/core/mockData.js'

const props = defineProps({
  activeMenu: {
    type: String,
    default: 'overview'
  }
})

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

// 初始化GDP图表
function initGdpChart() {
  if (!gdpChartRef.value) return

  gdpChart = echarts.init(gdpChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '10%',
      right: '5%',
      top: '15%',
      bottom: '10%'
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
        fontSize: 11
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
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';
</style>

