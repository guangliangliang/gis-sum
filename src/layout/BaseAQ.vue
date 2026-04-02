<template>
  <div class="base-aq">
    <span class="copyright">© 2024 GIS地图平台 | All Rights Reserved</span>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseAQ'
})
</script>

<style scoped lang="scss">
.base-aq {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--el-text-color-secondary);

  .copyright {
    opacity: 0.7;
  }
}
</style>
