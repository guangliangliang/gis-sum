import * as Cesium from 'cesium'

class ClusterManager {
  constructor(viewer) {
    this.viewer = viewer
    this.entities = []
    this.data = []
    this.removeHandler = null
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

    this.removeHandler = () => {
      this._updateClusters()
    }
    this.viewer.camera.changed.addEventListener(this.removeHandler)

    return this
  }

  _updateClusters() {
    const cameraHeight = this.viewer.camera.positionCartographic.height
    const gridSize = this._getGridSize(cameraHeight)

    this._clearCurrentEntities()

    const clusters = this._createClusters(gridSize)

    clusters.forEach(cluster => {
      if (cluster.count > 1) {
        this._createClusterEntity(cluster)
      } else {
        this._createSingleEntity(cluster.points[0])
      }
    })
  }

  _getGridSize(height) {
    if (height < 5000) return 0.005
    if (height < 20000) return 0.015
    if (height < 50000) return 0.03
    if (height < 200000) return 0.08
    return 0.15
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

  _createClusterEntity(cluster) {
    let color = '#67c23c'
    let pixelSize = 30

    if (cluster.count > 50) {
      color = '#f56c6c'
      pixelSize = 50
    } else if (cluster.count > 20) {
      color = '#e6a23c'
      pixelSize = 40
    } else if (cluster.count > 5) {
      color = '#409eff'
      pixelSize = 35
    }

    const entity = this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(cluster.lng, cluster.lat),
      point: {
        color: Cesium.Color.fromCssColorString(color),
        pixelSize: pixelSize,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      label: {
        text: cluster.count.toString(),
        font: 'bold 14px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    })

    this.entities.push(entity)
  }

  _createSingleEntity(point) {
    const entity = this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(point.lng, point.lat),
      point: {
        color: Cesium.Color.fromCssColorString('#409eff'),
        pixelSize: 10,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      name: point.name
    })

    this.entities.push(entity)
  }

  _clearCurrentEntities() {
    this.entities.forEach(entity => {
      this.viewer.entities.remove(entity)
    })
    this.entities = []
  }

  clearCluster() {
    if (this.removeHandler) {
      this.viewer.camera.changed.removeEventListener(this.removeHandler)
      this.removeHandler = null
    }

    this._clearCurrentEntities()
    this.data = []

    return this
  }

  destroy() {
    this.clearCluster()
    this.viewer = null
  }
}

export default ClusterManager
