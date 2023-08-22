import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DeliverPage() {
  return (
    <Box
      className="form__wrapper"
      component="form"
      autoComplete="off"
    >
      <FormLabel className="form__label">Form to create deliver</FormLabel>
      <TextField id="filled-basic" label="City from" variant="filled" required />
      <TextField id="filled-basic" label="City to" variant="filled" required />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    </Box>
  );
}

export default DeliverPage;
