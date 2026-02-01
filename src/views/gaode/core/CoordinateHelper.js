class CoordinateHelper {
  constructor(map) {
    this.map = map
  }

  /**
   * 经纬度转地图坐标（墨卡托）
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 墨卡托坐标 [x, y]
   */
  lngLatToMap(lngLat) {
    if (!this.map) return [0, 0]
    return this.map.lnglatTocontainer(lngLat)
  }

  /**
   * 地图坐标转经纬度
   * @param {Array<number>} containerPoint 地图容器坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  mapToLngLat(containerPoint) {
    if (!this.map) return [0, 0]
    return this.map.containerToLngLat(containerPoint)
  }

  /**
   * 屏幕坐标转地图坐标
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Array<number>} 地图坐标 [x, y]
   */
  screenToMap(pixel) {
    if (!this.map) return [0, 0]
    return this.map.pixelToContainer(pixel)
  }

  /**
   * 地图坐标转屏幕坐标
   * @param {Array<number>} containerPoint 地图容器坐标 [x, y]
   * @returns {Array<number>} 屏幕坐标 [x, y]
   */
  mapToScreen(containerPoint) {
    if (!this.map) return [0, 0]
    return this.map.containerToPixel(containerPoint)
  }

  /**
   * 屏幕坐标转经纬度
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  screenToLngLat(pixel) {
    if (!this.map) return [0, 0]
    return this.map.pixelToLngLat(pixel)
  }

  /**
   * 经纬度转屏幕坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 屏幕坐标 [x, y]
   */
  lngLatToScreen(lngLat) {
    if (!this.map) return [0, 0]
    return this.map.lnglatToPixel(lngLat)
  }

  /**
   * 计算两点之间的距离（米）
   * @param {Array<number>} lngLat1 第一个点的经纬度 [lng, lat]
   * @param {Array<number>} lngLat2 第二个点的经纬度 [lng, lat]
   * @returns {number} 距离（米）
   */
  calculateDistance(lngLat1, lngLat2) {
    if (!this.map) return 0
    return this.map.getDistance(lngLat1, lngLat2)
  }

  /**
   * 计算点到线段的距离（米）
   * @param {Array<number>} point 点的经纬度 [lng, lat]
   * @param {Array<Array<number>>} line 线段的两个端点 [[lng1, lat1], [lng2, lat2]]
   * @returns {number} 距离（米）
   */
  distanceToLine(point, line) {
    if (!this.map || line.length < 2) return 0
    
    const [p1, p2] = line
    const length = this.calculateDistance(p1, p2)
    if (length === 0) return this.calculateDistance(point, p1)
    
    const t = Math.max(0, Math.min(1, 
      ((point[0] - p1[0]) * (p2[0] - p1[0]) + (point[1] - p1[1]) * (p2[1] - p1[1])) / 
      ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
    ))
    
    const projection = [
      p1[0] + t * (p2[0] - p1[0]),
      p1[1] + t * (p2[1] - p1[1])
    ]
    
    return this.calculateDistance(point, projection)
  }

  /**
   * 坐标转换（GCJ02到WGS84）
   * @param {Array<number>} lngLat GCJ02坐标 [lng, lat]
   * @returns {Array<number>} WGS84坐标 [lng, lat]
   */
  gcj02ToWgs84(lngLat) {
    // 注意：高德地图默认使用GCJ02坐标系
    // 这里使用AMap的坐标转换服务
    return new Promise((resolve) => {
      AMap.convertFrom(lngLat, 'gps', function (status, result) {
        if (status === 'complete' && result.info === 'ok') {
          resolve(result.locations[0].toArray())
        } else {
          resolve(lngLat)
        }
      })
    })
  }

  /**
   * 坐标转换（WGS84到GCJ02）
   * @param {Array<number>} lngLat WGS84坐标 [lng, lat]
   * @returns {Array<number>} GCJ02坐标 [lng, lat]
   */
  wgs84ToGcj02(lngLat) {
    // 注意：高德地图默认使用GCJ02坐标系
    // 这里使用AMap的坐标转换服务
    return new Promise((resolve) => {
      AMap.convertFrom(lngLat, 'gcj02', function (status, result) {
        if (status === 'complete' && result.info === 'ok') {
          resolve(result.locations[0].toArray())
        } else {
          resolve(lngLat)
        }
      })
    })
  }

  /**
   * 销毁坐标辅助类
   */
  destroy() {
    this.map = null
  }
}

export default CoordinateHelper