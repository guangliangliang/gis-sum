import { fromLonLat, toLonLat, transform } from 'ol/proj'
import { getPointResolution } from 'ol/proj'

class CoordinateHelper {
  constructor(map) {
    this.map = map
  }

  /**
   * 经纬度转地图坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @param {string} targetProj 目标投影，默认EPSG:3857
   * @returns {Array<number>} 地图坐标 [x, y]
   */
  lngLatToMap(lngLat, targetProj = 'EPSG:3857') {
    if (targetProj === 'EPSG:3857') {
      return fromLonLat(lngLat)
    }
    return transform(lngLat, 'EPSG:4326', targetProj)
  }

  /**
   * 地图坐标转经纬度
   * @param {Array<number>} coord 地图坐标 [x, y]
   * @param {string} sourceProj 源投影，默认EPSG:3857
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  mapToLngLat(coord, sourceProj = 'EPSG:3857') {
    if (sourceProj === 'EPSG:3857') {
      return toLonLat(coord)
    }
    return transform(coord, sourceProj, 'EPSG:4326')
  }

  /**
   * 屏幕坐标转地图坐标
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Array<number>} 地图坐标 [x, y]
   */
  screenToMap(pixel) {
    if (!this.map) return [0, 0]
    return this.map.getCoordinateFromPixel(pixel)
  }

  /**
   * 地图坐标转屏幕坐标
   * @param {Array<number>} coord 地图坐标 [x, y]
   * @returns {Array<number>} 屏幕坐标 [x, y]
   */
  mapToScreen(coord) {
    if (!this.map) return [0, 0]
    return this.map.getPixelFromCoordinate(coord)
  }

  /**
   * 经纬度转屏幕坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 屏幕坐标 [x, y]
   */
  lngLatToScreen(lngLat) {
    const mapCoord = this.lngLatToMap(lngLat)
    return this.mapToScreen(mapCoord)
  }

  /**
   * 屏幕坐标转经纬度
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  screenToLngLat(pixel) {
    const mapCoord = this.screenToMap(pixel)
    return this.mapToLngLat(mapCoord)
  }

  /**
   * 计算两点之间的距离（米）
   * @param {Array<number>} lngLat1 第一个点的经纬度 [lng, lat]
   * @param {Array<number>} lngLat2 第二个点的经纬度 [lng, lat]
   * @returns {number} 距离（米）
   */
  calculateDistance(lngLat1, lngLat2) {
    const [lng1, lat1] = lngLat1
    const [lng2, lat2] = lngLat2
    const R = 6371e3 // 地球半径（米）
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  /**
   * 计算点到线段的距离（米）
   * @param {Array<number>} point 点的经纬度 [lng, lat]
   * @param {Array<Array<number>>} line 线段的两个端点 [[lng1, lat1], [lng2, lat2]]
   * @returns {number} 距离（米）
   */
  distanceToLine(point, line) {
    if (line.length < 2) return 0

    const [p1, p2] = line
    const length = this.calculateDistance(p1, p2)
    if (length === 0) return this.calculateDistance(point, p1)

    const t = Math.max(
      0,
      Math.min(
        1,
        ((point[0] - p1[0]) * (p2[0] - p1[0]) + (point[1] - p1[1]) * (p2[1] - p1[1])) /
          ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
      )
    )

    const projection = [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])]

    return this.calculateDistance(point, projection)
  }

  /**
   * 获取地图分辨率
   * @param {Array<number>} coord 坐标
   * @param {number} zoom 缩放级别
   * @returns {number} 分辨率
   */
  getResolution(coord, zoom) {
    if (!this.map) return 0
    return getPointResolution(this.map.getView().getProjection(), 1, coord)
  }

  /**
   * 坐标转换
   * @param {Array<number>} coord 坐标
   * @param {string} sourceProj 源投影
   * @param {string} targetProj 目标投影
   * @returns {Array<number>} 转换后的坐标
   */
  transform(coord, sourceProj, targetProj) {
    return transform(coord, sourceProj, targetProj)
  }

  /**
   * 销毁坐标辅助类
   */
  destroy() {
    this.map = null
  }
}

export default CoordinateHelper
