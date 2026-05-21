<template>
  <div class="logo-title" @click.stop="() => $router.push('/')">
    <a>
      <img :src="logoSrc" />
      <span v-if="!collapse || layout === 'topLeft'" class="title" v-text="baseTitle" />
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
</script>

<style scoped lang="scss">
.logo-title {
  padding: 16px 14px 14px;
  position: relative;

  @include flex-center;

  a {
    @include flex-center;

    cursor: pointer;
    justify-content: flex-start;
  }

  img {
    width: 32px;
  }

  .title {
    font-size: 20px;
    margin: 0 12px 0 8px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    height: 1px;
    background: var(--el-border-color);
  }
}

html.dark {
  .logo-title {
    background-color: var(--el-bg-color-overlay);
    color: white;
  }
}
</style>
