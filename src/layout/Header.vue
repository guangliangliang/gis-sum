<template>
  <el-header>
    <div class="header-left">
      <BaseIcon :size="24" :icon="collapse ? 'expand' : 'fold'" @click="handleCollapse" />
    </div>
    <div class="header-right">
      <Maps />
      <OScreenfull />
    </div>
  </el-header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import OScreenfull from './Header/Screenfull.vue'
import Maps from './Header/Maps.vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const { collapse } = storeToRefs(appStore)

const handleCollapse = () => {
  appStore.setCollapse(!appStore.collapse)
}
</script>

<style scoped lang="scss">
.header-left {
  align-items: center;
  display: flex;

  .collapse-icon {
    cursor: pointer;
  }

  .title {
    margin-left: 12px;
  }
}

.header-right {
  display: flex;
  justify-content: flex-end;

  .user-dropdown {
    align-items: center;
    cursor: pointer;
    display: flex;

    .name {
      margin-left: 8px;
    }
  }
}
</style>
