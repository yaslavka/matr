import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

function createData(name, slot1, slot2, slot3, time) {
  return { name, slot1, slot2, slot3, time }
}

const rows = [
  createData('Player1', 1, 6, 4, 4.0),
  createData('Player2', 2, 9, 3, 4.3),
  createData('Player3', 7, 7, 2, 6.0),
  createData('Player4', 5, 3, 6, 4.3),
  createData('Player5', 3, 1, 4, 3.9),
]

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const Title = styled.h1

const CustomizedTables = () => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Slot 1</StyledTableCell>
            <StyledTableCell align="right">Slot 2</StyledTableCell>
            <StyledTableCell align="right">Slot 3</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.slot1}</StyledTableCell>
              <StyledTableCell align="right">{row.slot2}</StyledTableCell>
              <StyledTableCell align="right">{row.slot3}</StyledTableCell>
              <StyledTableCell align="right">{row.slot4}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomizedTables
