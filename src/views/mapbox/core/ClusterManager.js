import mapboxgl from 'mapbox-gl'

class ClusterManager {
  constructor(map) {
    this.map = map
    this.layerId = 'stations'
    this.clusterLayerId = 'station-clusters'
    this.clusterCountLayerId = 'station-cluster-count'
    this.clusterPointLayerId = 'station-points'
    this.sourceId = 'cluster-source'
  }

  addClusterPoints(count = 100) {
    // 先清除已有的
    this.clearCluster()

    const center = [116.397428, 39.90923]
    const features = []

    for (let i = 0; i < count; i++) {
      const lng = center[0] + (Math.random() - 0.5) * 0.4
      const lat = center[1] + (Math.random() - 0.5) * 0.4
      features.push({
        type: 'Feature',
        properties: { id: i, name: `Point ${i + 1}` },
        geometry: { type: 'Point', coordinates: [lng, lat] }
      })
    }

    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    })

    // 聚合图层
    this.map.addLayer({
      id: this.clusterLayerId,
      type: 'circle',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': ['step', ['get', 'point_count'], '#67c23c', 10, '#409eff', 50, '#f56c6c'],
        'circle-radius': ['step', ['get', 'point_count'], 18, 10, 24, 50, 32],
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff'
      }
    })

    // 聚合点计数
    this.map.addLayer({
      id: this.clusterCountLayerId,
      type: 'symbol',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 14
      },
      paint: { 'text-color': '#ffffff' }
    })

    // 非聚合点
    this.map.addLayer({
      id: this.clusterPointLayerId,
      type: 'circle',
      source: this.sourceId,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#409eff',
        'circle-radius': 8,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff'
      }
    })
  }

  clearCluster() {
    if (this.map.getLayer(this.clusterLayerId)) this.map.removeLayer(this.clusterLayerId)
    if (this.map.getLayer(this.clusterCountLayerId)) this.map.removeLayer(this.clusterCountLayerId)
    if (this.map.getLayer(this.clusterPointLayerId)) this.map.removeLayer(this.clusterPointLayerId)
    if (this.map.getSource(this.sourceId)) this.map.removeSource(this.sourceId)
  }

  destroy() {
    this.clearCluster()
    this.map = null
  }
}

export default ClusterManager
