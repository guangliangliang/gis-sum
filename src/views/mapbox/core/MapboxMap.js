import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import ControlManager from './ControlManager'
import CoordinateHelper from './CoordinateHelper'
import MapLayerManager from './MapLayerManager'
import ProjectionManager from './ProjectionManager'
import { MAPBOX_TOKEN } from '@/config/token'
class MapboxMap {
  constructor(container, options = {}) {
    this.container = container
    this.options = {
      accessToken: options.accessToken || MAPBOX_TOKEN, // 默认token，生产环境请替换
      style: options.style || 'mapbox://styles/mapbox/light-v11',
      center: options.center || [116.397428, 39.90923],
      zoom: options.zoom || 12,
      ...options
    }
    this.map = null
    this.controlManager = null
    this.coordinateHelper = null
    this.layerManager = null
    this.projectionManager = null
  }

  /**
   * 初始化地图
   * @returns {Promise<MapboxMap>} 当前实例
   */
  async init() {
    try {
      // 初始化地图实例
      this.map = new mapboxgl.Map({
        container: this.container,
        ...this.options
      })

      // 等待地图加载完成
      await new Promise((resolve, reject) => {
        this.map.on('load', resolve)
        this.map.on('error', reject)
      })

      // 初始化工具类
      this.initManagers()

      console.log('Mapbox map initialized successfully')
      return this
    } catch (error) {
      console.error('Failed to initialize Mapbox map:', error)
      throw error
    }
  }

  /**
   * 初始化工具类
   * @private
   */
  initManagers() {
    this.controlManager = new ControlManager(this.map)
    this.coordinateHelper = new CoordinateHelper(this.map)
    this.layerManager = new MapLayerManager(this.map)
    this.projectionManager = new ProjectionManager(this.map)
  }

  /**
   * 获取地图实例
   * @returns {Object} Mapbox地图实例
   */
  getMap() {
    return this.map
  }

  /**
   * 获取控件管理器
   * @returns {ControlManager} 控件管理器实例
   */
  getControlManager() {
    return this.controlManager
  }

  /**
   * 获取坐标辅助类
   * @returns {CoordinateHelper} 坐标辅助类实例
   */
  getCoordinateHelper() {
    return this.coordinateHelper
  }

  /**
   * 获取图层管理器
   * @returns {MapLayerManager} 图层管理器实例
   */
  getLayerManager() {
    return this.layerManager
  }

  /**
   * 获取投影管理器
   * @returns {ProjectionManager} 投影管理器实例
   */
  getProjectionManager() {
    return this.projectionManager
  }

  /**
   * 设置地图中心
   * @param {Array<number>} center 中心点经纬度 [lng, lat]
   * @param {number} zoom 缩放级别
   * @returns {MapboxMap} 当前实例
   */
  setCenter(center, zoom = null) {
    if (this.map) {
      this.map.setCenter(center)
      if (zoom !== null) {
        this.map.setZoom(zoom)
      }
    }
    return this
  }

  /**
   * 缩放地图
   * @param {number} zoom 缩放级别
   * @returns {MapboxMap} 当前实例
   */
  setZoom(zoom) {
    if (this.map) {
      this.map.setZoom(zoom)
    }
    return this
  }

  /**
   * 销毁地图
   */
  destroy() {
    // 销毁工具类
    if (this.controlManager) {
      this.controlManager.destroy()
      this.controlManager = null
    }
    if (this.coordinateHelper) {
      this.coordinateHelper.destroy()
      this.coordinateHelper = null
    }
    if (this.layerManager) {
      this.layerManager.removeAllLayers()
      this.layerManager.destroy()
      this.layerManager = null
    }
    if (this.projectionManager) {
      this.projectionManager.destroy()
      this.projectionManager = null
    }

    // 销毁地图实例
    if (this.map) {
      this.map.remove()
      this.map = null
    }

    console.log('Mapbox map destroyed')
  }
}

export default MapboxMap
