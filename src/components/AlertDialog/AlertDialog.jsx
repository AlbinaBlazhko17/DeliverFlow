import * as React from 'react';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import propTypes from 'prop-types';

export default function AlertDialog({ open, handleClose, error }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 5, p: 2 }} id="customized-dialog-title">
          {
              error ? 'Bad date!' : 'Request successfuly saved!'
          }
          {open ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      </Dialog>
    </div>
  );
}

AlertDialog.defaultProps = {
  open: false,
  handleClose: null,
};

AlertDialog.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
};
