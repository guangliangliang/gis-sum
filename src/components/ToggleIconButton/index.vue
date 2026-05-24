<template>
  <div
    class="toggle-icon-btn"
    :class="{ active: active }"
    @click="$emit('toggle')"
  >
    <img :src="icon" class="btn-icon" />
    <span v-if="label" class="btn-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

defineEmits(['toggle'])
</script>

<style scoped lang="scss">
.toggle-icon-btn {
  align-items: center;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 4px;
  opacity: 0.5;
  padding: 3px 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.5);
    opacity: 0.8;
  }

  &.active {
    background: rgba(0, 212, 255, 0.15);
    border-color: #00d4ff;
    box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
    opacity: 1;

    .btn-icon {
      filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.6));
    }

    .btn-label {
      color: #00d4ff;
    }
  }

  .btn-icon {
    height: 20px;
    object-fit: contain;
    width: 20px;
  }

  .btn-label {
    color: #9ba7b8;
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>
