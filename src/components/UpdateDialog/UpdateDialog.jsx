import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@mui/material';
import DeliverPage from '../DeliverPage/DeliverPage';
import OrderPage from '../OrderPage/OrderPage';

function UpdateDialog(props) {
  const { open, handleClose, nestedItem } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {
        nestedItem.type === 'order' && (
        <OrderPage type="update" nestedItem={nestedItem} closeDialog={handleClose} />
        )
      }
        {
          nestedItem.type === 'delivery' && (
            <DeliverPage type="update" nestedItem={nestedItem} closeDialog={handleClose} />
          )
      }
      </DialogContent>
    </Dialog>
  );
}

export default UpdateDialog;
