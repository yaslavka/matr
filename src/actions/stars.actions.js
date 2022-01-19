import * as ActionTypes from '../constants/stars.constants'

/* Stars Matrix Queue */
export const matrixQueue = (matrixType, filter) => ({
  type: ActionTypes.MATRIX_QUEUE_REQUEST,
  payload: { matrixType, filter },
})
export const matrixQueueSuccess = (planets) => ({
  type: ActionTypes.MATRIX_QUEUE_SUCCESS,
  payload: planets,
})
export const matrixQueueError = (error) => ({
  type: ActionTypes.MATRIX_QUEUE_ERROR,
  payload: error,
})

export const setMatrixQueuePage = (page, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_PAGE,
  payload: { page, matrixType },
})
export const setMatrixQueueLine = (line, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_LINE,
  payload: { line, matrixType },
})
export const setMatrixQueueSearch = (name, matrixType) => ({
  type: ActionTypes.SET_MATRIX_QUEUE_SEARCH,
  payload: { name, matrixType },
})
