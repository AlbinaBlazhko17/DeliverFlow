import {
  Dialog,
  DialogContent,
} from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';
import RequestFormPage from '../RequestFormPage/RequestFormPage';

function UpdateDialog(props) {
  const {
    open, handleClose, nestedItem, sortType,
  } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {
        nestedItem.type === 'order' && (
        <RequestFormPage typeOfRequest={nestedItem.type} type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
        )
      }
        {
          nestedItem.type === 'delivery' && (
            <RequestFormPage typeOfRequest={nestedItem.type} type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
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
    cityFrom: propTypes.string,
    cityTo: propTypes.string,
    date: propTypes.string,
    typeOfParcel: propTypes.string,
    description: propTypes.string,
  }),
  sortType: propTypes.string,
};

export default UpdateDialog;
