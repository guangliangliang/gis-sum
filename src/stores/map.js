import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    // 当前地图类型: 'openlayer' | 'mapbox' | 'gaode' | 'cesium'
    currentMapType: 'openlayer',
    // 当前地图实例（OpenlayerMap/MapboxMap/GaodeMap/CesiumMap 等类实例）
    mapInstance: null,
    // 地图是否初始化完成
    isReady: false,
    // 地图容器DOM元素
    mapContainer: null
  }),

  getters: {
    // 获取当前地图类型
    getCurrentMapType: (state) => state.currentMapType,
    // 获取地图实例
    getMapInstance: (state) => state.mapInstance,
    // 获取地图容器
    getMapContainer: (state) => state.mapContainer,
    // 判断地图是否就绪
    isMapReady: (state) => state.isReady && state.mapInstance !== null
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
      // 缓存地图实例，不再切换时销毁，保持复用
      this.mapInstance = null
      this.isReady = false
      this.currentMapType = type
      console.log(`[MapStore] 切换地图类型为: ${type}`)
    },

    /**
     * 设置地图实例
     * @param {Object} instance - 地图实例对象
     */
    setMapInstance(instance) {
      this.mapInstance = instance
      this.isReady = true
      console.log('[MapStore] 地图实例已设置')
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
      if (this.mapInstance && typeof this.mapInstance.destroy === 'function') {
        this.mapInstance.destroy()
      }
      this.mapInstance = null
      this.isReady = false
      console.log('[MapStore] 地图实例已清除')
    }
  }
})
