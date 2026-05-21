<template>
  <div class="draw-tool">
    <div class="tool-title">绘制点线面</div>
    <div class="tool-buttons">
      <el-button
        :type="drawType === 'point' ? 'primary' : 'default'"
        size="small"
        @click="handleDraw('point')"
      >
        <el-icon><Location /></el-icon>
        绘制点
      </el-button>
      <el-button
        :type="drawType === 'line' ? 'primary' : 'default'"
        size="small"
        @click="handleDraw('line')"
      >
        <el-icon><Minus /></el-icon>
        绘制线
      </el-button>
      <el-button
        :type="drawType === 'polygon' ? 'primary' : 'default'"
        size="small"
        @click="handleDraw('polygon')"
      >
        <el-icon><Select /></el-icon>
        绘制面
      </el-button>
      <el-button type="danger" size="small" @click="handleClearDraw">
        <el-icon><Delete /></el-icon>
        清除绘制
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useMapStore } from '@/stores'
import { Location, Minus, Select, Delete } from '@element-plus/icons-vue'

const mapStore = useMapStore()
const mapInstance = computed(() => mapStore.getMapInstance)
const drawType = ref(null)

function handleDraw(type) {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }

  const drawManager = mapInstance.value.getDrawManager()
  if (!drawManager) return

  if (drawType.value === type) {
    drawManager.stopDraw()
    drawType.value = null
  } else {
    drawManager.startDraw(type)
    drawType.value = type
  }
}

function handleClearDraw() {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }
  const drawManager = mapInstance.value.getDrawManager()
  if (drawManager) {
    drawManager.clearDrawings()
    drawType.value = null
  }
}

onUnmounted(() => {
  if (mapInstance.value) {
    const drawManager = mapInstance.value.getDrawManager()
    if (drawManager) {
      drawManager.stopDraw()
    }
  }
})
</script>

<style scoped lang="scss">
.draw-tool {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-width: 200px;

  .tool-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
  }

  .tool-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .el-button {
      width: 100%;
      justify-content: flex-start;
    }
  }
}
</style>
