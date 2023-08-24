import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextField, FormLabel, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { addRequest, updateRequest } from '../../store/actions';
import AlertDialog from '../AlertDialog/AlertDialog';

function OrderPage({ type = 'create', nestedItem, closeDialog }) {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [typeOfParcel, setTypeOfParcel] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (nestedItem) {
      setCityFrom(nestedItem.cityFrom);
      setCityTo(nestedItem.cityTo);
      setDate(nestedItem.date);
      setTypeOfParcel(nestedItem.typeOfParcel);
      setDescription(nestedItem.description);
    }
  }, [nestedItem]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatchRequest = () => {
    const newItem = {
      type: 'order',
      cityFrom,
      cityTo,
      typeOfParcel,
      date,
      description,
      dateOfCreation: new Date().toLocaleDateString('fr-FR'),
    };

    if (type === 'create') {
      const newItemWithId = { ...newItem, id: uuidv4() };
      dispatch(addRequest(newItemWithId));
    }
    if (type === 'update') {
      const updatedItem = { ...nestedItem, ...newItem };
      dispatch(updateRequest(updatedItem));
    }
  };

  function cleanInput() {
    setCityFrom('');
    setCityTo('');
    setTypeOfParcel('');
    setDate(null);
    setDescription('');
  }

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
      <FormLabel className="form__label" sx={{ margin: '0 auto' }}>
        Form to
        {' '}
        {type}
        {' '}
        order
      </FormLabel>
      <TextField
        id="cityFrom"
        label="City from"
        variant="filled"
        value={cityFrom}
        onInput={(e) => setCityFrom(e.target.value)}
        required
      />
      <TextField
        id="cityTo"
        label="City to"
        variant="filled"
        value={cityTo}
        onInput={(e) => setCityTo(e.target.value)}
        required
      />
      <TextField
        id="typeOfParcel"
        label="Type of parcel"
        variant="filled"
        value={typeOfParcel}
        onInput={(e) => setTypeOfParcel(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id="date"
          format="DD-MM-YYYY"
          value={date}
          onChange={(newDate) => {
            const d = new Date(newDate).toLocaleDateString('fr-FR');
            setDate(d);
          }}
        />
      </LocalizationProvider>
      <TextField
        id="description"
        label="Parcel description"
        variant="filled"
        multiline
        rows={4}
        value={description}
        onInput={(e) => setDescription(e.target.value)}
      />
      <Button className="button button-submit" variant="contained" type="submit">Submit</Button>
      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
}

export default OrderPage;
