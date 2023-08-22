import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './styles.scss';

function CreatePage() {
  return (
    <div className="type__wrapper">
      <Typography
        variant="h3"
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' }, color: '#071013' }}
      >
        Please choose a request type:
      </Typography>
      <div className="button__wrapper">

        <Link className="link" to="/create/order">
          <Button className="button button-create" variant="contained">Order</Button>
        </Link>
        <Link className="link" to="/create/deliver">
          <Button className="button button-create" variant="contained">Deliver</Button>

        </Link>
      </div>
    </div>
  );
}

export default CreatePage;
