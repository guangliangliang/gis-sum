import * as Cesium from 'cesium'

class ProjectionManager {
  constructor(viewer) {
    this.viewer = viewer
    this.EARTH_RADIUS = 6378137
  }

  /**
   * 经纬度转Web Mercator投影（EPSG:3857）
   * @param {Array<number>} lngLat 经纬度 [lng, lat]
   * @returns {Array<number>} Web Mercator坐标 [x, y]
   */
  lngLatToWebMercator(lngLat) {
    const [lng, lat] = lngLat
    const x = (lng * this.EARTH_RADIUS * Math.PI) / 180
    const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) * this.EARTH_RADIUS
    return [x, y]
  }

  /**
   * Web Mercator投影转经纬度（EPSG:3857 -> EPSG:4326）
   * @param {Array<number>} mercator Web Mercator坐标 [x, y]
   * @returns {Array<number>} 经纬度 [lng, lat]
   */
  webMercatorToLngLat(mercator) {
    const [x, y] = mercator
    const lng = (x * 180) / (this.EARTH_RADIUS * Math.PI)
    const lat = (Math.atan(Math.exp(y / this.EARTH_RADIUS)) * 360) / Math.PI - 90
    return [lng, lat]
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
   * 经纬度转笛卡尔坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat, height]
   * @returns {Cesium.Cartesian3} 笛卡尔坐标
   */
  lngLatToCartesian(lngLat) {
    const [lng, lat, height = 0] = lngLat
    return Cesium.Cartesian3.fromDegrees(lng, lat, height)
  }

  /**
   * 笛卡尔坐标转经纬度
   * @param {Cesium.Cartesian3} cartesian 笛卡尔坐标
   * @returns {Array<number>} 经纬度 [lng, lat, height]
   */
  cartesianToLngLat(cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
    const lng = Cesium.Math.toDegrees(cartographic.longitude)
    const lat = Cesium.Math.toDegrees(cartographic.latitude)
    const height = cartographic.height
    return [lng, lat, height]
  }

  /**
   * 笛卡尔坐标转墨卡托投影
   * @param {Cesium.Cartesian3} cartesian 笛卡尔坐标
   * @returns {Array<number>} 墨卡托坐标 [x, y]
   */
  cartesianToMercator(cartesian) {
    const lngLat = this.cartesianToLngLat(cartesian)
    return this.lngLatToMercator(lngLat)
  }

  /**
   * 墨卡托投影转笛卡尔坐标
   * @param {Array<number>} mercator 墨卡托坐标 [x, y]
   * @param {number} height 高度
   * @returns {Cesium.Cartesian3} 笛卡尔坐标
   */
  mercatorToCartesian(mercator, height = 0) {
    const lngLat = this.mercatorToLngLat(mercator)
    return this.lngLatToCartesian([...lngLat, height])
  }

  /**
   * 计算两点之间的距离（米）
   * @param {Array<number>} lngLat1 第一个点的经纬度 [lng, lat, height]
   * @param {Array<number>} lngLat2 第二个点的经纬度 [lng, lat, height]
   * @returns {number} 距离（米）
   */
  calculateDistance(lngLat1, lngLat2) {
    const cartesian1 = this.lngLatToCartesian(lngLat1)
    const cartesian2 = this.lngLatToCartesian(lngLat2)
    return Cesium.Cartesian3.distance(cartesian1, cartesian2)
  }

  /**
   * 将度数转换为弧度
   * @param {number} degrees 角度
   * @returns {number} 弧度
   */
  toRadians(degrees) {
    return Cesium.Math.toRadians(degrees)
  }

  /**
   * 将弧度转换为度数
   * @param {number} radians 弧度
   * @returns {number} 角度
   */
  toDegrees(radians) {
    return Cesium.Math.toDegrees(radians)
  }

  /**
   * 销毁投影管理器
   */
  destroy() {
    this.viewer = null
  }
}

export default ProjectionManager