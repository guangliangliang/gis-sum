<template>
  <div class="cluster-tool">
    <div class="tool-title">点聚合</div>
    <div class="tool-buttons">
      <el-button type="primary" size="small" @click="handleAddCluster">
        <el-icon><Plus /></el-icon>
        叠加聚合点
      </el-button>
      <el-button type="danger" size="small" @click="handleClearCluster">
        <el-icon><Delete /></el-icon>
        清除聚合点
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'
import { useMapStore } from '@/stores'
import { Plus, Delete } from '@element-plus/icons-vue'

const mapStore = useMapStore()
const mapInstance = computed(() => mapStore.getMapInstance)
const currentMapType = computed(() => mapStore.getCurrentMapType)

function handleAddCluster() {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }
  const clusterManager = mapInstance.value.getClusterManager()
  if (clusterManager) {
    clusterManager.addClusterPoints(500)
  }
}

function handleClearCluster() {
  if (!mapInstance.value) {
    console.warn('地图实例未就绪')
    return
  }
  const clusterManager = mapInstance.value.getClusterManager()
  if (clusterManager) {
    clusterManager.clearCluster()
  }
}

watch(currentMapType, () => {
  console.log('[ClusterTool] 地图已切换')
})

onUnmounted(() => {
  console.log('[ClusterTool] 组件卸载，清理聚合点')
  if (mapInstance.value) {
    const clusterManager = mapInstance.value.getClusterManager()
    if (clusterManager) {
      clusterManager.clearCluster()
    }
  }
})
</script>

<style scoped lang="scss">
.cluster-tool {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 220px;

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
      padding-left: 12px;
      margin-left: 0 !important;
      
      .el-icon {
        margin-right: 6px;
      }
    }
  }
}
</style>
