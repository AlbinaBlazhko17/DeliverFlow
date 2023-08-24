import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@mui/material';
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

export default UpdateDialog;
