import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import propTypes from 'prop-types';

export default function AlertDialog(props) {
  const { open, handleClose } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 5, p: 2 }} id="customized-dialog-title">
          Request successfuly saved!
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

// AlertDialog.defaultProps = {
//   open: false,
//   handleClose: null,
// };

// AlertDialog.propTypes = {
//   open: propTypes.bool,
//   handleClose: propTypes.func,
// };
