import React, { createContext, useReducer } from 'react'

const initialState = {
  isLogged: false,
  username: '',
  balance: 100,
  rows: [],
}

const store = createContext(initialState)
const { Provider } = store

// eslint-disable-next-line react/prop-types
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_AUTH':
        return {
          ...state,
          isLogged: action.payload.isLogged,
          username: action.payload.username,
        }
      case 'ADD_GAME':
        return {
          ...state,
          balance: action.payload.balance,
          rows: [
            ...state.rows,
            {
              id: state.rows.length,
              slots: action.payload.slots,
              earnings: action.payload.earnings,
              balance: action.payload.balance,
              timestamp: Date.now(),
            },
          ],
        }
      case 'RESTORE_DATA':
        return {
          ...state,
          ...action.payload,
        }
      default:
        throw new Error()
    }
  }, initialState)

  const updateAuth = (data) => {
    localStorage.setItem('paktolusCasino', JSON.stringify({ ...data, balance: state.balance }))
    dispatch({ type: 'UPDATE_AUTH', payload: data })
  }

  const addGame = (data) => {
    localStorage.setItem(
      'paktolusCasino',
      JSON.stringify({
        isLogged: state.isLogged,
        username: state.username,
        balance: data.balance,
      }),
    )
    dispatch({ type: 'ADD_GAME', payload: data })
  }

  const restoreData = (data) => {
    dispatch({ type: 'RESTORE_DATA', payload: data })
  }

  return (
    <Provider
      value={{
        state,
        dispatch,
        updateAuth: (data) => updateAuth(data),
        addGame: (data) => addGame(data),
        restoreData: (data) => restoreData(data),
      }}
    >
      {children}
    </Provider>
  )
}

export { store, StateProvider }
