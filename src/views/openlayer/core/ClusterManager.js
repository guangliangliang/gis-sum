import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Point } from 'ol/geom'
import { Feature } from 'ol'
import { Circle, Stroke, Fill, Style, Text } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import { Cluster } from 'ol/source'

class ClusterManager {
  constructor(map) {
    this.map = map
    this.clusterLayer = null
    this.clusterSource = null
    this.vectorSource = null
    this.layerId = 'cluster-layer'
    this.styleCache = new Map()
  }

  /**
   * 添加随机聚合点
   * @param {number} count 点数量，默认 100
   * @param {Object} options 选项
   * @returns {ClusterManager} 当前实例
   */
  addClusterPoints(count = 100, options = {}) {
    // 先清除已有的聚合图层
    this.clearCluster()

    // 预生成所有 feature
    const features = []

    // 中心点（北京附近）
    const centerLng = 116.397428
    const centerLat = 39.90923

    // 预转换中心点坐标
    const centerCoord = fromLonLat([centerLng, centerLat])

    // 生成随机点
    for (let i = 0; i < count; i++) {
      // 在中心点附近随机生成坐标
      const lng = centerLng + (Math.random() - 0.5) * 0.4
      const lat = centerLat + (Math.random() - 0.5) * 0.4

      const feature = new Feature({
        geometry: new Point(fromLonLat([lng, lat])),
        id: i,
        name: `Point ${i + 1}`
      })

      features.push(feature)
    }

    // 创建数据源并一次性添加所有 feature
    this.vectorSource = new VectorSource({
      features: features
    })

    // 创建聚合数据源
    this.clusterSource = new Cluster({
      distance: options.distance || 50,
      minDistance: options.minDistance || 10,
      source: this.vectorSource
    })

    // 创建聚合样式（带缓存）
    const createClusterStyle = (feature) => {
      const size = feature.get('features').length
      
      // 使用缓存
      if (this.styleCache.has(size)) {
        return this.styleCache.get(size)
      }

      const color = size > 50 ? '#f56c6c' : size > 20 ? '#e6a23c' : size > 5 ? '#409eff' : '#67c23c'
      const radius = Math.min(8 + size * 0.3, 25)

      const style = new Style({
        image: new Circle({
          radius: radius,
          fill: new Fill({ color: color }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({ color: '#fff' }),
          font: 'bold 12px Arial'
        })
      })

      this.styleCache.set(size, style)
      return style
    }

    // 创建聚合图层
    this.clusterLayer = new VectorLayer({
      source: this.clusterSource,
      style: createClusterStyle,
      zIndex: 100,
      updateWhileAnimating: false,
      updateWhileInteracting: false
    })

    // 添加到地图
    this.map.addLayer(this.clusterLayer)

    return this
  }

  /**
   * 清除聚合图层
   * @returns {ClusterManager} 当前实例
   */
  clearCluster() {
    if (this.clusterLayer) {
      this.map.removeLayer(this.clusterLayer)
      this.clusterLayer = null
    }
    if (this.clusterSource) {
      this.clusterSource.clear()
      this.clusterSource = null
    }
    if (this.vectorSource) {
      this.vectorSource.clear()
      this.vectorSource = null
    }
    return this
  }

  /**
   * 销毁管理器
   */
  destroy() {
    this.clearCluster()
    this.map = null
  }
}

export default ClusterManager
