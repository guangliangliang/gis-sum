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
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: coordinates.map((coord, index) => ({
          type: 'Feature',
          properties: {
            id: index,
            ...options.properties
          },
          geometry: {
            type: 'Point',
            coordinates: coord
          }
        }))
      }
    }

    // 添加数据源
    if (!this.map.getSource(sourceId)) {
      this.map.addSource(sourceId, source)
      this.sources.set(sourceId, source)
    }

    // 添加图层
    const layer = {
      id,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': options.radius || 5,
        'circle-color': options.color || '#409eff',
        'circle-opacity': options.opacity || 0.8,
        'circle-stroke-width': options.strokeWidth || 1,
        'circle-stroke-color': options.strokeColor || '#ffffff'
      },
      ...options.layerOptions
    }

    if (!this.map.getLayer(id)) {
      this.map.addLayer(layer)
      this.layers.set(id, layer)
    }

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
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: options.properties || {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        }]
      }
    }

    // 添加数据源
    if (!this.map.getSource(sourceId)) {
      this.map.addSource(sourceId, source)
      this.sources.set(sourceId, source)
    }

    // 添加图层
    const layer = {
      id,
      type: 'line',
      source: sourceId,
      paint: {
        'line-width': options.width || 2,
        'line-color': options.color || '#409eff',
        'line-opacity': options.opacity || 0.8,
        'line-dasharray': options.dasharray || []
      },
      ...options.layerOptions
    }

    if (!this.map.getLayer(id)) {
      this.map.addLayer(layer)
      this.layers.set(id, layer)
    }

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
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: options.properties || {},
          geometry: {
            type: 'Polygon',
            coordinates
          }
        }]
      }
    }

    // 添加数据源
    if (!this.map.getSource(sourceId)) {
      this.map.addSource(sourceId, source)
      this.sources.set(sourceId, source)
    }

    // 添加图层
    const layer = {
      id,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': options.color || '#409eff',
        'fill-opacity': options.opacity || 0.5,
        'fill-outline-color': options.outlineColor || '#409eff'
      },
      ...options.layerOptions
    }

    if (!this.map.getLayer(id)) {
      this.map.addLayer(layer)
      this.layers.set(id, layer)
    }

    return this
  }

  /**
   * 更新图层数据
   * @param {string} id 图层ID
   * @param {Object} data 新数据
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerData(id, data) {
    const sourceId = `${id}-source`
    const source = this.map.getSource(sourceId)
    if (source) {
      source.setData(data)
    }
    return this
  }

  /**
   * 更新图层样式
   * @param {string} id 图层ID
   * @param {Object} paint 新的paint属性
   * @returns {MapLayerManager} 当前实例
   */
  updateLayerStyle(id, paint) {
    if (this.map.getLayer(id)) {
      Object.entries(paint).forEach(([key, value]) => {
        this.map.setPaintProperty(id, key, value)
      })
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
    if (this.map.getLayer(id)) {
      this.map.removeLayer(id)
      this.layers.delete(id)
    }
    
    // 移除数据源
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId)
      this.sources.delete(sourceId)
    }
    
    return this
  }

  /**
   * 移除所有图层
   * @returns {MapLayerManager} 当前实例
   */
  removeAllLayers() {
    this.layers.forEach((_, id) => {
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
    return this.map.getLayer(id) || null
  }

  /**
   * 显示图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  showLayer(id) {
    if (this.map.getLayer(id)) {
      this.map.setLayoutProperty(id, 'visibility', 'visible')
    }
    return this
  }

  /**
   * 隐藏图层
   * @param {string} id 图层ID
   * @returns {MapLayerManager} 当前实例
   */
  hideLayer(id) {
    if (this.map.getLayer(id)) {
      this.map.setLayoutProperty(id, 'visibility', 'none')
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