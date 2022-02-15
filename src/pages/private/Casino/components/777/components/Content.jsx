import { Button } from '@material-ui/core'

import React, { useContext, useState } from 'react'
import CasinoContext from './context/CasinoContext'
import Popup from './Popup'
import Table from './Table'

const Content = () => {
  // const classes = useStyles();

  const casinoContext = useContext(CasinoContext)
  const { restBalance, sumBalance } = casinoContext

  const [rows, setRows] = useState([{ id: 1, slots: [1, 4, 5], date: new Date().toDateString() }])

  const [winner, setWinner] = useState(false)

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const [open, setOpen] = useState(false)

  const [keys, setKeys] = useState({
    s1: 1,
    s2: 4,
    s3: 5,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  var s1
  var s2
  var s3
  const updateNumber = (number1, number2, number3) => {
    restBalance(-1)
    const val = rows[rows.length - 1]
    console.log(val)

    if (number1 && number2 && number3) {
      s1 = number1
      s2 = number2
      s3 = number3
      updateWinner(s1, s2, s3)
    } else {
      s1 = numbers[Math.floor(Math.random() * numbers.length)]
      s2 = numbers[Math.floor(Math.random() * numbers.length)]
      s3 = numbers[Math.floor(Math.random() * numbers.length)]
      updateWinner(s1, s2, s3)
    }
    setRows([
      ...rows,
      {
        id: val.id + 1,
        slots: [s1, s2, s3],
        date: new Date().toDateString(),
      },
    ])
    setKeys({ s1, s2, s3 })
  }

  const updateWinner = (s1, s2, s3) => {
    if (s1 === s2 && s1 === s3) {
      if (s1 === 7 && s2 === 7 && s3 === 7) {
        sumBalance(10)
        return setWinner(true)
      } else {
        sumBalance(5)
        return setWinner(true)
      }
    } else if (s1 === s2 || s2 === s3) {
      sumBalance(0.5)
      return setWinner(true)
    } else {
      return setWinner(false)
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ fontSize: '25px' }}
      >
        Start Playing
      </Button>

      <Popup
        open={open}
        handleClose={handleClose}
        updateNumber={updateNumber}
        s1={keys.s1}
        s2={keys.s2}
        s3={keys.s3}
        winner={winner}
      />

      <Table rows={rows} />
      {/* <Machine s1={keys.s1}
            s2={keys.s2}
            s3={keys.s3} /> */}
    </>
  )
}

export default Content
