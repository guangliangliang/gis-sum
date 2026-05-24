
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取转换后的数据
const convertedData = fs.readFileSync(path.join(__dirname, 'converted-data.js'), 'utf-8')

// 提取 schoolPoints 和 hospitalPoints
let schoolPointsStr = ''
let hospitalPointsStr = ''

const schoolMatch = convertedData.match(/export const schoolPoints = \[([\s\S]*?)\]\s*\n\s*export/s)
if (schoolMatch) {
  schoolPointsStr = 'export const schoolPoints = [' + schoolMatch[1] + ']'
}

const hospitalMatch = convertedData.match(/export const hospitalPoints = \[([\s\S]*?)\]\s*$/s)
if (hospitalMatch) {
  hospitalPointsStr = 'export const hospitalPoints = [' + hospitalMatch[1] + ']'
}

// 读取原始 mockData.js
const mockDataPath = path.join(__dirname, '../src/views/xinjiang-dashboard/core/mockData.js')
let mockData = fs.readFileSync(mockDataPath, 'utf-8')

// 替换 schoolPoints
mockData = mockData.replace(/\/\/ 学校点位数据\s*export const schoolPoints = \[[\s\S]*?\]\s*(?=\/\/ 医院点位数据)/s,
  '// 学校点位数据\n' + schoolPointsStr + '\n')

// 替换 hospitalPoints
mockData = mockData.replace(/\/\/ 医院点位数据\s*export const hospitalPoints = \[[\s\S]*?\]\s*(?=\/\/ 旅游景点数据)/s,
  '// 医院点位数据\n' + hospitalPointsStr + '\n')

// 写入更新后的数据
fs.writeFileSync(mockDataPath, mockData, 'utf-8')

console.log('mockData.js 更新成功！')
console.log('学校数据量: ' + (schoolPointsStr.match(/\{/g) || []).length)
console.log('医院数据量: ' + (hospitalPointsStr.match(/\{/g) || []).length)
