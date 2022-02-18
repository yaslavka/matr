import React, { useEffect, useReducer } from 'react'
import CasinoContext from './CasinoContext'
import CasinoReducer from './CasinoReducer'
import { UPDATE_BALANCE, LOGIN } from '../../types/types'

const CasinoState = (props) => {
  const storage = localStorage.getItem('money') ? JSON.parse(localStorage.getItem('money')) : 99.99
  const loggedStorage = localStorage.getItem('login')
    ? JSON.parse(localStorage.getItem('login'))
    : false

  const initialState = {
    logged: loggedStorage,
    money: storage,
    status: false,
  }

  const [state, dispatch] = useReducer(CasinoReducer, initialState)

  const sumBalance = (number) => {
    dispatch({
      type: UPDATE_BALANCE,
      payload: number,
    })
  }

  const restBalance = (number) => {
    dispatch({
      type: UPDATE_BALANCE,
      payload: number,
    })
  }

  const showLogin = () => {
    return !state.status
  }

  const setLogin = (status) => {
    dispatch({
      type: LOGIN,
      payload: status,
    })
  }

  useEffect(() => {
    localStorage.setItem('money', state.money)
    localStorage.setItem('login', state.logged)
  }, [state.money, state.logged])

  return (
    <CasinoContext.Provider
      value={{
        logged: state.logged,
        money: state.money,
        status: state.status,
        restBalance,
        sumBalance,
        showLogin,
        setLogin,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </CasinoContext.Provider>
  )
}

export default CasinoState
