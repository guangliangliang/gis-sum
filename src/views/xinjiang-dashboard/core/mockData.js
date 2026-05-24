// 新绛县模拟数据
export const townNames = [
  '古交镇',
  '龙兴镇',
  '阳王镇',
  '泽掌镇',
  '三泉镇',
  '泉掌镇',
  '横桥乡',
  '万安镇',
  '北张镇'
]

// 乡镇基础数据
export const townData = [
  { name: '古交镇', population: 35000, area: 57.2, gdp: 12.5, lng: 111.16, lat: 35.58 },
  { name: '龙兴镇', population: 85000, area: 72.5, gdp: 45.8, lng: 111.20, lat: 35.62 },
  { name: '阳王镇', population: 28000, area: 65.8, gdp: 8.6, lng: 111.24, lat: 35.60 },
  { name: '泽掌镇', population: 32000, area: 78.3, gdp: 15.2, lng: 111.23, lat: 35.63 },
  { name: '三泉镇', population: 42000, area: 85.6, gdp: 22.3, lng: 111.17, lat: 35.61 },
  { name: '泉掌镇', population: 25000, area: 45.2, gdp: 7.8, lng: 111.15, lat: 35.62 },
  { name: '横桥乡', population: 38000, area: 92.5, gdp: 18.5, lng: 111.14, lat: 35.55 },
  { name: '万安镇', population: 30000, area: 62.3, gdp: 10.2, lng: 111.12, lat: 35.59 },
  { name: '北张镇', population: 27000, area: 58.7, gdp: 9.5, lng: 111.19, lat: 35.64 }
]

// 新绛县总体数据
export const countyOverview = {
  name: '新绛县',
  totalPopulation: 342000,
  totalArea: 598.1,
  gdp: 150.4,
  gdpGrowth: 6.8,
  adminTowns: 9,
  adminVillages: 220
}

// 学校点位数据
export const schoolPoints = [
  { lng: 111.22, lat: 35.62, name: '新绛中学', type: 'high' },
  { lng: 111.20, lat: 35.63, name: '新绛二中', type: 'high' },
  { lng: 111.18, lat: 35.61, name: '龙兴中学', type: 'middle' },
  { lng: 111.24, lat: 35.60, name: '新城一中', type: 'middle' },
  { lng: 111.16, lat: 35.58, name: '古交中学', type: 'middle' },
  { lng: 111.21, lat: 35.64, name: '东街小学', type: 'primary' },
  { lng: 111.19, lat: 35.62, name: '西街小学', type: 'primary' },
  { lng: 111.23, lat: 35.61, name: '南街小学', type: 'primary' },
  { lng: 111.17, lat: 35.63, name: '北街小学', type: 'primary' },
  { lng: 111.15, lat: 35.60, name: '三泉小学', type: 'primary' }
]

// 医院点位数据
export const hospitalPoints = [
  { lng: 111.21, lat: 35.62, name: '新绛县人民医院', level: '2A' },
  { lng: 111.20, lat: 35.61, name: '新绛县中医院', level: '2A' },
  { lng: 111.19, lat: 35.63, name: '第二人民医院', level: '1A' },
  { lng: 111.22, lat: 35.60, name: '妇幼保健院', level: '1A' },
  { lng: 111.17, lat: 35.61, name: '三泉镇卫生院', level: '1A' },
  { lng: 111.16, lat: 35.59, name: '古交镇卫生院', level: '1A' },
  { lng: 111.23, lat: 35.63, name: '泽掌镇卫生院', level: '1A' }
]

// 旅游景点数据
export const scenicPoints = [
  { lng: 111.20, lat: 35.62, name: '绛州大堂', level: '4A' },
  { lng: 111.19, lat: 35.61, name: '龙兴寺', level: '3A' },
  { lng: 111.21, lat: 35.60, name: '钟楼', level: '2A' },
  { lng: 111.18, lat: 35.63, name: '鼓乐广场', level: '3A' },
  { lng: 111.16, lat: 35.58, name: '光村遗址', level: '4A' },
  { lng: 111.22, lat: 35.59, name: '福胜寺', level: '3A' }
]

// 企业数据
export const enterprisePoints = [
  { lng: 111.25, lat: 35.61, name: '新绛煤化园区', type: 'industry' },
  { lng: 111.24, lat: 35.63, name: '化工产业园', type: 'industry' },
  { lng: 111.19, lat: 35.59, name: '农产品加工园', type: 'agriculture' },
  { lng: 111.23, lat: 35.62, name: '装备制造园', type: 'industry' },
  { lng: 111.17, lat: 35.62, name: '建材产业园', type: 'industry' }
]

// 农业示范基地
export const agriculturePoints = [
  { lng: 111.18, lat: 35.59, name: '蔬菜种植基地', type: 'vegetable' },
  { lng: 111.20, lat: 35.58, name: '果树种植园', type: 'fruit' },
  { lng: 111.16, lat: 35.61, name: '养殖示范区', type: 'livestock' },
  { lng: 111.22, lat: 35.60, name: '中药材种植园', type: 'herb' },
  { lng: 111.19, lat: 35.64, name: '粮食高产田', type: 'grain' }
]

// 美丽乡村示范村
export const beautifulVillages = [
  { lng: 111.17, lat: 35.60, name: '光村' },
  { lng: 111.21, lat: 35.59, name: '西庄村' },
  { lng: 111.19, lat: 35.64, name: '北张村' },
  { lng: 111.23, lat: 35.61, name: '桥东村' },
  { lng: 111.15, lat: 35.62, name: '泉掌村' }
]

// 经济数据
export const economicData = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  gdp: [105.2, 112.5, 120.8, 130.2, 141.5, 150.4],
  industry: {
    primary: [18.5, 19.2, 20.5, 21.8, 23.2, 24.5],
    secondary: [52.6, 56.3, 60.4, 65.1, 70.8, 75.2],
    tertiary: [34.1, 37.0, 39.9, 43.3, 47.5, 50.7]
  }
}

// 旅游数据
export const tourismData = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  visitors: [420, 180, 260, 350, 480, 520],
  revenue: [28, 12, 18, 25, 35, 38]
}

// 民生数据
export const livelihoodData = {
  schools: {
    high: 5,
    middle: 18,
    primary: 45,
    kindergarten: 62
  },
  hospitals: {
    level2: 2,
    level1: 15,
    clinics: 186
  },
  socialSecurity: {
    endowment: 185000,
    medical: 320000,
    unemployment: 45000
  }
}
