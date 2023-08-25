import {
  Dialog,
  DialogContent,
} from '@mui/material';
import propTypes from 'prop-types';
import RequestFormPage from '../RequestFormPage/RequestFormPage';

function UpdateDialog({
  open, handleClose, nestedItem, sortType,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {
        nestedItem.typeOfRequest === 'order' && (
        <RequestFormPage typeOfRequest={nestedItem.typeOfRequest} type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
        )
      }
        {
          nestedItem.typeOfRequest === 'delivery' && (
            <RequestFormPage typeOfRequest={nestedItem.typeOfRequest} type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
          )
      }
      </DialogContent>
    </Dialog>
  );
}

UpdateDialog.defaultProps = {
  open: false,
  handleClose: null,
  nestedItem: {},
  sortType: 'creation',
};

UpdateDialog.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  nestedItem: propTypes.shape({
    typeOfRequest: propTypes.string,
    cityFrom: propTypes.string,
    cityTo: propTypes.string,
    date: propTypes.string,
    typeOfParcel: propTypes.string,
    description: propTypes.string,
  }),
  sortType: propTypes.string,
};

export default UpdateDialog;
