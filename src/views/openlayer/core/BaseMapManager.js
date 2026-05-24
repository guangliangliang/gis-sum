import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import { imageConfigs, ATTRIBUTIONS } from './config'

class BaseMapManager {
  constructor(map) {
    this.map = map
    this.currentBaseMap = imageConfigs[0]
    this.labelVisible = true
    this.listeners = []
  }

  /**
   * 添加主题变化监听器
   * @param {Function} listener - 监听器函数
   */
  addThemeChangeListener(listener) {
    this.listeners.push(listener)
  }

  /**
   * 移除主题变化监听器
   * @param {Function} listener - 监听器函数
   */
  removeThemeChangeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  /**
   * 通知主题变化
   * @param {Object} theme - 主题配置
   */
  notifyThemeChange(theme) {
    this.listeners.forEach(listener => listener(theme))
  }

  /**
   * 切换底图，并根据需要添加/移除标注图层
   * @param {string} baseUrl - 底图 URL
   * @param {string} [labelUrl] - 可选，标注图层 URL
   */
  switchBaseLayer(baseUrl, labelUrl) {
    const layers = this.map.getLayers().getArray()

    const baseLayerIndex = layers.findIndex((layer) => layer.get('id') === 'baseLayer')
    if (baseLayerIndex !== -1) {
      this.map.removeLayer(layers[baseLayerIndex])
    }

    const baseLayer = new TileLayer({
      properties: { id: 'baseLayer' },
      preload: Number.POSITIVE_INFINITY,
      source: new XYZ({
        attributions: baseUrl.includes('tianditu') ? ATTRIBUTIONS : '',
        crossOrigin: 'anonymous',
        url: baseUrl
      })
    })
    this.map.getLayers().insertAt(0, baseLayer)

    const labelLayerIndex = layers.findIndex((layer) => layer.get('id') === 'labelLayer')
    if (labelLayerIndex !== -1) {
      this.map.removeLayer(layers[labelLayerIndex])
    }

    if (this.labelVisible && labelUrl) {
      const labelLayer = new TileLayer({
        properties: { id: 'labelLayer' },
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: labelUrl
        })
      })
      this.map.getLayers().insertAt(1, labelLayer)
    }

    this.currentBaseMap = this.findBaseMapByUrl(baseUrl)
    // 通知主题变化
    if (this.currentBaseMap) {
      this.notifyThemeChange({
        themeColor: this.currentBaseMap.themeColor,
        themeTransparent: this.currentBaseMap.themeTransparent,
        themeLight: this.currentBaseMap.themeLight
      })
    }
  }

  /**
   * 设置地名注记显示/隐藏
   * @param {boolean} visible
   */
  setLabelVisible(visible) {
    this.labelVisible = visible
    const layers = this.map.getLayers().getArray()
    const labelLayerIndex = layers.findIndex((layer) => layer.get('id') === 'labelLayer')

    if (visible && this.currentBaseMap.placeName) {
      if (labelLayerIndex === -1) {
        const labelLayer = new TileLayer({
          properties: { id: 'labelLayer' },
          source: new XYZ({
            crossOrigin: 'anonymous',
            url: this.currentBaseMap.placeName
          })
        })
        this.map.getLayers().insertAt(1, labelLayer)
      }
    } else {
      if (labelLayerIndex !== -1) {
        this.map.removeLayer(layers[labelLayerIndex])
      }
    }
  }

  /**
   * 获取当前底图配置
   */
  getCurrentBaseMap() {
    return this.currentBaseMap
  }

  /**
   * 根据URL查找底图配置
   * @param {string} url
   */
  findBaseMapByUrl(url) {
    return imageConfigs.find((item) => {
      const baseUrl = item.value.split('?')[0]
      return url.includes(baseUrl)
    })
  }

  /**
   * 初始化默认底图
   */
  initDefaultBaseMap() {
    const defaultBaseMap = imageConfigs[0]
    this.switchBaseLayer(defaultBaseMap.value, defaultBaseMap.placeName)
  }

  /**
   * 获取所有底图配置
   */
  getImageConfigs() {
    return imageConfigs
  }

  /**
   * 销毁管理器
   */
  destroy() {
    this.map = null
  }
}

export default BaseMapManager
