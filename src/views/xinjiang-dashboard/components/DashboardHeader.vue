<template>
  <header class="dashboard-header">
    <div class="header-decoration"></div>
    
    <div class="header-content">
      <!-- 左侧返回按钮 -->
      <div class="header-side">
        <button class="menu-btn" @click="goBack">
          ← 返回地图
        </button>
      </div>

      <!-- 中间标题 -->
      <div class="header-title">
        <h1>新绛县数字孪生一张图</h1>
      </div>

      <!-- 右侧时间显示 -->
      <div class="time-display">
        <span class="time-icon">🕐</span>
        <span>{{ currentTime }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/cluster')
}

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
