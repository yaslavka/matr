import { baseInstance } from './index'

export const getSuperStarQueue = (params) =>
  baseInstance({ url: '/api/v1/matrix/super/queue', method: 'get', params })
