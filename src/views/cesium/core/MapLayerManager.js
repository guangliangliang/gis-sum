import * as Cesium from 'cesium'

class MapLayerManager {
  constructor(viewer) {
    this.viewer = viewer
    this.layers = new Map()
  }

  /**
   * 添加点
   * @param {string} id 点ID
   * @param {Array<number>} position 位置 [lng, lat, height]
   * @param {Object} options 点选项
   * @returns {MapLayerManager} 当前实例
   */
  addPoint(id, position, options = {}) {
    const [lng, lat, height = 0] = position

    const entity = this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      point: {
        pixelSize: options.size || 10,
        color: Cesium.Color.fromCssColorString(options.color || '#409eff'),
        outlineColor: Cesium.Color.fromCssColorString(options.outlineColor || '#ffffff'),
        outlineWidth: options.outlineWidth || 2,
        ...options
      }
    })

    this.layers.set(id, entity)
    return this
  }

  /**
   * 添加多个点
   * @param {string} id 点组ID
   * @param {Array<Array<number>>} positions 位置数组 [[lng1, lat1, height1], [lng2, lat2, height2], ...]
   * @param {Object} options 点选项
   * @returns {MapLayerManager} 当前实例
   */
  addPoints(id, positions, options = {}) {
    const entities = []

    positions.forEach((pos, index) => {
      const [lng, lat, height = 0] = pos
      const entity = this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        point: {
          pixelSize: options.size || 10,
          color: Cesium.Color.fromCssColorString(options.color || '#409eff'),
          outlineColor: Cesium.Color.fromCssColorString(options.outlineColor || '#ffffff'),
          outlineWidth: options.outlineWidth || 2,
          ...options
        }
      })
      entities.push(entity)
    })

    this.layers.set(id, entities)
    return this
  }

  /**
   * 添加线
   * @param {string} id 线ID
   * @param {Array<Array<number>>} positions 位置数组 [[lng1, lat1, height1], [lng2, lat2, height2], ...]
   * @param {Object} options 线选项
   * @returns {MapLayerManager} 当前实例
   */
  addLine(id, positions, options = {}) {
    const positionsCartesian = positions.map((pos) => {
      const [lng, lat, height = 0] = pos
      return Cesium.Cartesian3.fromDegrees(lng, lat, height)
    })

    const entity = this.viewer.entities.add({
      polyline: {
        positions: positionsCartesian,
        width: options.width || 3,
        material: Cesium.Material.fromType('Color', {
          color: Cesium.Color.fromCssColorString(options.color || '#409eff')
        }),
        ...options
      }
    })

    this.layers.set(id, entity)
    return this
  }

  /**
   * 添加面
   * @param {string} id 面ID
   * @param {Array<Array<number>>} positions 位置数组 [[lng1, lat1, height1], [lng2, lat2, height2], ...]
   * @param {Object} options 面选项
   * @returns {MapLayerManager} 当前实例
   */
  addPolygon(id, positions, options = {}) {
    const positionsCartesian = positions.map((pos) => {
      const [lng, lat, height = 0] = pos
      return Cesium.Cartesian3.fromDegrees(lng, lat, height)
    })

    const entity = this.viewer.entities.add({
      polygon: {
        hierarchy: positionsCartesian,
        material: new Cesium.ColorMaterialProperty(
          Cesium.Color.fromCssColorString(options.color || '#409eff').withAlpha(
            options.opacity || 0.5
          )
        ),
        outline: options.outline !== false,
        outlineColor: Cesium.Color.fromCssColorString(options.outlineColor || '#409eff'),
        outlineWidth: options.outlineWidth || 2,
        ...options
      }
    })

    this.layers.set(id, entity)
    return this
  }

  /**
   * 更新图层数据
   * @param {string} id 图层ID
   * @param {Array} data 新数据
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerData(id, data) {
    const layer = this.layers.get(id)
    if (layer) {
      if (Array.isArray(layer)) {
        // 处理点组
        layer.forEach((entity, index) => {
          if (data[index]) {
            const [lng, lat, height = 0] = data[index]
            entity.position = Cesium.Cartesian3.fromDegrees(lng, lat, height)
          }
        })
      } else if (layer.polyline) {
        // 处理线
        const positionsCartesian = data.map((pos) => {
          const [lng, lat, height = 0] = pos
          return Cesium.Cartesian3.fromDegrees(lng, lat, height)
        })
        layer.polyline.positions = positionsCartesian
      } else if (layer.polygon) {
        // 处理面
        const positionsCartesian = data.map((pos) => {
          const [lng, lat, height = 0] = pos
          return Cesium.Cartesian3.fromDegrees(lng, lat, height)
        })
        layer.polygon.hierarchy = positionsCartesian
      } else if (layer.position) {
        // 处理单个点
        const [lng, lat, height = 0] = data
        layer.position = Cesium.Cartesian3.fromDegrees(lng, lat, height)
      }
    }
    return this
  }

  /**
   * 更新图层样式
   * @param {string} id 图层ID
   * @param {Object} style 新样式
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerStyle(id, style) {
    const layer = this.layers.get(id)
    if (layer) {
      if (Array.isArray(layer)) {
        // 处理点组
        layer.forEach((entity) => {
          if (entity.point) {
            this.updatePointStyle(entity, style)
          }
        })
      } else if (layer.point) {
        // 处理单个点
        this.updatePointStyle(layer, style)
      } else if (layer.polyline) {
        // 处理线
        if (style.width) layer.polyline.width = style.width
        if (style.color) {
          layer.polyline.material = Cesium.Material.fromType('Color', {
            color: Cesium.Color.fromCssColorString(style.color)
          })
        }
      } else if (layer.polygon) {
        // 处理面
        if (style.color) {
          layer.polygon.material = new Cesium.ColorMaterialProperty(
            Cesium.Color.fromCssColorString(style.color).withAlpha(style.opacity || 0.5)
          )
        }
        if (style.opacity !== undefined) {
          layer.polygon.material.color = layer.polygon.material.color.withAlpha(style.opacity)
        }
        if (style.outlineColor) {
          layer.polygon.outlineColor = Cesium.Color.fromCssColorString(style.outlineColor)
        }
        if (style.outlineWidth) {
          layer.polygon.outlineWidth = style.outlineWidth
        }
      }
    }
    return this
  }

  /**
   * 更新点样式
   * @param {Object} entity 实体
   * @param {Object} style 样式
   * @private
   */
  updatePointStyle(entity, style) {
    if (style.size) entity.point.pixelSize = style.size
    if (style.color) entity.point.color = Cesium.Color.fromCssColorString(style.color)
    if (style.outlineColor)
      entity.point.outlineColor = Cesium.Color.fromCssColorString(style.outlineColor)
    if (style.outlineWidth) entity.point.outlineWidth = style.outlineWidth
  }

  /**
   * 移除图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  removeLayer(id) {
    const layer = this.layers.get(id)
    if (layer) {
      if (Array.isArray(layer)) {
        // 处理点组
        layer.forEach((entity) => {
          this.viewer.entities.remove(entity)
        })
      } else {
        // 处理单个实体
        this.viewer.entities.remove(layer)
      }
      this.layers.delete(id)
    }
    return this
  }

  /**
   * 移除所有图层
   * @returns {MapLayerManager} 当前实例
   */
  removeAllLayers() {
    this.layers.forEach((layer) => {
      if (Array.isArray(layer)) {
        layer.forEach((entity) => {
          this.viewer.entities.remove(entity)
        })
      } else {
        this.viewer.entities.remove(layer)
      }
    })
    this.layers.clear()
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
      if (Array.isArray(layer)) {
        layer.forEach((entity) => {
          entity.show = true
        })
      } else {
        layer.show = true
      }
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
      if (Array.isArray(layer)) {
        layer.forEach((entity) => {
          entity.show = false
        })
      } else {
        layer.show = false
      }
    }
    return this
  }

  /**
   * 销毁图层管理器
   */
  destroy() {
    this.removeAllLayers()
    this.layers.clear()
    this.viewer = null
  }
}

export default MapLayerManager
