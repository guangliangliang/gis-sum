<template>
  <div class="chart-wrapper">
    <div class="boxfoot"></div>
    <template v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <h2
      v-else-if="title"
      :class="['chart-title', { 'with-background': titleBackground }]"
    >
      {{ title }}
    </h2>
    <div :class="['chart-content', { 'full-height': !title && !$slots.title }]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  titleBackground: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #3486da;
  position: relative;
  padding: 12px;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  content: "";
  border-bottom: 3px solid #3486da;
  bottom: -2px;
}

.chart-wrapper:before,
.boxfoot:before {
  border-left: 3px solid #3486da;
  left: -2px;
}

.chart-wrapper:after,
.boxfoot:after {
  border-right: 3px solid #3486da;
  right: -2px;
}

.chart-title {
  color: white;
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
  &.with-background {
    background: linear-gradient(to right, rgba(48, 82, 174, 1), transparent);
    padding: 5px;
  }
}

.chart-content {
  flex: 1;
}

.chart-content.full-height {
  height: 100%;
}
</style>
