import {
  Dialog,
  DialogContent,
} from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';
import DeliverPage from '../DeliverPage/DeliverPage';
import OrderPage from '../OrderPage/OrderPage';

function UpdateDialog(props) {
  const {
    open, handleClose, nestedItem, sortType,
  } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {
        nestedItem.type === 'order' && (
        <OrderPage type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
        )
      }
        {
          nestedItem.type === 'delivery' && (
            <DeliverPage type="update" nestedItem={nestedItem} closeDialog={handleClose} sortType={sortType} />
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
  sortType: 'creation',
};

export default UpdateDialog;
