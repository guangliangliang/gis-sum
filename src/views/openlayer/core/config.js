import { TIANDITU_TOKEN } from '@/config/token'

const mapKey = TIANDITU_TOKEN

export const imageConfigs = [
  {
    label: '影像',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    themeColor: '#4a90e2',
    themeTransparent: 'rgba(74, 144, 226, 0.3)',
    themeLight: 'rgba(74, 144, 226, 0.1)'
  },
  {
    label: '行政',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    themeColor: '#00d4ff',
    themeTransparent: 'rgba(0, 212, 255, 0.3)',
    themeLight: 'rgba(0, 212, 255, 0.1)'
  },
  {
    label: '地形',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    themeColor: '#67c23a',
    themeTransparent: 'rgba(103, 194, 58, 0.3)',
    themeLight: 'rgba(103, 194, 58, 0.1)'
  },
  {
    label: 'OSM',
    value: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    placeName: null,
    themeColor: '#ff6b6b',
    themeTransparent: 'rgba(255, 107, 107, 0.3)',
    themeLight: 'rgba(255, 107, 107, 0.1)'
  }
]

export const ATTRIBUTIONS = '数据来源'
