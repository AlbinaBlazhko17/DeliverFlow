import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const storeData = useSelector((state) => state.localData.results);

  useEffect(() => {
    if (storeData.length) {
      setRequests(storeData);
      console.log(storeData);
    } else {
      console.log(storeData);
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
              <TableCell>City from:</TableCell>
              <TableCell align="right">City to:</TableCell>
              <TableCell align="right">Type of parcel</TableCell>
              <TableCell align="right">Date of dispatch</TableCell>
              <TableCell align="right">Parcel description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {req.cityFrom}
                </TableCell>
                <TableCell align="right">{req.cityTo}</TableCell>
                <TableCell align="right">{req.typeOfParcel ? req.typeOfParcel : ' ' }</TableCell>
                <TableCell align="right">{req.date}</TableCell>
                <TableCell align="right">{req.description ? req.description : ' '}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RequestsPage;
