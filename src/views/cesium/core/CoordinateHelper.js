import * as Cesium from 'cesium'

class CoordinateHelper {
  constructor(viewer) {
    this.viewer = viewer
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
   * 屏幕坐标转笛卡尔坐标
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Cesium.Cartesian3|null} 笛卡尔坐标
   */
  screenToCartesian(pixel) {
    if (!this.viewer) return null
    const [x, y] = pixel
    const pickRay = this.viewer.camera.getPickRay(new Cesium.Cartesian2(x, y))
    return this.viewer.scene.globe.pick(pickRay, this.viewer.scene)
  }

  /**
   * 笛卡尔坐标转屏幕坐标
   * @param {Cesium.Cartesian3} cartesian 笛卡尔坐标
   * @returns {Array<number>|null} 屏幕坐标 [x, y]
   */
  cartesianToScreen(cartesian) {
    if (!this.viewer) return null
    const pixel = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, cartesian)
    if (!pixel) return null
    return [pixel.x, pixel.y]
  }

  /**
   * 经纬度转屏幕坐标
   * @param {Array<number>} lngLat 经纬度 [lng, lat, height]
   * @returns {Array<number>|null} 屏幕坐标 [x, y]
   */
  lngLatToScreen(lngLat) {
    const cartesian = this.lngLatToCartesian(lngLat)
    return this.cartesianToScreen(cartesian)
  }

  /**
   * 屏幕坐标转经纬度
   * @param {Array<number>} pixel 屏幕坐标 [x, y]
   * @returns {Array<number>|null} 经纬度 [lng, lat, height]
   */
  screenToLngLat(pixel) {
    const cartesian = this.screenToCartesian(pixel)
    if (!cartesian) return null
    return this.cartesianToLngLat(cartesian)
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
   * 计算点到线段的距离（米）
   * @param {Array<number>} point 点的经纬度 [lng, lat, height]
   * @param {Array<Array<number>>} line 线段的两个端点 [[lng1, lat1, height1], [lng2, lat2, height2]]
   * @returns {number} 距离（米）
   */
  distanceToLine(point, line) {
    if (line.length < 2) return 0
    
    const [p1, p2] = line
    const cartesianPoint = this.lngLatToCartesian(point)
    const cartesianP1 = this.lngLatToCartesian(p1)
    const cartesianP2 = this.lngLatToCartesian(p2)
    
    const length = Cesium.Cartesian3.distance(cartesianP1, cartesianP2)
    if (length === 0) return Cesium.Cartesian3.distance(cartesianPoint, cartesianP1)
    
    const t = Math.max(0, Math.min(1, 
      Cesium.Cartesian3.dot(
        Cesium.Cartesian3.subtract(cartesianPoint, cartesianP1, new Cesium.Cartesian3()),
        Cesium.Cartesian3.subtract(cartesianP2, cartesianP1, new Cesium.Cartesian3())
      ) / (length * length)
    ))
    
    const projection = Cesium.Cartesian3.lerp(cartesianP1, cartesianP2, t, new Cesium.Cartesian3())
    return Cesium.Cartesian3.distance(cartesianPoint, projection)
  }

  /**
   * 坐标转换（WGS84到笛卡尔）
   * @param {Array<number>} lngLat WGS84坐标 [lng, lat, height]
   * @returns {Cesium.Cartesian3} 笛卡尔坐标
   */
  wgs84ToCartesian(lngLat) {
    return this.lngLatToCartesian(lngLat)
  }

  /**
   * 坐标转换（笛卡尔到WGS84）
   * @param {Cesium.Cartesian3} cartesian 笛卡尔坐标
   * @returns {Array<number>} WGS84坐标 [lng, lat, height]
   */
  cartesianToWgs84(cartesian) {
    return this.cartesianToLngLat(cartesian)
  }

  /**
   * 销毁坐标辅助类
   */
  destroy() {
    this.viewer = null
  }
}

export default CoordinateHelper