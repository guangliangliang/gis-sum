import * as Cesium from 'cesium'

class ControlManager {
  constructor(viewer) {
    this.viewer = viewer
    this.controls = new Map()
  }

  /**
   * 添加默认控件
   * @returns {ControlManager} 当前实例
   */
  addDefaultControls() {
    // Cesium默认已经添加了一些控件
    // 这里可以根据需要进行配置
    this.viewer.controls = this.viewer.scene.screenSpaceCameraController
    this.controls.set('default', this.viewer.controls)
    return this
  }

  /**
   * 添加缩放控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addZoomControl(options = {}) {
    // Cesium默认包含缩放功能
    // 这里可以配置缩放控件的行为
    this.viewer.controls.enableZoom = options.enableZoom !== false
    this.controls.set('zoom', this.viewer.controls)
    return this
  }

  /**
   * 添加指南针控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addCompassControl(options = {}) {
    // 确保导航控件可见
    this.viewer.navigationControl.enabled = true
    this.controls.set('compass', this.viewer.navigationControl)
    return this
  }

  /**
   * 添加比例尺控件
   * @param {Object} options 控件选项
   * @returns {ControlManager} 当前实例
   */
  addScaleControl(options = {}) {
    // 确保比例尺可见
    this.viewer.scene.bottomContainer.style.display = 'block'
    this.controls.set('scale', this.viewer.scene.bottomContainer)
    return this
  }

  /**
   * 添加自定义控件
   * @param {HTMLElement} element 自定义控件元素
   * @param {string} position 控件位置
   * @param {string} name 控件名称
   * @returns {ControlManager} 当前实例
   */
  addCustomControl(element, position = 'top-right', name) {
    const container = this.getControlContainer(position)
    if (container) {
      container.appendChild(element)
      this.controls.set(name, element)
    }
    return this
  }

  /**
   * 获取控件容器
   * @param {string} position 位置
   * @returns {HTMLElement|null} 容器元素
   * @private
   */
  getControlContainer(position) {
    switch (position) {
      case 'top-left':
        return this.viewer.scene.screenSpaceCameraController._container
      case 'top-right':
        return this.viewer.scene.canvas.parentElement
      case 'bottom-left':
        return this.viewer.scene.bottomContainer
      case 'bottom-right':
        return this.viewer.scene.bottomContainer
      default:
        return this.viewer.scene.canvas.parentElement
    }
  }

  /**
   * 移除控件
   * @param {string} name 控件名称
   * @returns {ControlManager} 当前实例
   */
  removeControl(name) {
    const control = this.controls.get(name)
    if (control) {
      if (control.parentNode) {
        control.parentNode.removeChild(control)
      }
      this.controls.delete(name)
    }
    return this
  }

  /**
   * 移除所有控件
   * @returns {ControlManager} 当前实例
   */
  removeAllControls() {
    this.controls.forEach((control, name) => {
      if (name !== 'default') {
        this.removeControl(name)
      }
    })
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
    this.viewer = null
  }
}

export default ControlManager