
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schoolData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/json/school.json'), 'utf-8'))
const hospitalData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/json/hospital.json'), 'utf-8'))

function getSchoolType(typecode) {
  const typeMap = {
    '141200': 'school',
    '141201': 'kindergarten',
    '141202': 'middle',
    '141203': 'primary',
    '141206': 'vocational'
  }
  
  const codes = typecode.split('|')
  for (const code of codes) {
    if (typeMap[code]) return typeMap[code]
  }
  return 'school'
}

function getHospitalLevel(typecode, keytag) {
  if (typecode.includes('090100') || (keytag && keytag.includes('综合医院'))) return '综合医院'
  if (typecode.includes('090102') || (keytag && keytag.includes('卫生院'))) return '卫生院'
  if (typecode.includes('090300') || (keytag && keytag.includes('诊所'))) return '诊所'
  return '医疗机构'
}

function getOpenTime(bizExt) {
  if (!bizExt) return '-'
  if (bizExt.opentime2 && bizExt.opentime2.length > 0) return bizExt.opentime2
  if (bizExt.open_time && bizExt.open_time.length > 0) return bizExt.open_time
  return '-'
}

function isEmptyValue(val) {
  if (val === null || val === undefined) return true
  if (Array.isArray(val) && val.length === 0) return true
  if (typeof val === 'string' && val.trim() === '') return true
  return false
}

const schoolPoints = schoolData.pois.map(poi => {
  const [lng, lat] = poi.location.split(',').map(Number)
  return {
    name: poi.name,
    lng,
    lat,
    type: getSchoolType(poi.typecode),
    address: isEmptyValue(poi.address) ? '-' : poi.address,
    tel: isEmptyValue(poi.tel) ? '-' : poi.tel,
    keytag: isEmptyValue(poi.keytag) ? '-' : poi.keytag,
    photos: poi.photos && poi.photos.length > 0 ? poi.photos.map(p => p.url) : []
  }
})

const hospitalPoints = hospitalData.pois.map(poi => {
  const [lng, lat] = poi.location.split(',').map(Number)
  return {
    name: poi.name,
    lng,
    lat,
    level: getHospitalLevel(poi.typecode, poi.keytag),
    address: isEmptyValue(poi.address) ? '-' : poi.address,
    tel: isEmptyValue(poi.tel) ? '-' : poi.tel,
    openTime: getOpenTime(poi.biz_ext),
    photos: poi.photos && poi.photos.length > 0 ? poi.photos.map(p => p.url) : []
  }
})

console.log('Data conversion complete!')
console.log(`Schools: ${schoolPoints.length}`)
console.log(`Hospitals: ${hospitalPoints.length}`)

const output = `
// Converted school and hospital data
// Generated: ${new Date().toISOString()}

export const schoolPoints = ${JSON.stringify(schoolPoints, null, 2)}

export const hospitalPoints = ${JSON.stringify(hospitalPoints, null, 2)}
`

fs.writeFileSync(path.join(__dirname, 'converted-data.js'), output, 'utf-8')
console.log('Saved to scripts/converted-data.js')

