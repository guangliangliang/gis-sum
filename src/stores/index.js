export * from './app'
export * from './map'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
export const setupStore = (app) => {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export { store }
