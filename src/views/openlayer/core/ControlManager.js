import { FullScreen, ScaleLine, Zoom } from 'ol/control'
import BaseMapSwitcherControl from './BaseMapSwitcherControl'

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
    const control = new Zoom({
      ...options,
      className: 'ol-zoom-top-right'
    })
    control.element.style.top = '20px'
    control.element.style.right = '20px'
    control.element.style.left = 'auto'
    this.map.addControl(control)
    this.controls.set('zoom', control)
    return this
  }

  /**
   * 添加全屏控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addFullscreenControl(options = {}) {
    const control = new FullScreen(options)
    control.element.style.top = '80px'
    control.element.style.right = '20px'
    control.element.style.left = 'auto'
    this.map.addControl(control)
    this.controls.set('fullscreen', control)
    return this
  }

  /**
   * 添加比例尺控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addScaleControl(options = {}) {
    const control = new ScaleLine({
      units: options.units || 'metric',
      ...options
    })
    control.element.style.bottom = '20px'
    control.element.style.left = '20px'
    this.map.addControl(control)
    this.controls.set('scale', control)
    return this
  }

  /**
   * 添加底图切换控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addBaseMapSwitcherControl(options = {}) {
    const control = new BaseMapSwitcherControl(options)
    control.element.style.top = '110px'
    control.element.style.right = '20px'
    control.element.style.left = 'auto'
    this.map.addControl(control)
    this.controls.set('baseMapSwitcher', control)
    return this
  }

  /**
   * 添加自定义控件
   * @param {Object} control 自定义控件实例
   * @param {string} name 控件名称
   * @returns {ControlManager} 当前实例
   */
  addCustomControl(control, name) {
    this.map.addControl(control)
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
