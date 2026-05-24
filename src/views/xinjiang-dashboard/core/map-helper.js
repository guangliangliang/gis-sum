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
  const name = feature.get('name') || ''

  return new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: 'rgba(0, 212, 255, 0.7)',
      width: 2
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
  '古交镇': { population: 35000, area: 57.2, gdp: 12.5, address: '上院泽古线古交镇政府古交镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/ee85665e7efa1e52813f59f84bd2a3ee'] },
  '龙兴镇': { population: 85000, area: 72.5, gdp: 45.8, address: '新北建街与站北路交叉口西南60米', tel: '-', openTime: '周一至周五 09:00-17:00', photos: [] },
  '阳王镇': { population: 28000, area: 65.8, gdp: 8.6, address: '原阳王中心校', tel: '0359-7822403', openTime: '-', photos: [] },
  '泽掌镇': { population: 32000, area: 78.3, gdp: 15.2, address: '泽古线泽掌镇政府泽掌镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/d14ce60bf422ae29f285c8036a866d97'] },
  '三泉镇': { population: 42000, area: 85.6, gdp: 22.3, address: '三泉镇政府三泉镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/c34773d25d6b8d228b2414fc80459c0d'] },
  '泉掌镇': { population: 25000, area: 45.2, gdp: 7.8, address: '泉掌镇', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/2bad6cfee798361c9f2b4daffd764e12'] },
  '横桥镇': { population: 38000, area: 92.5, gdp: 18.5, address: '南马新北线横桥镇政府', tel: '-', openTime: '-', photos: ['http://store.is.autonavi.com/showpic/486334b4b3c28a0231f7a98bd1062dfa'] },
  '万安镇': { population: 30000, area: 62.3, gdp: 10.2, address: '万安镇新闻路', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/8b4ee5d266d4788ac5b70d1786347480'] },
  '北张镇': { population: 27000, area: 58.7, gdp: 9.5, address: '泽古线', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/e8069e283d7888546be335bc3408dbb0'] }
}
