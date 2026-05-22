<template>
  <header class="dashboard-header">
    <div class="header-decoration"></div>
    
    <div class="header-content">
      <!-- 左侧菜单 -->
      <div class="header-side">
        <button
          v-for="item in leftMenus"
          :key="item.key"
          class="menu-btn"
          :class="{ active: activeMenu === item.key }"
          @click="selectMenu(item.key)"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- 中间标题 -->
      <div class="header-title">
        <h1>新绛县数字孪生一张图</h1>
      </div>

      <!-- 右侧菜单和时间 -->
      <div class="header-side right">
        <button
          v-for="item in rightMenus"
          :key="item.key"
          class="menu-btn"
          :class="{ active: activeMenu === item.key }"
          @click="selectMenu(item.key)"
        >
          {{ item.label }}
        </button>
        <div class="time-display">
          <span class="time-icon">🕐</span>
          <span>{{ currentTime }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['menu-change'])

// 当前激活菜单
const activeMenu = ref('overview')

// 左侧菜单
const leftMenus = [
  { key: 'overview', label: '城市概览' },
  { key: 'economic', label: '经济发展' },
  { key: 'tourism', label: '文旅资源' }
]

// 右侧菜单
const rightMenus = [
  { key: 'livelihood', label: '民生服务' },
  { key: 'rural', label: '乡村振兴' }
]

// 当前时间
const currentTime = ref('')
let timer = null

// 更新时间
function updateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 选择菜单
function selectMenu(key) {
  activeMenu.value = key
  emit('menu-change', key)
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped lang="scss">
@import '@/views/xinjiang-dashboard/styles/dashboard.scss';
</style>
