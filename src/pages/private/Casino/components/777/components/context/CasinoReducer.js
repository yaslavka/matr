import { UPDATE_BALANCE, LOGIN } from '../../types/types'

const CasinoReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BALANCE:
      return {
        ...state,
        money: state.money + action.payload,
      }
    case LOGIN:
      return {
        ...state,
        logged: action.payload,
      }
    default:
      return state
  }
}

export default CasinoReducer
