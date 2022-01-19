import { baseInstance } from './index'

export const userInfo = () => baseInstance({ url: '/api/v1/user', method: 'get' })

export const changeUserInfo = (data) =>
  baseInstance({ url: '/api/v1/user/fio', method: 'post', data })

export const changePassword = (data) =>
  baseInstance({ url: '/api/v1/user/password', method: 'post', data })

export const changeFinancePassword = (data) =>
  baseInstance({ url: '/api/settings/fin-password', method: 'post', data })

export const changeSocial = (data) =>
  baseInstance({ url: '/api/v1/user/links', method: 'post', data })

export const changeDescription = (data) =>
  baseInstance({ url: '/api/v1/user/description', method: 'post', data })

export const changeAutoRefillPlanets = (data) =>
  baseInstance({ url: '/api/star-trek/auto-update', method: 'post', data })

export const uploadImageToTelegram = (blobImage) => {
  const formData = new FormData()
  formData.append('file', blobImage)
  return baseInstance({
    url: '/api/v1/user/to-telegram',
    method: 'post',
    data: formData,
  })
}
