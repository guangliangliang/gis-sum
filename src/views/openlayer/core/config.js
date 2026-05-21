import { TIANDITU_TOKEN } from '@/config/token'

const mapKey = TIANDITU_TOKEN

export const imageConfigs = [
  {
    label: '行政',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${mapKey}`
  },
  {
    label: '地形',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${mapKey}`
  },
  {
    label: '影像',
    value: `https://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
    placeName: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${mapKey}`
  },
  {
    label: 'OSM',
    value: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    placeName: null
  }
]

export const ATTRIBUTIONS = '数据来源'
