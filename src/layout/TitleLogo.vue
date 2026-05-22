<template>
  <div class="logo-title" @click.stop="() => $router.push('/')">
    <a class="logo-link">
      <img :src="logoSrc" class="logo-img" />
      <span v-if="!collapse && !mobile" class="title" v-text="baseTitle" />
    </a>
  </div>
</template>

<script setup>
import { baseTitle } from '@/config'
import logoSrc from '@/assets/images/login/logo.png'
import { computed } from 'vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const layout = computed(() => appStore.getLayout)
const collapse = computed(() => appStore.getCollapse)
const mobile = computed(() => appStore.getMobile)
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.logo-title {
  padding: 14px 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: var(--logo-height);

  .logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    gap: 8px;
    white-space: nowrap;
  }

  .logo-img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    background: var(--el-border-color);
  }
}

html.dark {
  .logo-title {
    background-color: var(--el-bg-color-overlay);
  }
}

@include mobile {
  .logo-title {
    padding: 12px 16px;
    height: 56px;

    .logo-img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
