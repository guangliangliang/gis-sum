import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { baseTitle, prevUrl } from '@/config'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(prevUrl), // 这里要和 vite.config.js 的 base 保持一致
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    NProgress.start()
  }
  window.document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
