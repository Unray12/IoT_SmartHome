import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel'; // Import for sortable columns
import { format } from 'date-fns'; // Import the format function

import axios from 'axios';

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
  },
];

const ActLogTable = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch data
  useEffect(() => {
    axios
      .get('https://hgs-backend.onrender.com/users/getActivityLog?house_id=1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('SavedToken'),
        },
      })
      .then((response) => setRows(response.data)) // Update rows state with fetched data
      .catch((error) => console.error('Error:', error));
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle sorting
  const handleSort = (columnId) => {
    const isAsc = sortConfig.key === columnId && sortConfig.direction === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    setSortConfig({ key: columnId, direction: newDirection });
  };

  // Apply sorting to rows
  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key === null) return 0; // No sorting

    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    const compareResult =
      typeof valueA === 'number' ? valueA - valueB : String(valueA).localeCompare(String(valueB));

    return sortConfig.direction === 'asc' ? compareResult : -compareResult;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                  onClick={() => handleSort(column.id)}
                >
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={sortConfig.direction}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isLastRow = index === rowsPerPage - 1;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.activity_id}
                    sx={{
                      borderBottom: isLastRow ? 'none' : '2px solid #d0d0d0', // distinct border
                    }}
                  >
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'time') {
                        value = format(new Date(value), 'dd-MM-yyyy HH:mm'); // formatted date
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ActLogTable;
