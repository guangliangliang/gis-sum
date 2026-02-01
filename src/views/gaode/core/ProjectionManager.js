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
    const [lng, lat] = lngLat
    const x = (lng * this.EARTH_RADIUS * Math.PI) / 180
    const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * this.EARTH_RADIUS
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
   * 坐标转换（使用高德地图的坐标转换服务）
   * @param {Array<number>} lngLat 坐标 [lng, lat]
   * @param {string} from 源坐标系
   * @param {string} to 目标坐标系
   * @returns {Promise<Array<number>>} 转换后的坐标
   */
  convert(lngLat, from, to) {
    return new Promise((resolve) => {
      AMap.convertFrom(lngLat, to, function (status, result) {
        if (status === 'complete' && result.info === 'ok') {
          resolve(result.locations[0].toArray())
        } else {
          resolve(lngLat)
        }
      })
    })
  }

  /**
   * 计算两点之间的距离（米）
   * @param {Array<number>} lngLat1 第一个点的经纬度 [lng, lat]
   * @param {Array<number>} lngLat2 第二个点的经纬度 [lng, lat]
   * @returns {number} 距离（米）
   */
  calculateDistance(lngLat1, lngLat2) {
    if (this.map) {
      return this.map.getDistance(lngLat1, lngLat2)
    }

    //  fallback: 使用球面距离公式
    const [lng1, lat1] = lngLat1
    const [lng2, lat2] = lngLat2
    const radLat1 = (lat1 * Math.PI) / 180
    const radLat2 = (lat2 * Math.PI) / 180
    const a = radLat1 - radLat2
    const b = (lng1 * Math.PI) / 180 - (lng2 * Math.PI) / 180
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * this.EARTH_RADIUS
    s = Math.round(s * 10000) / 10000
    return s
  }

  /**
   * 将度数转换为弧度
   * @param {number} degrees 角度
   * @returns {number} 弧度
   */
  toRadians(degrees) {
    return (degrees * Math.PI) / 180
  }

  /**
   * 将弧度转换为度数
   * @param {number} radians 弧度
   * @returns {number} 角度
   */
  toDegrees(radians) {
    return (radians * 180) / Math.PI
  }

  /**
   * 销毁投影管理器
   */
  destroy() {
    this.map = null
  }
}

export default ProjectionManager
