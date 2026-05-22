class ClusterManager {
  constructor(map) {
    this.map = map
    this.markers = []
    this.clusterMarkers = []
    this.data = []
    this.zoomHandler = null
  }

  addClusterPoints(count = 100) {
    this.clearCluster()

    const centerLng = 116.397428
    const centerLat = 39.90923

    for (let i = 0; i < count; i++) {
      const lng = centerLng + (Math.random() - 0.5) * 0.4
      const lat = centerLat + (Math.random() - 0.5) * 0.4
      this.data.push({ lng, lat, id: i, name: `Point ${i + 1}` })
    }

    this._updateClusters()
    
    this.zoomHandler = () => {
      this._updateClusters()
    }
    this.map.on('zoomend', this.zoomHandler)

    return this
  }

  _updateClusters() {
    const zoom = this.map.getZoom()
    const gridSize = this._getGridSize(zoom)
    
    this._clearCurrentMarkers()
    
    const clusters = this._createClusters(gridSize)
    
    clusters.forEach(cluster => {
      if (cluster.count > 1) {
        this._createClusterMarker(cluster)
      } else {
        this._createSingleMarker(cluster.points[0])
      }
    })
  }

  _getGridSize(zoom) {
    if (zoom > 15) return 0.005
    if (zoom > 12) return 0.02
    if (zoom > 10) return 0.05
    return 0.1
  }

  _createClusters(gridSize) {
    const clusters = []
    const used = new Set()

    this.data.forEach((point, i) => {
      if (used.has(i)) return

      const cluster = { points: [point], count: 1, lng: point.lng, lat: point.lat }
      used.add(i)

      this.data.forEach((otherPoint, j) => {
        if (i === j || used.has(j)) return

        const dist = Math.sqrt(
          Math.pow(point.lng - otherPoint.lng, 2) + 
          Math.pow(point.lat - otherPoint.lat, 2)
        )

        if (dist < gridSize) {
          cluster.points.push(otherPoint)
          cluster.count++
          used.add(j)
          
          cluster.lng = cluster.points.reduce((sum, p) => sum + p.lng, 0) / cluster.count
          cluster.lat = cluster.points.reduce((sum, p) => sum + p.lat, 0) / cluster.count
        }
      })

      clusters.push(cluster)
    })

    return clusters
  }

  _createClusterMarker(cluster) {
    let color = '#67c23c'
    let size = 40
    
    if (cluster.count > 50) {
      color = '#f56c6c'
      size = 60
    } else if (cluster.count > 20) {
      color = '#e6a23c'
      size = 50
    } else if (cluster.count > 5) {
      color = '#409eff'
      size = 45
    }

    const div = document.createElement('div')
    div.style.width = `${size}px`
    div.style.height = `${size}px`
    div.style.backgroundColor = color
    div.style.borderRadius = '50%'
    div.style.color = 'white'
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'
    div.style.fontSize = '14px'
    div.style.fontWeight = 'bold'
    div.style.border = '3px solid white'
    div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)'
    div.textContent = cluster.count

    const marker = new AMap.Marker({
      position: [cluster.lng, cluster.lat],
      content: div,
      offset: new AMap.Pixel(-size / 2, -size / 2),
      zIndex: 100
    })

    this.clusterMarkers.push(marker)
    this.map.add(marker)
  }

  _createSingleMarker(point) {
    const div = document.createElement('div')
    div.style.width = '20px'
    div.style.height = '20px'
    div.style.backgroundColor = '#409eff'
    div.style.borderRadius = '50%'
    div.style.border = '3px solid white'
    div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)'

    const marker = new AMap.Marker({
      position: [point.lng, point.lat],
      content: div,
      offset: new AMap.Pixel(-10, -10),
      title: point.name
    })

    this.clusterMarkers.push(marker)
    this.map.add(marker)
  }

  _clearCurrentMarkers() {
    if (this.clusterMarkers.length > 0) {
      this.map.remove(this.clusterMarkers)
      this.clusterMarkers = []
    }
  }

  clearCluster() {
    if (this.zoomHandler) {
      this.map.off('zoomend', this.zoomHandler)
      this.zoomHandler = null
    }
    
    this._clearCurrentMarkers()
    this.data = []
    
    return this
  }

  destroy() {
    this.clearCluster()
    this.map = null
  }
}

export default ClusterManager
