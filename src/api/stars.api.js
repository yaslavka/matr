import { baseInstance } from './index'

export const matrixQueue = (params) =>
  baseInstance({ url: '/api/v1/matrix/get-matrix-queue', method: 'get', params })
