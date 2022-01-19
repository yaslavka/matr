import { baseInstance } from './index'

export const matrixQueue = (params) =>
  baseInstance({ url: '/matrix/get-matrix-queue', method: 'get', params })
