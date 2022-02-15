import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#3f51b5',
    color: 'white',
    textAlign: 'center',
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">My sticky footer can be found here.</Typography>
        <Typography variant="body2">
          {'Copyright © '}
          This page {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
