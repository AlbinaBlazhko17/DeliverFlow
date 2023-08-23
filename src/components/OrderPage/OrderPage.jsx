import { useDispatch } from 'react-redux';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addRequest } from '../../store/actions';
import AlertDialog from '../AlertDialog/AlertDialog';

function OrderPage() {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [typeOfParcel, setTypeOfParcel] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatchRequest = () => {
    dispatch(addRequest(
      {
        cityFrom,
        cityTo,
        typeOfParcel,
        date,
        description,
      },
    ));
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
    handleClickOpen();
  }

  return (
    <form
      className="form__wrapper"
      onSubmit={(e) => { handleSubmit(e); }}
    >
      <FormLabel className="form__label">Form to create order</FormLabel>
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
