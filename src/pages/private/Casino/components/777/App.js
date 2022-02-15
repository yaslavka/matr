import './App.css'
import React from 'react'
import Content from './components/Content'
import { makeStyles } from '@material-ui/core'
import CasinoState from './components/context/CasinoState'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}))

function Appgh() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CasinoState>
        <Content />
      </CasinoState>
    </div>
  )
}

export default Appgh
