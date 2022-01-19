import { baseInstance } from './index'

export const getUserStructure = (params) =>
  baseInstance({ url: '/api/v1/structure', method: 'get', params })
