import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const useBackdrop = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => {
    setOpen(true);
  };

  const closeBackdrop = () => {
    setOpen(false);
  };

  const BackdropComponent = () => (
    <Backdrop
      sx={{ color: '#fff', zIndex: "9999999"}}
      open={open}

    >
      <CircularProgress color="inherit" />
     
    </Backdrop>
  );

  return { openBackdrop, closeBackdrop, BackdropComponent };
}

export default useBackdrop