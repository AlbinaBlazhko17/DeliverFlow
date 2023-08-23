import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect, useState } from 'react';

function RequestsPage() {
  const [requests, setRequests] = useState({});
  const storeData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = Number(localStorage.key(i));
    if (!isNaN(key)) {
      const value = JSON.parse(localStorage.getItem(key));
      storeData[key] = value;
    }
  }

  useEffect(() => {
    if (!(Object.keys(storeData).length === 0)) {
      setRequests(storeData);
    }
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{
          display: { xs: 'none', sm: 'block' }, textAlign: 'center', color: '#5e5e5e', marginBottom: '50px',
        }}
      >
        List of requests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number:</TableCell>
              <TableCell>City from:</TableCell>
              <TableCell align="right">City to:</TableCell>
              <TableCell align="right">Type of parcel:</TableCell>
              <TableCell align="right">Date of dispatch:</TableCell>
              <TableCell align="right">Parcel description:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(requests).map((key) => {
              const nestedItem = requests[key];
              return (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell align="right">{nestedItem.cityFrom}</TableCell>
                  <TableCell align="right">{nestedItem.cityTo}</TableCell>
                  <TableCell align="right">{nestedItem.typeOfParcel || ' ' }</TableCell>
                  <TableCell align="right">{nestedItem.date}</TableCell>
                  <TableCell align="right">{nestedItem.description || ' '}</TableCell>
                  <TableCell align="right">
                    {' '}
                    <Button className="button button-table" variant="contained">Update</Button>
                  </TableCell>
                  <TableCell align="right">
                    {' '}
                    <Button className="button button-table" variant="contained">Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RequestsPage;
