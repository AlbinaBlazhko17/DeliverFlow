import { useState, useDispatch } from 'react';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addRequest } from '../../store/actions';

function DeliverPage() {
  const dispatch = useDispatch();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [date, setDate] = useState('');

  const dispatchRequest = () => {
    dispatch(addRequest(
      {
        cityFrom,
        cityTo,
        date,
      },
    ));
  };
  return (
    <form
      className="form__wrapper"
      onSubmit={(e) => { e.preventDefault(); dispatchRequest(); }}
    >
      <FormLabel className="form__label">Form to create deliver</FormLabel>
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
    </form>
  );
}

export default DeliverPage;
