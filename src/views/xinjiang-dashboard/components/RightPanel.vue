<template>
  <aside class="side-panel right-panel">
    <!-- 产业结构 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">🏭</span>
        <span class="card-title">产业结构</span>
      </div>
      <div class="card-content">
        <div ref="industryChartRef" class="chart-container" style="height: 140px;"></div>
      </div>
    </div>

    <!-- 教育资源 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">🏫</span>
        <span class="card-title">教育资源</span>
      </div>
      <div class="card-content">
        <div class="list-item">
          <span class="item-name">高中</span>
          <span class="item-value">{{ livelihoodData.schools.high }}所</span>
        </div>
        <div class="list-item">
          <span class="item-name">初中</span>
          <span class="item-value">{{ livelihoodData.schools.middle }}所</span>
        </div>
        <div class="list-item">
          <span class="item-name">小学</span>
          <span class="item-value">{{ livelihoodData.schools.primary }}所</span>
        </div>
        <div class="list-item">
          <span class="item-name">幼儿园</span>
          <span class="item-value">{{ livelihoodData.schools.kindergarten }}所</span>
        </div>
      </div>
    </div>

    <!-- 医疗机构 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">🏥</span>
        <span class="card-title">医疗机构</span>
      </div>
      <div class="card-content">
        <div class="list-item">
          <span class="item-name">二级医院</span>
          <span class="item-value">{{ livelihoodData.hospitals.level2 }}所</span>
        </div>
        <div class="list-item">
          <span class="item-name">一级医院</span>
          <span class="item-value">{{ livelihoodData.hospitals.level1 }}所</span>
        </div>
        <div class="list-item">
          <span class="item-name">诊所/卫生室</span>
          <span class="item-value">{{ livelihoodData.hospitals.clinics }}所</span>
        </div>
      </div>
    </div>

    <!-- 旅游数据 -->
    <div class="panel-card">
      <div class="card-header">
        <span class="card-icon">🎯</span>
        <span class="card-title">游客趋势</span>
      </div>
      <div class="card-content">
        <div ref="tourismChartRef" class="chart-container" style="height: 130px;"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { livelihoodData as livelihoodMockData, tourismData, economicData } from '@/views/xinjiang-dashboard/core/mockData.js'

const industryChartRef = ref(null)
const tourismChartRef = ref(null)
let industryChart = null
let tourismChart = null

const livelihoodData = livelihoodMockData

// 初始化产业结构饼图
function initIndustryChart() {
  if (!industryChartRef.value) return

  industryChart = echarts.init(industryChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: {
        color: '#e0e6ed'
      }
    },
    legend: {
      bottom: '0%',
      left: 'center',
      textStyle: {
        color: '#9ba7b8',
        fontSize: 10
      }
    },
    series: [
      {
        name: '产业结构',
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#0a1628',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 11,
            fontWeight: 'bold',
            color: '#00d4ff'
          }
        },
        data: [
          { value: 24.5, name: '第一产业', itemStyle: { color: '#67c23a' } },
          { value: 75.2, name: '第二产业', itemStyle: { color: '#409eff' } },
          { value: 50.7, name: '第三产业', itemStyle: { color: '#00d4ff' } }
        ]
      }
    ]
  }

  industryChart.setOption(option)
}

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
  initIndustryChart()
  initTourismChart()
})

// 窗口大小变化时重绘
window.addEventListener('resize', () => {
  industryChart && industryChart.resize()
  tourismChart && tourismChart.resize()
})
</script>

<style scoped lang="scss">
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';
</style>

