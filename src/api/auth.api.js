import { createFormDataObj } from '../utils'
import { baseInstance } from './index'

export const signUp = (userInfo) =>
  baseInstance({
    url: '/api/v1/registration',
    method: 'post',
    data: userInfo,
  })

export const signIn = (credentials) =>
  baseInstance({
    url: '/api/v1/oauth/v2/token',
    method: 'post',
    data: createFormDataObj({ ...credentials, grant_type: 'password' }),
  })

export const inviter = (params) => baseInstance({ url: '/api/v1/inviter', method: 'get', params })
