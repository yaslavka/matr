import { baseInstance } from './index'

export const getNewsList = (params) =>
  baseInstance({ url: '/api/v1/news/get', method: 'get', params })

export const getNewsId = (id) =>
  baseInstance({
    url: `/api/v1/news/get-one`,
    method: 'get',
    params: { news_id: id },
  })

export const getNewsBlock = () => baseInstance({ url: `/api/v1/news/get-block`, method: 'get' })
