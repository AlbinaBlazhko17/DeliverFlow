import { Button, FormLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isValid } from 'date-fns';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addRequest, sortRequests, updateRequest } from '../../store/actions';
import AlertDialog from '../AlertDialog/AlertDialog';

function DeliverPage({
  type, nestedItem, closeDialog, sortType,
}) {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const data = useSelector((state) => state.localData.results);

  useEffect(() => {
    if (nestedItem) {
      setCityFrom(nestedItem.cityFrom);
      setCityTo(nestedItem.cityTo);
      setDate(nestedItem.date);
    }
  }, [nestedItem]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function cleanInput() {
    setCityFrom('');
    setCityTo('');
    setDate(null);
  }

  const dispatchRequest = () => {
    const newItem = {
      type: 'delivery',
      cityFrom,
      cityTo,
      date,
      dateOfCreation: new Date().toLocaleDateString('fr-FR'),
    };

    if (type === 'create' && error === false) {
      const newItemWithId = { ...newItem, id: uuidv4() };
      dispatch(addRequest(newItemWithId));
    }
    if (type === 'update') {
      const updatedItem = { ...nestedItem, ...newItem };
      const updatedIndex = data.findIndex((item) => item.id === updatedItem.id);

      if (updatedIndex !== -1) {
        const updatedData = [
          ...data.slice(0, updatedIndex),
          updatedItem,
          ...data.slice(updatedIndex + 1),
        ];
        dispatch(updateRequest(updatedItem));
        dispatch(sortRequests({ sortType, requests: updatedData }));
      }
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    cleanInput();
    dispatchRequest();
    if (type === 'update') {
      closeDialog();
    } else {
      handleClickOpen();
    }
  }

  return (
    <form
      className="form__wrapper"
      onSubmit={(e) => { handleSubmit(e); }}
    >
      <FormLabel className="form__label">
        Form to
        {' '}
        {type}
        {' '}
        delivery
      </FormLabel>
      <TextField
        id="filled-basic"
        label="City from"
        variant="filled"
        value={cityFrom}
        onInput={(e) => setCityFrom(e.target.value)}
        required
      />
      <TextField
        id="filled-basic"
        label="City to"
        variant="filled"
        value={cityTo}
        onInput={(e) => setCityTo(e.target.value)}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id="date"
          format="DD-MM-YYYY"
          value={date}
          onChange={(newDate) => {
            if (isValid(newDate)) {
              const d = new Date(newDate).toLocaleDateString('fr-FR');
              setDate(d);
              setError(false);
            } else {
              setError(true);
            }
          }}
        />
      </LocalizationProvider>
      <Button className="button button-submit" variant="contained" type="submit">Submit</Button>
      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
}

DeliverPage.defaultProps = {
  type: 'create',
  nestedItem: {},
  closeDialog: null,
  sortType: 'creation',
};

DeliverPage.propTypes = {
  type: propTypes.string,
  nestedItem: propTypes.shape({
    cityFrom: propTypes.string,
    cityTo: propTypes.string,
    date: propTypes.string,
  }),
  closeDialog: propTypes.func,
  sortType: propTypes.string,
};

export default DeliverPage;
