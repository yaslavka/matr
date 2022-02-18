import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

/*
const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    padding: theme.spacing(1, 2),
    marginTop: "auto",
  },
}));
*/

const useStyles = makeStyles((theme) => ({
  foot: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    marginTop: 'auto',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6" color="textSecondary" align="center" className={classes.foot}>
              {'Copyright © '}
              <Link color="inherit" href="#">
                &nbsp;Paktolus Casino&nbsp;
              </Link>

              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </footer>
  )
}
