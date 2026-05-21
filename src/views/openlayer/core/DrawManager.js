import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Draw } from 'ol/interaction'
import { Circle, Stroke, Fill, Style } from 'ol/style'

class DrawManager {
  constructor(map) {
    this.map = map
    this.drawLayer = null
    this.drawSource = null
    this.drawInteraction = null
    this.currentType = null
    this.layerId = 'draw-layer'
  }

  /**
   * 初始化绘制图层
   * @private
   */
  initDrawLayer() {
    if (this.drawLayer) return

    // 创建数据源
    this.drawSource = new VectorSource()

    // 创建样式
    const style = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#409eff' }),
        stroke: new Stroke({ color: '#fff', width: 2 })
      }),
      stroke: new Stroke({ color: '#409eff', width: 3 }),
      fill: new Fill({ color: 'rgba(64, 158, 255, 0.3)' })
    })

    // 创建图层
    this.drawLayer = new VectorLayer({
      source: this.drawSource,
      style: style,
      zIndex: 100
    })

    // 添加到地图
    this.map.addLayer(this.drawLayer)
  }

  /**
   * 开始绘制
   * @param {string} type 绘制类型: 'point' | 'line' | 'polygon'
   * @returns {DrawManager} 当前实例
   */
  startDraw(type) {
    // 停止之前的绘制
    this.stopDraw()

    // 初始化绘制图层
    this.initDrawLayer()

    // 映射类型名称
    const olType = {
      point: 'Point',
      line: 'LineString',
      polygon: 'Polygon'
    }[type] || type

    // 创建绘制交互
    this.drawInteraction = new Draw({
      source: this.drawSource,
      type: olType
    })

    // 添加到地图
    this.map.addInteraction(this.drawInteraction)
    this.currentType = type

    return this
  }

  /**
   * 停止绘制
   * @returns {DrawManager} 当前实例
   */
  stopDraw() {
    if (this.drawInteraction) {
      this.map.removeInteraction(this.drawInteraction)
      this.drawInteraction = null
    }
    this.currentType = null
    return this
  }

  /**
   * 清除所有绘制
   * @returns {DrawManager} 当前实例
   */
  clearDrawings() {
    this.stopDraw()
    if (this.drawSource) {
      this.drawSource.clear()
    }
    return this
  }

  /**
   * 移除绘制图层
   * @returns {DrawManager} 当前实例
   */
  removeDrawLayer() {
    this.stopDraw()
    if (this.drawLayer) {
      this.map.removeLayer(this.drawLayer)
      this.drawLayer = null
    }
    if (this.drawSource) {
      this.drawSource.clear()
      this.drawSource = null
    }
    return this
  }

  /**
   * 获取当前绘制类型
   * @returns {string|null} 当前类型
   */
  getCurrentType() {
    return this.currentType
  }

  /**
   * 销毁管理器
   */
  destroy() {
    this.removeDrawLayer()
    this.map = null
  }
}

export default DrawManager
