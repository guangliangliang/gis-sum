import mapboxgl from 'mapbox-gl'

class DrawManager {
  constructor(map) {
    this.map = map
    this.sourceId = 'draw-source'
    this.layerId = 'draw-layer'
    this.currentType = null
    this.features = []
  }

  startDraw(type) {
    this.clearDrawings()
    this.currentType = type

    if (!this.map.getSource(this.sourceId)) {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      })
    }

    if (!this.map.getLayer(this.layerId)) {
      this.map.addLayer({
        id: this.layerId,
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

    let isDrawing = false
    let coordinates = []

    const handleClick = (e) => {
      const coords = [e.lngLat.lng, e.lngLat.lat]
      
      if (type === 'point') {
        this._addFeature({ type: 'Point', coordinates: coords })
        this.stopDraw()
      } else {
        if (!isDrawing) {
          isDrawing = true
          coordinates = [coords]
        } else {
          coordinates.push(coords)
          
          if (type === 'polygon' && coordinates.length >= 3) {
            this._addFeature({ type: 'Polygon', coordinates: [coordinates] })
            this.stopDraw()
          } else if (type === 'line') {
            this._addFeature({ type: 'LineString', coordinates })
            this.stopDraw()
          }
        }
      }
    }

    this.map.on('click', handleClick)
    this._clickHandler = handleClick
  }

  _addFeature(geometry) {
    this.features.push({
      type: 'Feature',
      geometry,
      properties: {}
    })
    this._updateSource()
  }

  _updateSource() {
    const source = this.map.getSource(this.sourceId)
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: this.features
      })
    }
  }

  stopDraw() {
    this.currentType = null
    if (this._clickHandler) {
      this.map.off('click', this._clickHandler)
      delete this._clickHandler
    }
  }

  clearDrawings() {
    this.stopDraw()
    this.features = []
    this._updateSource()
  }

  removeDrawLayer() {
    this.clearDrawings()
    if (this.map.getLayer(this.layerId)) this.map.removeLayer(this.layerId)
    if (this.map.getSource(this.sourceId)) this.map.removeSource(this.sourceId)
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
