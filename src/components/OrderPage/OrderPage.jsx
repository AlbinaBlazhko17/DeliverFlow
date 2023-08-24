import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextField, FormLabel, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { isValid } from 'date-fns';
import { addRequest, updateRequest, sortRequests } from '../../store/actions';
import AlertDialog from '../AlertDialog/AlertDialog';

function OrderPage({
  type, nestedItem, closeDialog, sortType,
}) {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [typeOfParcel, setTypeOfParcel] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const data = useSelector((state) => state.localData.results);

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
          value={date || null}
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
      <AlertDialog open={open} handleClose={handleClose} error={error} />
    </form>
  );
}

OrderPage.defaultProps = {
  type: 'create',
  nestedItem: {},
  closeDialog: null,
  sortType: 'creation',
};

OrderPage.propTypes = {
  type: propTypes.string,
  nestedItem: propTypes.shape({
    cityFrom: propTypes.string,
    cityTo: propTypes.string,
    date: propTypes.string,
    typeOfParcel: propTypes.string,
    description: propTypes.string,
  }),
  closeDialog: propTypes.func,
  sortType: propTypes.string,
};

export default OrderPage;
