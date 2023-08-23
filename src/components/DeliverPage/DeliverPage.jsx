import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { v4 as uuidv4 } from 'uuid';
import { addRequest, updateRequest } from '../../store/actions';
import AlertDialog from '../AlertDialog/AlertDialog';

function DeliverPage({ type = 'create', nestedItem, closeDialog }) {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

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
            const d = new Date(newDate).toLocaleDateString('fr-FR');
            setDate(d);
          }}
        />
      </LocalizationProvider>
      <Button className="button button-submit" variant="contained" type="submit">Submit</Button>
      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
}

export default DeliverPage;
