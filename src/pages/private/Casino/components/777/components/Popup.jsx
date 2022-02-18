import React from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Machine from './Machine'

const Popup = (props) => {
  return (
    <>
      <Dialog
        /* eslint-disable-next-line react/prop-types */
        open={props.open}
        /* eslint-disable-next-line react/prop-types */
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title" style={{ fontSize: '34px' }}>
          {/* eslint-disable-next-line react/prop-types */}
          {props.winner ? 'Winner' : 'Loser'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Machine
            /* eslint-disable-next-line react/prop-types */
            s1={props.s1}
            /* eslint-disable-next-line react/prop-types */
            s2={props.s2}
            /* eslint-disable-next-line react/prop-types */
            s3={props.s3}
            /* eslint-disable-next-line react/prop-types */
            handleClose={props.handleClose}
            /* eslint-disable-next-line react/prop-types */
            updateNumber={props.updateNumber}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Popup
