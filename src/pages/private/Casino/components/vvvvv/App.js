import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import SlotMachine from './container/SlotMachine'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import StickyFooter from './container/Footer'
import CustomizedTables from './Tabel'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ArrowLeft } from '@material-ui/icons'

function FormDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="white" onClick={handleClickOpen}>
        LOGIN
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(0),
  },
  logo: {
    width: 135,

    height: 43.54,
  },
}))

const Page = styled.div`
  width: 100%;
  margin: 10px auto;
  text-align: center;
`

const Appzx = (props) => (
  <Page>
    <SlotMachine />
    <Typography component="h1" variant="h5">
      Game Results
    </Typography>
    <CustomizedTables />
  </Page>
)

export default Appzx
