import { baseInstance } from './index'

export const startrekStatistics = () =>
  baseInstance({ url: '/api/v1/star-trek/statistic', method: 'get' })

export const startrekStatistic = () =>
  baseInstance({ url: '/api/v1/star-trek/table', method: 'get' })

export const startrekBuy = () => baseInstance({ url: '/api/v1/star-trek/buy', method: 'post' })

export const startrekPlanets = (params) =>
  baseInstance({ url: '/api/v1/star-trek/list', method: 'get', params })

export const startrekPlanetsUpdate = (planets) =>
  baseInstance({
    url: '/api/v1/star-trek/update',
    method: 'post',
    data: { planets },
  })
