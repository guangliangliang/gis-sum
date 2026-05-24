import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke, Text, Circle } from 'ol/style'
import { fromLonLat } from 'ol/proj'

// 新绛县中心坐标
export const XINJIANG_CENTER = [111.18, 35.61]
export const XINJIANG_ZOOM = 11

// 乡镇样式函数
export function createTownStyle(feature, resolution) {
  const isHighlighted = feature.get('highlighted')
  const name = feature.get('name') || ''

  return new Style({
    fill: new Fill({
      color: isHighlighted ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: isHighlighted ? '#00d4ff' : 'rgba(0, 212, 255, 0.7)',
      width: isHighlighted ? 3 : 2
    }),
    text: new Text({
      text: name,
      fill: new Fill({
        color: '#ffffff'
      }),
      stroke: new Stroke({
        color: '#0a1628',
        width: 3
      }),
      font: '14px "Microsoft YaHei", sans-serif',
      offsetY: -5
    })
  })
}

// 创建点位样式
export function createPointStyle(color = '#00d4ff', radius = 8) {
  return new Style({
    image: new Circle({
      radius: radius,
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 2
      })
    })
  })
}

// 从GeoJSON创建图层
export function createGeoJSONLayer(geoJSON, styleFn) {
  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geoJSON, {
      featureProjection: 'EPSG:3857'
    })
  })

  return new VectorLayer({
    source: source,
    style: styleFn || createTownStyle,
    zIndex: 10
  })
}

// 从点数组创建图层
export function createPointLayer(points, options = {}) {
  const features = points.map((point, index) => {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(fromLonLat([point.lng, point.lat])),
      ...point
    })
    feature.setId(index)
    return feature
  })

  const source = new VectorSource({
    features: features
  })

  return new VectorLayer({
    source: source,
    style: options.style || createPointStyle(options.color),
    zIndex: options.zIndex || 20
  })
}

// 乡镇数据
export const townInfo = {
  '古交镇': { population: 35000, area: 57.2, gdp: 12.5 },
  '龙兴镇': { population: 85000, area: 72.5, gdp: 45.8 },
  '阳王镇': { population: 28000, area: 65.8, gdp: 8.6 },
  '泽掌镇': { population: 32000, area: 78.3, gdp: 15.2 },
  '三泉镇': { population: 42000, area: 85.6, gdp: 22.3 },
  '泉掌镇': { population: 25000, area: 45.2, gdp: 7.8 },
  '横桥乡': { population: 38000, area: 92.5, gdp: 18.5 },
  '万安镇': { population: 30000, area: 62.3, gdp: 10.2 },
  '北张镇': { population: 27000, area: 58.7, gdp: 9.5 }
}
