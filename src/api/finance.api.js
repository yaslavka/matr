import { baseInstance } from './index'

export const transferMoneyToUser = (data) =>
  baseInstance({ url: '/api/v1/wallet/transfer', method: 'post', data })
