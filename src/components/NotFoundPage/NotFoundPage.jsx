import { Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <Typography
      variant="h3"
      component="div"
      sx={{ display: { xs: 'none', sm: 'block' }, color: '#071013' }}
    >
      Not found page!
    </Typography>
  );
}
export default NotFoundPage;
