<template>
  <div class="map-legend" v-if="items.length > 0">
    <div class="legend-title">图例</div>
    <div class="legend-list">
      <div class="legend-item" v-for="item in items" :key="item.label">
        <img :src="item.icon" class="legend-icon" />
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.map-legend {
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, rgba(13, 30, 53, 0.92) 0%, rgba(16, 39, 68, 0.88) 100%);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  bottom: 30px;
  left: 380px;
  min-width: 100px;
  padding: 10px 14px;
  position: absolute;
  z-index: 200;

  &::before,
  &::after {
    border: 2px solid #00d4ff;
    content: '';
    height: 16px;
    position: absolute;
    width: 16px;
  }

  &::before {
    border-bottom: none;
    border-right: none;
    left: -1px;
    top: -1px;
  }

  &::after {
    border-left: none;
    border-top: none;
    bottom: -1px;
    right: -1px;
  }

  .legend-title {
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
    color: #00d4ff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 8px;
    padding-bottom: 6px;
  }

  .legend-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .legend-item {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  .legend-icon {
    height: 20px;
    object-fit: contain;
    width: 20px;
  }

  .legend-label {
    color: #e0e6ed;
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>
