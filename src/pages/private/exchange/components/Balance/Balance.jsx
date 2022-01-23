import React, { useCallback, useEffect, useState } from 'react'
import { formatter } from '../../../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../actions/finance.actions'

// eslint-disable-next-line react/prop-types
const Balance = ({ Balnce }) => {
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
  const optsBTC = { format: '%v %c', code: 'BTC', maxFraction: 4 }
  const [priceValue, setPriceValue] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const estimatedAmount = totalValue / priceValue
  const fee = estimatedAmount * (0.2 / 100)

  // set default prive value
  // when component mounted with useEffect hooks
  useEffect(() => {
    setPriceValue(Balnce)
  }, [Balnce])
  return (
    <div>
      {userInfo && (
        <>
          <div className="line_first">
            <span className="c1">Баланс:</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
            <a
              href="javascript:void(0)"
              className="c2 clBuyBalance"
              onClick={(event) => {
                setTotalValue(event.target.value)
              }}
              value={totalValue}
            >
              <span id="label_buy_balance">
                {formatter
                  .format((userInfo.balance > -1 && userInfo.balance) || 0.0)
                  .replace('₽', 'BTC')}
              </span>{' '}
            </a>
            <br />
          </div>
        </>
      )}
    </div>
  )
}
export default Balance
