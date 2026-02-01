import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Point, LineString, Polygon } from 'ol/geom'
import { Feature } from 'ol'
import { Circle, Stroke, Fill, Style } from 'ol/style'
import { fromLonLat } from 'ol/proj'

class MapLayerManager {
  constructor(map) {
    this.map = map
    this.layers = new Map()
    this.sources = new Map()
  }

  /**
   * 添加点图层
   * @param {string} id 图层ID
   * @param {Array<Array<number>>} coordinates 点坐标数组 [[lng, lat], ...]
   * @param {Object} options 图层选项
   * @returns {MapLayerManager} 当前实例
   */
  addPointLayer(id, coordinates, options = {}) {
    // 创建数据源
    const sourceId = `${id}-source`
    const source = new VectorSource()

    // 添加点要素
    coordinates.forEach((coord, index) => {
      // 将经纬度坐标转换为地图坐标
      const mapCoord = fromLonLat(coord)
      const feature = new Feature({
        geometry: new Point(mapCoord),
        id: index,
        ...options.properties
      })
      source.addFeature(feature)
    })

    // 创建样式
    const style = new Style({
      image: new Circle({
        radius: options.radius || 5,
        fill: new Fill({
          color: options.color || '#409eff'
        }),
        stroke: new Stroke({
          color: options.strokeColor || '#ffffff',
          width: options.strokeWidth || 1
        })
      })
    })

    // 创建图层
    const layer = new VectorLayer({
      source: source,
      style: style,
      opacity: options.opacity || 1,
      ...options.layerOptions
    })

    // 添加到地图
    this.map.addLayer(layer)
    this.layers.set(id, layer)
    this.sources.set(sourceId, source)

    return this
  }

  /**
   * 添加线图层
   * @param {string} id 图层ID
   * @param {Array<Array<number>>} coordinates 线坐标数组 [[lng1, lat1], [lng2, lat2], ...]
   * @param {Object} options 图层选项
   * @returns {MapLayerManager} 当前实例
   */
  addLineLayer(id, coordinates, options = {}) {
    // 创建数据源
    const sourceId = `${id}-source`
    const source = new VectorSource()

    // 将经纬度坐标转换为地图坐标
    const mapCoordinates = coordinates.map((coord) => fromLonLat(coord))

    // 添加线要素
    const feature = new Feature({
      geometry: new LineString(mapCoordinates),
      ...options.properties
    })
    source.addFeature(feature)

    // 创建样式
    const style = new Style({
      stroke: new Stroke({
        color: options.color || '#409eff',
        width: options.width || 2,
        lineDash: options.dasharray || []
      })
    })

    // 创建图层
    const layer = new VectorLayer({
      source: source,
      style: style,
      opacity: options.opacity || 1,
      ...options.layerOptions
    })

    // 添加到地图
    this.map.addLayer(layer)
    this.layers.set(id, layer)
    this.sources.set(sourceId, source)

    return this
  }

  /**
   * 添加面图层
   * @param {string} id 图层ID
   * @param {Array<Array<Array<number>>>} coordinates 面坐标数组 [[[lng1, lat1], [lng2, lat2], ...]]
   * @param {Object} options 图层选项
   * @returns {MapLayerManager} 当前实例
   */
  addPolygonLayer(id, coordinates, options = {}) {
    // 创建数据源
    const sourceId = `${id}-source`
    const source = new VectorSource()

    // 将经纬度坐标转换为地图坐标
    const mapCoordinates = coordinates.map((ring) => ring.map((coord) => fromLonLat(coord)))

    // 添加面要素
    const feature = new Feature({
      geometry: new Polygon(mapCoordinates),
      ...options.properties
    })
    source.addFeature(feature)

    // 创建样式
    const style = new Style({
      fill: new Fill({
        color: options.color || '#409eff'
      }),
      stroke: new Stroke({
        color: options.outlineColor || '#409eff',
        width: options.outlineWidth || 1
      })
    })

    // 创建图层
    const layer = new VectorLayer({
      source: source,
      style: style,
      opacity: options.opacity || 1,
      ...options.layerOptions
    })

    // 添加到地图
    this.map.addLayer(layer)
    this.layers.set(id, layer)
    this.sources.set(sourceId, source)

    return this
  }

  /**
   * 更新图层数据
   * @param {string} id 图层ID
   * @param {Array<Array<number>>} coordinates 新坐标数组
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerData(id, coordinates) {
    const sourceId = `${id}-source`
    const source = this.sources.get(sourceId)
    if (source) {
      // 清空现有数据
      source.clear()

      // 添加新数据
      const layer = this.layers.get(id)
      if (layer) {
        const geometryType = layer.getSource().getFeatures()[0]?.getGeometry()?.getType()

        if (geometryType === 'Point') {
          coordinates.forEach((coord, index) => {
            const feature = new Feature({
              geometry: new Point(coord),
              id: index
            })
            source.addFeature(feature)
          })
        } else if (geometryType === 'LineString') {
          const feature = new Feature({
            geometry: new LineString(coordinates)
          })
          source.addFeature(feature)
        } else if (geometryType === 'Polygon') {
          const feature = new Feature({
            geometry: new Polygon(coordinates)
          })
          source.addFeature(feature)
        }
      }
    }
    return this
  }

  /**
   * 更新图层样式
   * @param {string} id 图层ID
   * @param {Object} styleOptions 新的样式选项
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerStyle(id, styleOptions = {}) {
    const layer = this.layers.get(id)
    if (layer) {
      const geometryType = layer.getSource().getFeatures()[0]?.getGeometry()?.getType()
      let newStyle

      if (geometryType === 'Point') {
        newStyle = new Style({
          image: new Circle({
            radius: styleOptions.radius || 5,
            fill: new Fill({
              color: styleOptions.color || '#409eff'
            }),
            stroke: new Stroke({
              color: styleOptions.strokeColor || '#ffffff',
              width: styleOptions.strokeWidth || 1
            })
          })
        })
      } else if (geometryType === 'LineString') {
        newStyle = new Style({
          stroke: new Stroke({
            color: styleOptions.color || '#409eff',
            width: styleOptions.width || 2,
            lineDash: styleOptions.dasharray || []
          })
        })
      } else if (geometryType === 'Polygon') {
        newStyle = new Style({
          fill: new Fill({
            color: styleOptions.color || '#409eff'
          }),
          stroke: new Stroke({
            color: styleOptions.outlineColor || '#409eff',
            width: styleOptions.outlineWidth || 1
          })
        })
      }

      if (newStyle) {
        layer.setStyle(newStyle)
      }

      if (styleOptions.opacity !== undefined) {
        layer.setOpacity(styleOptions.opacity)
      }
    }
    return this
  }

  /**
   * 移除图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  removeLayer(id) {
    const sourceId = `${id}-source`

    // 移除图层
    const layer = this.layers.get(id)
    if (layer) {
      this.map.removeLayer(layer)
      this.layers.delete(id)
    }

    // 清理数据源
    const source = this.sources.get(sourceId)
    if (source) {
      source.clear()
      this.sources.delete(sourceId)
    }

    return this
  }

  /**
   * 移除所有图层
   * @returns {MapLayerManager} 当前实例
   */
  removeAllLayers() {
    this.layers.forEach((layer, id) => {
      this.removeLayer(id)
    })
    return this
  }

  /**
   * 获取图层
   * @param {string} id 图层ID
   * @returns {Object|null} 图层对象
   */
  getLayer(id) {
    return this.layers.get(id) || null
  }

  /**
   * 显示图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  showLayer(id) {
    const layer = this.layers.get(id)
    if (layer) {
      layer.setVisible(true)
    }
    return this
  }

  /**
   * 隐藏图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  hideLayer(id) {
    const layer = this.layers.get(id)
    if (layer) {
      layer.setVisible(false)
    }
    return this
  }

  /**
   * 销毁图层管理器
   */
  destroy() {
    this.removeAllLayers()
    this.layers.clear()
    this.sources.clear()
    this.map = null
  }
}

export default MapLayerManager
