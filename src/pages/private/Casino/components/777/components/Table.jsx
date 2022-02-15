import React from 'react'

import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'slots', headerName: 'Slots', width: 200 },
  { field: 'date', headerName: 'Date', width: 200 },
]

// const rows = [
//   { id: 1, slots: 'Snow', date: 'Jon'},
//   { id: 2, slots: 'Lannister', date: 'Cersei'},
//   { id: 3, slots: 'Lannister', date: 'Jaime'},
//   { id: 4, slots: 'Stark', date: 'Arya'},
//   { id: 5, slots: 'Targaryen', date: 'Daenerys'},
//   { id: 6, slots: 'Melisandre', date: null},
//   { id: 7, slots: 'Clifford', date: 'Ferrara'},
//   { id: 8, slots: 'Frances', date: 'Rossini'},
//   { id: 9, slots: 'Roxie', date: 'Harvey'},
// ];

const Table = (props) => {
  return (
    <div style={{ height: 350, width: '100%', textAlign: 'center', color: 'red' }}>
      {/* eslint-disable-next-line react/prop-types */}
      <DataGrid rows={props.rows} columns={columns} pageSize={10} />
    </div>
  )
}

export default Table
