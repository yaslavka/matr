import axios from 'axios'
import Raven from 'raven-js'
import { getAccessToken, createFormDataObj } from '../utils'
import * as actions from '../actions/auth.actions'
import { store } from '../index'

export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

baseInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Raven.captureException(error)
    return Promise.reject(error)
  },
)

baseInstance.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    Raven.captureException(error)
    if (error?.response?.status === 401) {
      const timer = localStorage.getItem('w')
      localStorage.clear()
      localStorage.setItem('w', timer)

      store.dispatch(actions.signOut())
    } else if (error?.response) {
      // Global path to error message
      throw new Error(error?.response?.data?.message)
    } else {
      throw new Error(error?.message)
    }
  },
)

export const api = {
  // Auth
  createClient() {
    return baseInstance.get('/api/v1/create-client')
  },
  signIn(credentials) {
    return baseInstance.post(
      '/api/v1/oauth/v2/token',
      createFormDataObj({ ...credentials, grant_type: 'password' }),
    )
  },
  signUp(userInfo) {
    return baseInstance.post('/registration', userInfo)
  },
  resetPassword(email) {
    return baseInstance.post('/registration/restore-password', { email })
  },
  // User
  getUserInfo() {
    return baseInstance.get('/api/v1/user')
  },

  searchUserByLogin({ user_name, matrix_type }) {
    return baseInstance.get(`/api/v1/user/find?user_name=${user_name}&matrix_type=${matrix_type}`)
  },
  // Matrices
  getMatrixTypes() {
    return baseInstance.get('/api/v1/matrix/type')
  },
  getMatrixCloneStatTypes() {
    return baseInstance.get('/api/v1/matrix/clone-stat')
  },
  getMatrixStructureByType(type) {
    return baseInstance.get(`/api/v1/matrix/structure?matrix_type=${type}`)
  },
  getMatrixStructureById(id) {
    return baseInstance.get(`/api/v1/matrix/structure?matrix_id=${id}`)
  },
  buyMatrix(matrix_id) {
    return baseInstance.post('/api/v1/matrix/buy', { matrix_id })
  },
  getMatrixListForInstall(matrix_type) {
    return baseInstance.get(`/api/v1/matrix/for-install?matrix_type=${matrix_type}`)
  },
  installMatrix(matrixInfo) {
    return baseInstance.post('/api/v1/matrix/install', matrixInfo)
  },
  getMatrixClonesCout(matrix_type) {
    return baseInstance.get(`/api/v1/matrix/clone?matrix_type=${matrix_type}`)
  },
  arrangeMatrixClones(matrixClonesInfo) {
    return baseInstance.post('/api/v1/matrix/install-clone', matrixClonesInfo)
  },
  getNeighboringMatrices(matrixType) {
    return baseInstance.get(`/api/v1/matrix/dash-info?matrix_type=${matrixType}`)
  },
  setClone(matrixInfo) {
    return baseInstance.post('/api/v1/matrix/target-install-clone', matrixInfo)
  },
  // Auto matrices
  getAutoMatrixTypes() {
    return baseInstance.get('/api/v1/matrix/auto/type')
  },
  getAutoMatrixStructureByType(type) {
    return baseInstance.get(`/api/v1/matrix/auto/structure?matrix_type=${type}`)
  },
  getAutoMatrixStructureById(id) {
    return baseInstance.get(`/api/v1/matrix/auto/structure?matrix_id=${id}`)
  },
  buyAutoMatrix(matrix_id) {
    return baseInstance.post('/api/v1/matrix/auto/buy', { matrix_id })
  },
  getAutoMatrixListForInstall(matrix_type) {
    return baseInstance.get(`/api/v1/matrix/auto/for-install?matrix_type=${matrix_type}`)
  },
  installAutoMatrix(matrixInfo) {
    return baseInstance.post('/api/v1/matrix/auto/install', matrixInfo)
  },
  getAutoMatrixClonesCout(matrix_type) {
    return baseInstance.get(`/api/v1/matrix/auto/clone?matrix_type=${matrix_type}`)
  },
  arrangeAutoMatrixClones(matrixClonesInfo) {
    return baseInstance.post('/api/v1/matrix/auto/install-clone', matrixClonesInfo)
  },
  getNeighboringAutoMatrices(matrixType) {
    return baseInstance.get(`/api/v1/matrix/auto/dash-info?matrix_type=${matrixType}`)
  },
  setAutoClone(matrixInfo) {
    return baseInstance.post('/api/v1/matrix/auto/target-install-clone', matrixInfo)
  },
  getUpperAutoStructureById(matrixId) {
    return baseInstance.get(`/api/v1/matrix/auto/structure-upper?matrix_id=${matrixId}`)
  },
  // Wallet
  getTransactionsHistory({ limit, offset }) {
    return baseInstance.get(`/api/v1/wallet/transactions?limit=${limit}&offset=${offset}`)
  },
  createWithdraw(withdrawInfo) {
    return baseInstance.post('/api/v1/wallet/create-withdraw', withdrawInfo)
  },
  createPay(payInfo) {
    return baseInstance.post('/api/v1/wallet/create-pay', payInfo)
  },
  createPayeerPay(payInfo) {
    return baseInstance.post('/api/v1/wallet/create-payeer-pay', payInfo)
  },
  getUpperStructureById(matrixId) {
    return baseInstance.get(`/api/v1/matrix/structure-upper?matrix_id=${matrixId}`)
  },
  // School
  getComments() {
    return baseInstance.get('/api/v1/school/comments')
  },
  createRequestToSchool(data) {
    return baseInstance.post('/api/v1/school/create', data)
  },
  createComment(text) {
    return baseInstance.post('/api/v1/school/create-comment', { text })
  },
  //Landing
  getLandingInfo() {
    return baseInstance.post('/landing-info')
  },
  // News
  getNewsList({ limit, offset }) {
    return baseInstance.get(`/api/v1/news/get?offset=${offset}&limit=${limit}`)
  },
  getNewsById(id) {
    return baseInstance.get(`/api/v1/news/get-one?news_id=${id}`)
  },

  /* SUPER STARS */
  ssBuyMatrix(matrix_id) {
    return baseInstance.post('/api/v1/matrix/super/buy', { matrix_id })
  },
  ssMatrixTypes() {
    return baseInstance.get('/api/v1/matrix/super/type')
  },
  ssMatrixClones(matrix_type) {
    return baseInstance.get(`/api/v1/matrix/super/clone?matrix_type=${matrix_type}`)
  },
  ssMatrixStructureByType(type) {
    return baseInstance.get(`/api/v1/matrix/super/structure?matrix_type=${type}`)
  },
  ssMatrixStructureById(id) {
    return baseInstance.get(`/api/v1/matrix/super/structure?matrix_id=${id}`)
  },
  ssInstallMatrixClones(matrixClonesInfo) {
    return baseInstance.post('/api/v1/matrix/super/install-clone', matrixClonesInfo)
  },
  ssBuyMatrixClones(matrixClonesInfo) {
    return baseInstance.post('/api/v1/matrix/super/buy-comet', matrixClonesInfo)
  },
  ssNeighboringMatrices(matrixType) {
    return baseInstance.get(`/api/v1/matrix/super/dash-info?matrix_type=${matrixType}`)
  },
}
