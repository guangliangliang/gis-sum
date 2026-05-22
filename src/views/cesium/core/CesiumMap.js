import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// 禁用默认 Ion 访问
Cesium.Ion.defaultAccessToken = undefined

import ControlManager from './ControlManager'
import CoordinateHelper from './CoordinateHelper'
import MapLayerManager from './MapLayerManager'
import ProjectionManager from './ProjectionManager'
import ClusterManager from './ClusterManager'
import DrawManager from './DrawManager'

class CesiumMap {
  constructor(container, options = {}) {
    this.container = container
    this.options = {
      center: options.center || [116.397428, 39.90923, 15000000],
      zoom: options.zoom || 12,
      ...options
    }
    this.viewer = null
    this.controlManager = null
    this.coordinateHelper = null
    this.layerManager = null
    this.projectionManager = null
    this.clusterManager = null
    this.drawManager = null
  }

  async init() {
    try {
      // 创建最简单的 Viewer 配置 - 禁用 Ion 底图
      this.viewer = new Cesium.Viewer(this.container, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: true,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        vrButton: false,
        scene3DOnly: true,
        terrainProvider: undefined
      })

      // 清除默认底图，添加 OpenStreetMap 底图
      this.viewer.imageryLayers.removeAll()
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.OpenStreetMapImageryProvider({
          url: 'https://a.tile.openstreetmap.org/'
        })
      )

      // 隐藏 logo
      this.viewer.cesiumWidget.creditContainer.style.display = 'none'

      // 设置初始位置 - 北京附近
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(116.397428, 39.90923, 1000000),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-45),
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

  initManagers() {
    this.controlManager = new ControlManager(this.viewer)
    this.coordinateHelper = new CoordinateHelper(this.viewer)
    this.layerManager = new MapLayerManager(this.viewer)
    this.projectionManager = new ProjectionManager(this.viewer)
    this.clusterManager = new ClusterManager(this.viewer)
    this.drawManager = new DrawManager(this.viewer)
  }

  getMap() {
    return this.viewer
  }

  getControlManager() {
    return this.controlManager
  }

  getCoordinateHelper() {
    return this.coordinateHelper
  }

  getLayerManager() {
    return this.layerManager
  }

  getProjectionManager() {
    return this.projectionManager
  }

  getClusterManager() {
    return this.clusterManager
  }

  getDrawManager() {
    return this.drawManager
  }

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

  destroy() {
    if (this.clusterManager) {
      this.clusterManager.destroy()
      this.clusterManager = null
    }
    if (this.drawManager) {
      this.drawManager.destroy()
      this.drawManager = null
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
    if (this.coordinateHelper) {
      this.coordinateHelper.destroy()
      this.coordinateHelper = null
    }
    if (this.controlManager) {
      this.controlManager.destroy()
      this.controlManager = null
    }

    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = null
    }

    console.log('Cesium map destroyed')
  }
}

export default CesiumMap
