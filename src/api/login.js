import { get } from '@/utils/request'
export function getGenderList(params) {
  return get('/dict/name/gender', params)
}
