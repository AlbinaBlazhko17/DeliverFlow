import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { StyledEngineProvider } from "@mui/material/styles";

import './CreatePage.scss';

const CreatePage = () => {
	return(
		<>
			<StyledEngineProvider injectFirst>
				<Typography
					variant="h3"
					component="div"
					sx={{ display: { xs: 'none', sm: 'block' }, color: '#071013' }}>
					Please choose a request type
				</Typography>
				<div className='wrapper'>
					<Button className='button' variant="contained">Order</Button>
					<Button className='button' variant="contained">Deliver</Button>
				</div>
			</StyledEngineProvider>
		</>
	)
}

export default CreatePage;