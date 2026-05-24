<template>
  <aside class="side-panel right-panel">
    <!-- 学校资源 -->
    <div class="panel-card equal-card list-card">
      <div class="card-header">
        <span class="card-icon">🏫</span>
        <span class="card-title">学校资源</span>
        <ToggleIconButton
          :icon="schoolIcon"
          :active="schoolPointsVisible"
          class="header-toggle-btn"
          @toggle="$emit('toggle-school-points')"
        />
      </div>
      <div class="card-content equal-content">
        <div class="item-list">
          <div
            class="list-item"
            v-for="item in schoolList"
            :key="item.name"
            @click="$emit('school-row-click', item)"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-tag">{{ schoolTypeMap[item.type] || item.type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 医疗资源 -->
    <div class="panel-card equal-card list-card">
      <div class="card-header">
        <span class="card-icon">🏥</span>
        <span class="card-title">医疗资源</span>
        <ToggleIconButton
          :icon="hospitalIcon"
          :active="hospitalPointsVisible"
          class="header-toggle-btn"
          @toggle="$emit('toggle-hospital-points')"
        />
      </div>
      <div class="card-content equal-content">
        <div class="item-list">
          <div
            class="list-item"
            v-for="item in hospitalList"
            :key="item.name"
            @click="$emit('hospital-row-click', item)"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-tag">{{ item.level }}</span>
          </div>
        </div>
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
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { schoolPoints, hospitalPoints, tourismData } from '@/views/xinjiang-dashboard/core/mockData.js'
import ToggleIconButton from '@/components/ToggleIconButton/index.vue'
import schoolIcon from '@/assets/images/map/point/school.png'
import hospitalIcon from '@/assets/images/map/point/hospital.png'

defineProps({
  schoolPointsVisible: {
    type: Boolean,
    default: false
  },
  hospitalPointsVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-school-points', 'toggle-hospital-points', 'school-row-click', 'hospital-row-click'])

const schoolList = schoolPoints
const hospitalList = hospitalPoints

const schoolTypeMap = {
  high: '高中',
  middle: '中学',
  primary: '小学',
  vocational: '职业学校',
  kindergarten: '幼儿园',
  school: '学校'
}

const tourismChartRef = ref(null)
let tourismChart = null

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

  .list-card {
    .card-header {
      justify-content: flex-start;
    }

    .header-toggle-btn {
      margin-left: auto;
    }

    .equal-content {
      overflow-y: auto;
      padding: 0;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 212, 255, 0.3);
        border-radius: 2px;
      }
    }

    .item-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .list-item {
      align-items: center;
      border-bottom: 1px solid rgba(0, 212, 255, 0.08);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 7px 10px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 212, 255, 0.08);
        border-bottom-color: rgba(0, 212, 255, 0.3);
      }

      .item-name {
        color: #e0e6ed;
        font-size: 12px;
      }

      .item-tag {
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid rgba(0, 212, 255, 0.25);
        border-radius: 3px;
        color: #00d4ff;
        font-size: 11px;
        padding: 1px 6px;
        white-space: nowrap;
      }
    }
  }
}
</style>
