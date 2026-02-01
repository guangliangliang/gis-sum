import mapboxgl from 'mapbox-gl'

class CoordinateHelper {
  constructor(map) {
    this.map = map
  }

  /**
   * 经纬度转屏幕坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 屏幕坐标 [x, y]
   */
  lngLatToScreen(lngLat) {
    if (!this.map) return [0, 0]
    return this.map.project(lngLat).toArray()
  }

  /**
   * 屏幕坐标转经纬度
   * @param {Array<number>} point 屏幕坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  screenToLngLat(point) {
    if (!this.map) return [0, 0]
    return this.map.unproject(point).toArray()
  }

  /**
   * 经纬度转墨卡托坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 墨卡托坐标 [x, y]
   */
  lngLatToMercator(lngLat) {
    const [lng, lat] = lngLat
    const x = (lng * 20037508.34) / 180
    const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180)
    const mercatorY = (y * 20037508.34) / 180
    return [x, mercatorY]
  }

  /**
   * 墨卡托坐标转经纬度
   * @param {Array<number>} mercator 墨卡托坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  mercatorToLngLat(mercator) {
    const [x, y] = mercator
    const lng = (x * 180) / 20037508.34
    const lat = (Math.atan(Math.exp((y * Math.PI) / 20037508.34)) * 360) / Math.PI - 90
    return [lng, lat]
  }

  /**
   * 计算两点之间的距离（米）
   * @param {Array<number>} lngLat1 第一个点的经纬度 [lng, lat]
   * @param {Array<number>} lngLat2 第二个点的经纬度 [lng, lat]
   * @returns {number} 距离（米）
   */
  calculateDistance(lngLat1, lngLat2) {
    if (!this.map) return 0
    const point1 = new mapboxgl.LngLat(...lngLat1)
    const point2 = new mapboxgl.LngLat(...lngLat2)
    return point1.distanceTo(point2)
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
    const pointObj = new mapboxgl.LngLat(...point)
    const lineStart = new mapboxgl.LngLat(...p1)
    const lineEnd = new mapboxgl.LngLat(...p2)
    
    // 计算点到线段的最短距离
    const length = lineStart.distanceTo(lineEnd)
    if (length === 0) return pointObj.distanceTo(lineStart)
    
    const t = Math.max(0, Math.min(1, 
      ((point[0] - p1[0]) * (p2[0] - p1[0]) + (point[1] - p1[1]) * (p2[1] - p1[1])) / 
      ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
    ))
    
    const projection = [
      p1[0] + t * (p2[0] - p1[0]),
      p1[1] + t * (p2[1] - p1[1])
    ]
    
    return pointObj.distanceTo(new mapboxgl.LngLat(...projection))
  }

  /**
   * 销毁坐标辅助类
   */
  destroy() {
    this.map = null
  }
}

export default CoordinateHelper