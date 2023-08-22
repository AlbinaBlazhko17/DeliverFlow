import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './styles.scss';

function OrderPage() {
  return (
    <Box
      className="form__wrapper"
      component="form"
      autoComplete="off"
    >
      <FormLabel className="form__label">Form to create order</FormLabel>
      <TextField id="filled-basic" label="City from" variant="filled" required />
      <TextField id="filled-basic" label="City to" variant="filled" required />
      <TextField id="filled-basic" label="Type of parcel" variant="filled" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      <TextField id="filled-basic" label="Parcel description" variant="filled" multiline rows={4} />
    </Box>
  );
}

export default OrderPage;
