class DrawManager {
  constructor(map) {
    this.map = map
    this.drawLayer = null
    this.mouseTool = null
    this.currentType = null
    this.overlays = []
  }

  _initMouseTool() {
    if (!window.AMap || !window.AMap.MouseTool) {
      console.error('AMap.MouseTool is not available')
      return
    }

    if (!this.mouseTool) {
      this.mouseTool = new AMap.MouseTool(this.map)

      this.mouseTool.on('draw', (e) => {
        this.overlays.push(e.obj)
      })
    }
  }

  startDraw(type) {
    this.stopDraw()
    this.currentType = type
    this._initMouseTool()

    if (!this.mouseTool) return

    switch (type) {
      case 'point':
        this.mouseTool.marker()
        break
      case 'line':
        this.mouseTool.polyline()
        break
      case 'polygon':
        this.mouseTool.polygon()
        break
    }
  }

  stopDraw() {
    if (this.mouseTool) {
      this.mouseTool.close()
    }
    this.currentType = null
  }

  clearDrawings() {
    this.stopDraw()
    if (this.overlays.length > 0) {
      this.map.remove(this.overlays)
      this.overlays = []
    }
  }

  removeDrawLayer() {
    this.clearDrawings()
  }

  getCurrentType() {
    return this.currentType
  }

  destroy() {
    this.removeDrawLayer()
    if (this.mouseTool) {
      this.mouseTool.close()
      this.mouseTool = null
    }
    this.map = null
  }
}

export default DrawManager
