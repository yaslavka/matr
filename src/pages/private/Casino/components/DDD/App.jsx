import React, { useCallback, useState } from 'react'
import { Content } from './components/Content/Content'
import './App.scss'
import { formatter } from '../../../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../actions/finance.actions'

const Appl = () => {
  const dispatch = useDispatch()
  const [isOperationsHistoryModalVisible, setIsOperationsHistoryModalVisible] = useState(false)
  const userInfo = useSelector((state) => state.app.user)

  const handleVisibleTransferMoneyModal = useCallback(() => {
    dispatch(actions.toggleTransferMoneyModal(true))
  }, [dispatch])

  const openOperationsHistoryModal = () => {
    document.body.style.overflow = 'hidden'
    setIsOperationsHistoryModalVisible(true)
  }

  const closeOperationsHistoryModal = () => {
    document.body.style.overflow = 'initial'
    setIsOperationsHistoryModalVisible(false)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [nameQuery, setNameQuery] = useState('')
  const [userName, setUserName] = useState('')
  const [isNameCorrect, setIsNameCorrect] = useState(false)

  let user = {}

  const [balance, setBalance] = useState(
    formatter.format((userInfo.balance > -1 && userInfo.balance) || 0).replace('₽', 'RUB'),
  )

  localStorage.setItem(
    `${userName}`,
    JSON.stringify({
      name: userName,
      balance,
    }),
  )

  user = JSON.parse(localStorage[`${userName}`])

  const [scoresList, setScoresList] = useState([
    {
      id: 0,
      record: ['?', '?', '?'],
      time: new Date().toLocaleTimeString(),
    },
  ])
  const spinCost = 1

  const handleInputChange = (e) => {
    const { value } = e.target

    if (value.length > 3) {
      setIsNameCorrect(true)
    } else {
      setIsNameCorrect(false)
    }

    setNameQuery(value)
  }

  const handleSubmit = () => {
    if (nameQuery.length > 3) {
      setIsLoggedIn(!isLoggedIn)
    }

    setUserName(nameQuery)
    setBalance(JSON.parse(localStorage[`${userName}`]).balance)
    localStorage.setItem(
      `${nameQuery}`,
      JSON.stringify({
        name: nameQuery,
        balance,
      }),
    )

    setNameQuery('')
  }

  return (
    <div className="App">
      <>
        <Content
          setScoresList={setScoresList}
          scoresList={scoresList}
          balance={balance}
          setBalance={setBalance}
          spinCost={spinCost}
          setIsGuest={setIsGuest}
          isGuest={isGuest}
          userName={userName}
        />
      </>
    </div>
  )
}
export default Appl
