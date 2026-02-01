import { transform, fromLonLat, toLonLat, get as getProjection } from 'ol/proj'

class ProjectionManager {
  constructor(map) {
    this.map = map
    this.EARTH_RADIUS = 6378137
  }

  /**
   * 经纬度转Web Mercator投影（EPSG:3857）
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} Web Mercator坐标 [x, y]
   */
  lngLatToWebMercator(lngLat) {
    return fromLonLat(lngLat)
  }

  /**
   * Web Mercator投影转经纬度（EPSG:3857 -> EPSG:4326）
   * @param {Array<number>} mercator Web Mercator坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  webMercatorToLngLat(mercator) {
    return toLonLat(mercator)
  }

  /**
   * 经纬度转墨卡托投影（通用）
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} 墨卡托坐标 [x, y]
   */
  lngLatToMercator(lngLat) {
    return this.lngLatToWebMercator(lngLat)
  }

  /**
   * 墨卡托投影转经纬度（通用）
   * @param {Array<number>} mercator 墨卡托坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  mercatorToLngLat(mercator) {
    return this.webMercatorToLngLat(mercator)
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
   * 获取投影对象
   * @param {string} projCode 投影编码
   * @returns {Object|null} 投影对象
   */
  getProjection(projCode) {
    return getProjection(projCode)
  }

  /**
   * 检查投影是否有效
   * @param {string} projCode 投影编码
   * @returns {boolean} 是否有效
   */
  isValidProjection(projCode) {
    return !!getProjection(projCode)
  }

  /**
   * 销毁投影管理器
   */
  destroy() {
    this.map = null
  }
}

export default ProjectionManager