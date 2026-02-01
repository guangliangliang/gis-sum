export * from './app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
export const setupStore = (app) => {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export { store }
