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
import { useDispatch } from 'react-redux';
import UpdateDialog from '../UpdateDialog/UpdateDialog';
import { removeRequest } from '../../store/actions';

function RequestsPage() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState({});
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const storeData = {};
  let i = 0;

  const handleClickOpen = (nestedItem, key) => {
    setSelected({ ...nestedItem, id: key });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    storeData[key] = value;
  }

  useEffect(() => {
    if (
      !(Object.keys(storeData).length === 0)
      && JSON.stringify(storeData) !== JSON.stringify(requests)
    ) {
      setRequests(storeData);
    }
  }, [storeData, requests]);

  const handleDispatcher = (key) => {
    dispatch(removeRequest(
      {
        id: key,
      },
    ));
    setRequests((prevRequests) => {
      const newRequests = { ...prevRequests };
      delete newRequests[key];
      return newRequests;
    });
  };

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
            {!(Object.keys(requests).length === 0) && Object.keys(requests).map((key) => {
              const nestedItem = requests[key];
              i += 1;
              return (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {i}
                  </TableCell>
                  <TableCell align="center">{nestedItem.cityFrom}</TableCell>
                  <TableCell align="center">{nestedItem.cityTo}</TableCell>
                  <TableCell align="center">{nestedItem.typeOfParcel || ' ' }</TableCell>
                  <TableCell align="center">{nestedItem.date}</TableCell>
                  <TableCell align="center">{nestedItem.description || ' '}</TableCell>
                  <TableCell align="center">
                    {' '}
                    <Button className="button button-table" variant="contained" onClick={() => handleClickOpen(nestedItem, key)}>Update</Button>
                  </TableCell>
                  <TableCell align="right">
                    {' '}
                    <Button className="button button-table" variant="contained" onClick={() => { handleDispatcher(key); }}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateDialog open={open} handleClose={handleClose} nestedItem={selected} />
    </>
  );
}

export default RequestsPage;
