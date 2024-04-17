// ** React Imports
import { useState, useEffect} from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import axios from 'axios'


const columns = [
  { id: 'activity_id', label: 'Activity ID', minWidth: 170 },
  { id: 'house_id', label: 'House ID', minWidth: 100 },
  {
    id: 'time',
    label: 'Time',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'device',
    label: 'Device',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'type_of_event',
    label: 'Type Of Event',
    minWidth: 170,
    align: 'right',
  }
]


const ActLogTable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch(
      'https://hgs-backend.onrender.com/users/getActivityLog?house_id=1',
      { method: 'GET', headers: {
         'Content-Type': 'application/json',
         Authorization: localStorage.getItem('SavedToken')
        }
      }

    )
      .then(response => response.json())
      .then(data => setRows(data)) // Update rows state with fetched data
      .catch(error => console.error('Error:', error))
  }, []) // Empty dependency array means this effect runs once on mount

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ActLogTable
