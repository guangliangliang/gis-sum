import mapboxgl from 'mapbox-gl'

class ControlManager {
  constructor(map) {
    this.map = map
    this.controls = new Map()
  }

  /**
   * 添加缩放控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addZoomControl(options = {}) {
    const control = new mapboxgl.NavigationControl(options)
    this.map.addControl(control, options.position || 'top-right')
    this.controls.set('zoom', control)
    return this
  }

  /**
   * 添加全屏控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addFullscreenControl(options = {}) {
    const control = new mapboxgl.FullscreenControl(options)
    this.map.addControl(control, options.position || 'top-right')
    this.controls.set('fullscreen', control)
    return this
  }

  /**
   * 添加比例尺控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addScaleControl(options = {}) {
    const control = new mapboxgl.ScaleControl({
      maxWidth: options.maxWidth || 100,
      unit: options.unit || 'metric'
    })
    this.map.addControl(control, options.position || 'bottom-left')
    this.controls.set('scale', control)
    return this
  }

  /**
   * 添加指南针控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addCompassControl(options = {}) {
    const control = new mapboxgl.AttributionControl(options)
    this.map.addControl(control, options.position || 'top-right')
    this.controls.set('compass', control)
    return this
  }

  /**
   * 添加自定义控件
   * @param {Object} control 自定义控件实例
   * @param {string} position 控件位置
   * @param {string} name 控件名称
   * @returns {ControlManager} 当前实例
   */
  addCustomControl(control, position = 'top-right', name) {
    this.map.addControl(control, position)
    if (name) {
      this.controls.set(name, control)
    }
    return this
  }

  /**
   * 移除控件
   * @param {string} name 控件名称
   * @returns {ControlManager} 当前实例
   */
  removeControl(name) {
    const control = this.controls.get(name)
    if (control) {
      this.map.removeControl(control)
      this.controls.delete(name)
    }
    return this
  }

  /**
   * 移除所有控件
   * @returns {ControlManager} 当前实例
   */
  removeAllControls() {
    this.controls.forEach((control) => {
      this.map.removeControl(control)
    })
    this.controls.clear()
    return this
  }

  /**
   * 获取控件
   * @param {string} name 控件名称
   * @returns {Object|null} 控件实例
   */
  getControl(name) {
    return this.controls.get(name) || null
  }

  /**
   * 销毁控件管理器
   */
  destroy() {
    this.removeAllControls()
    this.map = null
  }
}

export default ControlManager
