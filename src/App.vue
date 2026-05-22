<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores'

const MOBILE_BREAKPOINT = 768

const checkMobile = () => {
  const appStore = useAppStore()
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT
  appStore.setMobile(isMobile)
  if (isMobile) {
    appStore.setCollapse(true)
  }
}

onMounted(() => {
  const appStore = useAppStore()
  appStore.initTheme()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  console.log('App mounted, theme initialized.')
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <ConfigGlobal>
    <!-- 鼠标特效组件 -->
    <MouseEffects v-if="false" />
    <router-view></router-view>
  </ConfigGlobal>
</template>
