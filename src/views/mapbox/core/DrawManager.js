import mapboxgl from 'mapbox-gl'

class DrawManager {
  constructor(map) {
    this.map = map
    this.sourceId = 'draw-source'
    this.currentType = null
    this.features = []
    this.drawingCoords = []
  }

  startDraw(type) {
    this.stopDraw()
    this.currentType = type
    this.drawingCoords = []

    if (!this.map.getSource(this.sourceId)) {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      })
    }

    this._removeAllLayers()
    this._setupLayers(type)
    this._updateSource()
    this.map.getCanvas().style.cursor = 'crosshair'

    const handleClick = (e) => {
      const coords = [e.lngLat.lng, e.lngLat.lat]
      
      if (type === 'point') {
        this.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: coords },
          properties: {}
        })
        this._updateSource()
      } else {
        this.drawingCoords.push(coords)
        this._updateSource()
      }
    }

    const handleMouseMove = (e) => {
      if (this.currentType === type && type !== 'point' && this.drawingCoords.length > 0) {
        const mouseCoords = [e.lngLat.lng, e.lngLat.lat]
        this._updateSource(mouseCoords)
      }
    }

    const handleDblClick = (e) => {
      if (this.currentType === type) {
        if (type === 'line' && this.drawingCoords.length >= 2) {
          this.features.push({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: [...this.drawingCoords] },
            properties: {}
          })
          this.drawingCoords = []
          this._updateSource()
        } else if (type === 'polygon' && this.drawingCoords.length >= 3) {
          const closedCoords = [...this.drawingCoords, this.drawingCoords[0]]
          this.features.push({
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [closedCoords] },
            properties: {}
          })
          this.drawingCoords = []
          this._updateSource()
        }
      }
    }

    this.map.on('click', handleClick)
    this.map.on('mousemove', handleMouseMove)
    this.map.on('dblclick', handleDblClick)
    this._clickHandler = handleClick
    this._mouseMoveHandler = handleMouseMove
    this._dblClickHandler = handleDblClick
  }

  _removeAllLayers() {
    if (this.map.getLayer('draw-fill')) this.map.removeLayer('draw-fill')
    if (this.map.getLayer('draw-line')) this.map.removeLayer('draw-line')
    if (this.map.getLayer('draw-point')) this.map.removeLayer('draw-point')
  }

  _setupLayers(type) {
    if (type === 'point') {
      this.map.addLayer({
        id: 'draw-point',
        type: 'circle',
        source: this.sourceId,
        paint: {
          'circle-radius': 8,
          'circle-color': '#409eff',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff'
        }
      })
    } else if (type === 'line') {
      this.map.addLayer({
        id: 'draw-line',
        type: 'line',
        source: this.sourceId,
        paint: {
          'line-color': '#409eff',
          'line-width': 4
        }
      })
      this.map.addLayer({
        id: 'draw-point',
        type: 'circle',
        source: this.sourceId,
        paint: {
          'circle-radius': 8,
          'circle-color': '#409eff',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff'
        }
      })
    } else if (type === 'polygon') {
      this.map.addLayer({
        id: 'draw-fill',
        type: 'fill',
        source: this.sourceId,
        paint: {
          'fill-color': '#409eff',
          'fill-opacity': 0.3,
          'fill-outline-color': '#409eff'
        }
      })
      this.map.addLayer({
        id: 'draw-line',
        type: 'line',
        source: this.sourceId,
        paint: {
          'line-color': '#409eff',
          'line-width': 4
        }
      })
      this.map.addLayer({
        id: 'draw-point',
        type: 'circle',
        source: this.sourceId,
        paint: {
          'circle-radius': 8,
          'circle-color': '#409eff',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff'
        }
      })
    }
  }

  _updateSource(mouseCoords = null) {
    const allFeatures = [...this.features]
    
    if (this.currentType && this.drawingCoords.length > 0) {
      if (this.currentType === 'line') {
        let coords = [...this.drawingCoords]
        if (mouseCoords) coords.push(mouseCoords)
        if (coords.length >= 2) {
          allFeatures.push({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: coords },
            properties: {}
          })
        }
      } else if (this.currentType === 'polygon') {
        let coords = [...this.drawingCoords]
        if (mouseCoords) coords.push(mouseCoords)
        if (coords.length >= 3) {
          const closedCoords = [...coords, coords[0]]
          allFeatures.push({
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [closedCoords] },
            properties: {}
          })
        }
      }
    }

    const source = this.map.getSource(this.sourceId)
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: allFeatures
      })
    }
  }

  stopDraw() {
    this.currentType = null
    this.drawingCoords = []
    this._updateSource()
    this.map.getCanvas().style.cursor = ''
    
    if (this._clickHandler) {
      this.map.off('click', this._clickHandler)
      delete this._clickHandler
    }
    if (this._mouseMoveHandler) {
      this.map.off('mousemove', this._mouseMoveHandler)
      delete this._mouseMoveHandler
    }
    if (this._dblClickHandler) {
      this.map.off('dblclick', this._dblClickHandler)
      delete this._dblClickHandler
    }
  }

  clearDrawings() {
    this.stopDraw()
    this.features = []
    this._removeAllLayers()
    
    if (this.map.getSource(this.sourceId)) {
      this.map.removeSource(this.sourceId)
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
    this.map = null
  }
}

export default DrawManager
