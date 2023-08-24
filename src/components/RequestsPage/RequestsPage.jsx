import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest, sortRequests } from '../../store/actions';
import UpdateDialog from '../UpdateDialog/UpdateDialog';

function RequestsPage() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [sortType, setSortType] = useState('creation');
  const storeData = useSelector((state) => state.localData.results);
  console.log(storeData);

  const handleClickOpen = (nestedItem, key) => {
    setSelected({ ...nestedItem, id: key });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (event) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
  };

  useEffect(() => {
    // if (Object.keys(requests).length === 0) {
    dispatch(sortRequests({ sortType, requests: storeData }));
    // } else {
    // dispatch(sortRequests({ sortType, requests }));
    // }
  }, [dispatch, sortType]);

  useEffect(() => {
    setRequests(storeData);
  }, []);

  useEffect(() => {
    if (
      // !(Object.keys(storeData).length === 0)
      JSON.stringify(storeData) !== JSON.stringify(requests)
    ) {
      setRequests(storeData);
      console.log('Updated');
    }
  }, [storeData, requests]);

  const handleDispatcher = (key) => {
    dispatch(removeRequest(
      {
        id: key,
      },
    ));
    setRequests((prevRequests) => {
      const newRequests = [...prevRequests];
      const updatedRequests = newRequests.filter((item) => item.id !== key);
      return updatedRequests;
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
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ float: 'right', marginBottom: '20px' }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            filter
          </InputLabel>
          <NativeSelect
            defaultValue="creation"
            inputProps={{
              name: 'Filter',
              id: 'uncontrolled-native',
            }}
            onChange={handleFilterChange}
          >
            <option value="creation">by the date of creation</option>
            <option value="dispatch">by the date of dispatch</option>
          </NativeSelect>
        </FormControl>
      </Box>
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
            {requests.map((nestedItem, key) => (
              <TableRow
                key={nestedItem.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {key + 1}
                </TableCell>
                <TableCell align="center">{nestedItem.cityFrom}</TableCell>
                <TableCell align="center">{nestedItem.cityTo}</TableCell>
                <TableCell align="center">{nestedItem.typeOfParcel || ' ' }</TableCell>
                <TableCell align="center">{nestedItem.date}</TableCell>
                <TableCell align="center">{nestedItem.description || ' '}</TableCell>
                <TableCell align="center">
                  {' '}
                  <Button className="button button-table" variant="contained" onClick={() => handleClickOpen(nestedItem, nestedItem.id)}>Update</Button>
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <Button className="button button-table" variant="contained" onClick={() => { handleDispatcher(nestedItem.id); }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateDialog open={open} handleClose={handleClose} nestedItem={selected} />
    </>
  );
}

export default RequestsPage;
