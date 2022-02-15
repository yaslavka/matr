import { Button, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const Machine = (props) => {
  const useStyles = makeStyles((theme) => ({
    papers: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }))

  // eslint-disable-next-line react/prop-types
  const { s1, s2, s3 } = props
  // // var isLucky = false;

  // // if(s1 === s2 && s1 === s3){
  // //     isLucky = true;
  // // } else if (s1 === s2 || s2 === s3){
  // //     isLucky = true;
  // // } else {
  // //     isLucky = false
  // // }

  const classes = useStyles()

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div className={classes.papers}>
          <Paper elevation={4} style={{ fontSize: '90px' }}>
            {s1}{' '}
          </Paper>
          <Paper elevation={4} style={{ fontSize: '90px' }}>
            {s2}
          </Paper>
          <Paper elevation={4} style={{ fontSize: '90px' }}>
            {s3}
          </Paper>
        </div>
        <div className={classes.papers}>
          {/* eslint-disable-next-line react/prop-types */}
          <Button style={{ fontSize: '18px' }} onClick={() => props.updateNumber()}>
            Start
          </Button>
          {/* eslint-disable-next-line react/prop-types */}
          <Button style={{ fontSize: '18px' }} onClick={() => props.updateNumber(7, 7, 7)}>
            Debug
          </Button>
          {/* eslint-disable-next-line react/prop-types */}
          <Button style={{ fontSize: '18px' }} onClick={() => props.handleClose()}>
            Close
          </Button>
        </div>
      </div>
    </>
  )
}

export default Machine
