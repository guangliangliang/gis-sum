import * as Cesium from 'cesium'

class DrawManager {
  constructor(viewer) {
    this.viewer = viewer
    this.entities = []
    this.tempEntities = []
    this.handler = null
    this.currentType = null
    this.positions = []
  }

  startDraw(type) {
    this.stopDraw()
    this.currentType = type
    this.positions = []

    this.viewer.scene.canvas.style.cursor = 'crosshair'

    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    // 左键点击添加点
    this.handler.setInputAction((movement) => {
      const cartesian = this.viewer.scene.pickPosition(movement.position)
      if (!cartesian) return

      if (type === 'point') {
        const entity = this.viewer.entities.add({
          position: cartesian,
          point: {
            color: Cesium.Color.fromCssColorString('#409eff'),
            pixelSize: 12,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 3
          }
        })
        this.entities.push(entity)
      } else {
        this.positions.push(cartesian)
        this._updateTemp()
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // 鼠标移动更新预览
    this.handler.setInputAction((movement) => {
      if (type === 'point' || this.positions.length === 0) return
      
      const cartesian = this.viewer.scene.pickPosition(movement.endPosition)
      if (cartesian) {
        this._updateTemp([...this.positions, cartesian])
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    // 右键完成
    this.handler.setInputAction(() => {
      if (type === 'line' && this.positions.length >= 2) {
        const entity = this.viewer.entities.add({
          polyline: {
            positions: this.positions,
            width: 4,
            material: Cesium.Color.fromCssColorString('#409eff')
          }
        })
        this.entities.push(entity)
      } else if (type === 'polygon' && this.positions.length >= 3) {
        const entity = this.viewer.entities.add({
          polygon: {
            hierarchy: this.positions,
            material: Cesium.Color.fromCssColorString('#409eff').withAlpha(0.3),
            outline: true,
            outlineColor: Cesium.Color.fromCssColorString('#409eff'),
            outlineWidth: 3
          }
        })
        this.entities.push(entity)
      }
      
      this._clearTemp()
      this.positions = []
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  _updateTemp(displayPositions = this.positions) {
    this._clearTemp()

    if (displayPositions.length === 0) return

    // 绘制临时点
    displayPositions.forEach((pos) => {
      const pointEntity = this.viewer.entities.add({
        position: pos,
        point: {
          color: Cesium.Color.RED,
          pixelSize: 8,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        }
      })
      this.tempEntities.push(pointEntity)
    })

    // 绘制临时线/面
    if (this.currentType === 'line' && displayPositions.length >= 2) {
      const lineEntity = this.viewer.entities.add({
        polyline: {
          positions: displayPositions,
          width: 3,
          material: Cesium.Color.fromCssColorString('#409eff')
        }
      })
      this.tempEntities.push(lineEntity)
    } else if (this.currentType === 'polygon' && displayPositions.length >= 3) {
      const polyEntity = this.viewer.entities.add({
        polygon: {
          hierarchy: displayPositions,
          material: Cesium.Color.fromCssColorString('#409eff').withAlpha(0.2),
          outline: true,
          outlineColor: Cesium.Color.fromCssColorString('#409eff'),
          outlineWidth: 2
        }
      })
      this.tempEntities.push(polyEntity)
    }
  }

  _clearTemp() {
    this.tempEntities.forEach(entity => {
      this.viewer.entities.remove(entity)
    })
    this.tempEntities = []
  }

  stopDraw() {
    this.currentType = null
    this.positions = []
    this._clearTemp()

    if (this.viewer.scene.canvas) {
      this.viewer.scene.canvas.style.cursor = ''
    }

    if (this.handler) {
      this.handler.destroy()
      this.handler = null
    }
  }

  clearDrawings() {
    this.stopDraw()
    this.entities.forEach(entity => {
      this.viewer.entities.remove(entity)
    })
    this.entities = []
  }

  removeDrawLayer() {
    this.clearDrawings()
  }

  getCurrentType() {
    return this.currentType
  }

  destroy() {
    this.removeDrawLayer()
    this.viewer = null
  }
}

export default DrawManager
