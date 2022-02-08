import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { store } from '../context'
import useSound from 'use-sound'
import startSound from '../sounds/start.mp3'
import winSound from '../sounds/win.mp3'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '24px',
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  slot: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '20vh',
    padding: '1vh 0',
    fontSize: '120px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  row: {
    width: '100%', // Fix IE 11 issue.
  },
  title: {
    margin: theme.spacing(2),
  },
}))

export default function ModalLogin(props) {
  const classes = useStyles()
  const datos = useContext(store)
  const [slot, setSlot] = useState([1, 2, 3])
  const [playStart] = useSound(startSound)
  const [playWin] = useSound(winSound)

  const handleClose = () => {
    // eslint-disable-next-line react/prop-types
    props.handleClose()
  }

  const getNumber = () => Math.floor(Math.random() * (9 - 1 + 1) + 1)

  const handlePlay = () => {
    playStart()
    const newSlots = [getNumber(), getNumber(), getNumber()]
    processGame(newSlots)
  }

  const handleDebug = () => {
    playStart()
    const newSlots = [7, 7, 7]
    processGame(newSlots)
  }

  const processGame = (slots) => {
    if (datos.state) {
      if (datos.state.balance >= 1) {
        console.log('Estoy con BALANCE')

        setSlot(slots)

        let earnings = 0

        if (slots[0] === 7 && slots[1] === 7 && slots[2] === 7) {
          earnings = 10
        }

        if (slots[0] === slots[1] && slots[1] === slots[2] && earnings === 0) {
          earnings = 5
        }

        if ((slots[0] === slots[1] || slots[1] === slots[2]) && earnings === 0) {
          earnings = 0.5
        }

        if (earnings > 0) playWin()

        registerGame(slots, earnings)
      }
    }
  }

  const registerGame = (slots, earnings) => {
    //console.log("Game: ", slots, earnings);
    if (datos.state) {
      const newBalance = datos.state.balance - 1 + earnings
      datos.addGame({ slots: slots, earnings: earnings, balance: newBalance })
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      /* eslint-disable-next-line react/prop-types */
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      <Fade in={props.open}>
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Game
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.slot}>
                  {slot[0]}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.slot}>
                  {slot[1]}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.slot}>
                  {slot[2]}
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handlePlay}
                >
                  Play
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleDebug}
                >
                  Debug
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Fade>
    </Modal>
  )
}
