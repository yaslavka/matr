/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../../actions/finance.actions'
import { formatter } from '../../../../../../../utils'

// eslint-disable-next-line react/prop-types
const PlayerCredits = ({ credits }) => {
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

  // return player credits
  return (
    <div className="col-12 col-lg-6 col-lx-6">
      {userInfo && (
        <div className="credit-display">
          {' '}
          {formatter.format((userInfo.balance > -1 && userInfo.balance) || 0).replace('₽', 'RU')}
        </div>
      )}
    </div>
  )
}

export default PlayerCredits
