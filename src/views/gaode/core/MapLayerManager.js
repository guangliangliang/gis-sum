class MapLayerManager {
  constructor(map) {
    this.map = map
    this.layers = new Map()
  }

  /**
   * 添加点标记
   * @param {string} id 标记ID
   * @param {Array<number>} position 位置 [lng, lat]
   * @param {Object} options 标记选项
   * @returns {MapLayerManager} 当前实例
   */
  addMarker(id, position, options = {}) {
    const marker = new AMap.Marker({
      position: position,
      title: options.title,
      icon: options.icon,
      offset: options.offset || new AMap.Pixel(-10, -30),
      ...options
    })

    marker.setMap(this.map)
    this.layers.set(id, marker)
    return this
  }

  /**
   * 添加多个点标记
   * @param {string} id 标记组ID
   * @param {Array<Array<number>>} positions 位置数组 [[lng1, lat1], [lng2, lat2], ...]
   * @param {Object} options 标记选项
   * @returns {MapLayerManager} 当前实例
   */
  addMarkers(id, positions, options = {}) {
    const markers = []
    positions.forEach((pos, index) => {
      const marker = new AMap.Marker({
        position: pos,
        title: options.title || `Marker ${index}`,
        icon: options.icon,
        offset: options.offset || new AMap.Pixel(-10, -30),
        ...options
      })
      marker.setMap(this.map)
      markers.push(marker)
    })

    this.layers.set(id, markers)
    return this
  }

  /**
   * 添加线
   * @param {string} id 线ID
   * @param {Array<Array<number>>} path 路径 [[lng1, lat1], [lng2, lat2], ...]
   * @param {Object} options 线选项
   * @returns {MapLayerManager} 当前实例
   */
  addLine(id, path, options = {}) {
    const line = new AMap.Polyline({
      path: path,
      strokeColor: options.color || '#409eff',
      strokeWeight: options.width || 2,
      strokeOpacity: options.opacity || 0.8,
      strokeStyle: options.style || 'solid',
      strokeDasharray: options.dasharray || [1, 0],
      ...options
    })

    line.setMap(this.map)
    this.layers.set(id, line)
    return this
  }

  /**
   * 添加面
   * @param {string} id 面ID
   * @param {Array<Array<Array<number>>>} path 路径 [[[lng1, lat1], [lng2, lat2], ...]]
   * @param {Object} options 面选项
   * @returns {MapLayerManager} 当前实例
   */
  addPolygon(id, path, options = {}) {
    const polygon = new AMap.Polygon({
      path: path,
      fillColor: options.color || '#409eff',
      fillOpacity: options.opacity || 0.5,
      strokeColor: options.outlineColor || '#409eff',
      strokeWeight: options.outlineWidth || 1,
      ...options
    })

    polygon.setMap(this.map)
    this.layers.set(id, polygon)
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
      if (layer instanceof AMap.Marker) {
        layer.setPosition(data)
      } else if (layer instanceof AMap.Polyline) {
        layer.setPath(data)
      } else if (layer instanceof AMap.Polygon) {
        layer.setPath(data)
      } else if (Array.isArray(layer)) {
        // 处理标记组
        layer.forEach((marker, index) => {
          if (data[index]) {
            marker.setPosition(data[index])
          }
        })
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
      if (layer instanceof AMap.Marker) {
        if (style.icon) layer.setIcon(style.icon)
        if (style.title) layer.setTitle(style.title)
      } else if (layer instanceof AMap.Polyline) {
        if (style.color) layer.setStrokeColor(style.color)
        if (style.width) layer.setStrokeWeight(style.width)
        if (style.opacity) layer.setStrokeOpacity(style.opacity)
        if (style.style) layer.setStrokeStyle(style.style)
        if (style.dasharray) layer.setStrokeDasharray(style.dasharray)
      } else if (layer instanceof AMap.Polygon) {
        if (style.color) layer.setFillColor(style.color)
        if (style.opacity) layer.setFillOpacity(style.opacity)
        if (style.outlineColor) layer.setStrokeColor(style.outlineColor)
        if (style.outlineWidth) layer.setStrokeWeight(style.outlineWidth)
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
    const layer = this.layers.get(id)
    if (layer) {
      if (Array.isArray(layer)) {
        // 处理标记组
        layer.forEach((item) => {
          item.setMap(null)
        })
      } else {
        layer.setMap(null)
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
        layer.forEach((item) => {
          item.setMap(null)
        })
      } else {
        layer.setMap(null)
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
        layer.forEach((item) => {
          item.setMap(this.map)
        })
      } else {
        layer.setMap(this.map)
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
        layer.forEach((item) => {
          item.setMap(null)
        })
      } else {
        layer.setMap(null)
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
    this.map = null
  }
}

export default MapLayerManager
