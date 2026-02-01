window.CESIUM_BASE_URL = '/cesium/'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

import ControlManager from './ControlManager'
import CoordinateHelper from './CoordinateHelper'
import MapLayerManager from './MapLayerManager'
import ProjectionManager from './ProjectionManager'

class CesiumMap {
  constructor(container, options = {}) {
    this.container = container
    this.options = {
      center: options.center || [116.397428, 39.90923, 1000],
      zoom: options.zoom || 12,
      ...options
    }
    this.viewer = null
    this.controlManager = null
    this.coordinateHelper = null
    this.layerManager = null
    this.projectionManager = null
  }

  /**
   * 初始化地图
   * @returns {Promise<CesiumMap>} 当前实例
   */
  async init() {
    try {
      // 准备Viewer选项
      const viewerOptions = {
        animation: false,
        baseLayerPicker: true,
        fullscreenButton: true,
        geocoder: false,
        homeButton: true,
        infoBox: true,
        sceneModePicker: true,
        selectionIndicator: true,
        timeline: false,
        navigationHelpButton: false,
        ...this.options
      }

      // 初始化Cesium Viewer
      this.viewer = new Cesium.Viewer(this.container, viewerOptions)

      // 设置初始视图
      const [lng, lat, height] = this.options.center
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0
        }
      })

      // 初始化工具类
      this.initManagers()

      console.log('Cesium map initialized successfully')
      return this
    } catch (error) {
      console.error('Failed to initialize Cesium map:', error)
      throw error
    }
  }

  /**
   * 初始化工具类
   * @private
   */
  initManagers() {
    this.controlManager = new ControlManager(this.viewer)
    this.coordinateHelper = new CoordinateHelper(this.viewer)
    this.layerManager = new MapLayerManager(this.viewer)
    this.projectionManager = new ProjectionManager(this.viewer)
  }

  /**
   * 获取地图实例
   * @returns {Object} Cesium Viewer实例
   */
  getMap() {
    return this.viewer
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
   * @param {Array<number>} center 中心点经纬度 [lng, lat, height]
   * @param {number} duration 动画持续时间（秒）
   * @returns {CesiumMap} 当前实例
   */
  setCenter(center, duration = 1) {
    if (this.viewer) {
      const [lng, lat, height = 1000] = center
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        duration: duration
      })
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
    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = null
    }

    console.log('Cesium map destroyed')
  }
}

export default CesiumMap
