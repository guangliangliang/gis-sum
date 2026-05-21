import { defineStore } from 'pinia'
import { markRaw } from 'vue'

export const useMapStore = defineStore('map', {
  state: () => ({
    // 当前地图类型: 'openlayer' | 'mapbox' | 'gaode' | 'cesium'
    currentMapType: 'openlayer',
    // 地图切换 key，用于强制刷新 router-view
    mapKey: 0,
    // 各地图实例缓存 (用 markRaw 避免响应式代理)
    mapInstances: {},
    // 各地图是否就绪
    mapReadyStatus: {},
    // 地图容器DOM元素
    mapContainer: null
  }),

  getters: {
    // 获取当前地图类型
    getCurrentMapType: (state) => state.currentMapType,
    // 获取当前地图实例
    getMapInstance: (state) => state.mapInstances[state.currentMapType] || null,
    // 获取所有地图实例
    getMapInstances: (state) => state.mapInstances,
    // 获取地图容器
    getMapContainer: (state) => state.mapContainer,
    // 判断当前地图是否就绪
    isMapReady: (state) => state.mapReadyStatus[state.currentMapType] && state.mapInstances[state.currentMapType] !== null,
    // 获取地图 key，用于 router-view 强制刷新
    getMapKey: (state) => state.mapKey
  },

  actions: {
    /**
     * 切换地图类型
     * @param {string} type - 地图类型: 'openlayer' | 'mapbox' | 'gaode' | 'cesium'
     */
    switchMap(type) {
      if (this.currentMapType === type) {
        return
      }
      this.currentMapType = type
      this.mapKey++
      console.log(`[MapStore] 切换地图类型为: ${type}, mapKey: ${this.mapKey}`)
    },

    /**
     * 设置地图实例
     * @param {Object} instance - 地图实例对象
     */
    setMapInstance(instance) {
      this.mapInstances[this.currentMapType] = markRaw(instance)
      this.mapReadyStatus[this.currentMapType] = true
      console.log(`[MapStore] ${this.currentMapType} 地图实例已设置`)
    },

    /**
     * 设置地图容器
     * @param {HTMLElement} container - DOM容器元素
     */
    setMapContainer(container) {
      this.mapContainer = container
    },

    /**
     * 清除地图实例
     */
    clearMapInstance() {
      if (this.mapInstances[this.currentMapType] && typeof this.mapInstances[this.currentMapType].destroy === 'function') {
        this.mapInstances[this.currentMapType].destroy()
      }
      this.mapInstances[this.currentMapType] = null
      this.mapReadyStatus[this.currentMapType] = false
      console.log('[MapStore] 地图实例已清除')
    }
  }
})
