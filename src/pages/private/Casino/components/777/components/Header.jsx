import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../img/logo.png'
import CasinoContext from './context/CasinoContext'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: theme.spacing(2),
  },
  button: {
    position: 'relative',
  },
}))

const Header = () => {
  const classes = useStyles()

  const casinoContext = useContext(CasinoContext)
  const { money, logged, setLogin } = casinoContext

  const [auth, setAuth] = useState(false)

  const login = () => {
    let x = prompt('Put your name')
    if (x !== null) {
      setLogin(true)
    }
  }

  const logout = () => {
    setLogin(false)
  }

  useEffect(() => {
    setAuth(logged)
  }, [logged])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="" className={classes.menuButton} />
          <Typography variant="h5" className={classes.logo}>
            Logo
          </Typography>
          <Typography variant="h5" className={classes.title}></Typography>
          <Typography variant="h6" className={classes.button}>
            ${money.toFixed(2)}
          </Typography>
          {auth ? (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => login()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
