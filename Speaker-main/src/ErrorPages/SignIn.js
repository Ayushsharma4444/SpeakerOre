import React from "react";
import { Modal, Box, Typography, Button } from '@mui/material';
import "./purchase.css";

export default function SigneEeror() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const modalCloseStyle = {
        position:'absolute',
        top:0,
        right:0,
        fontSize: '24px'
    }
    const [ open, setOpen ] = React.useState(false);

    const handleOpen = () => {
        setOpen( true );
      };
    const handleClose = () => {
        setOpen ( false );
    }

  return (
    <>
   
    <div className="main-purchase">
        <p className="back-btn">Back</p>
      <h1>Oops, it seems you have not yet subscribed!</h1>
      <p style={{ marginTop: "33px" }}>SUBSCRIBE NOW by SIGNING IN!!</p>
      <div className="card-new">
        <div className="div-1">Get event details for FREE.</div>
        <div className="div-2">Unlimited Click on Events</div>
        <div className="div-3">Get hired through SpeakerOre Exclusive</div>
      </div>
      <div>
      <a href="/login"> <button >Sign Up</button></a>
      <a href="/login"> <button >Sing In</button></a>

      </div>
     
    </div>
    <Button onClick={handleOpen}>Click Me...</Button>
      <Modal
      open={ open }
      onClose={ handleClose }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
            <Button onClick={ handleClose } sx={ modalCloseStyle }>&times;</Button>
            <Typography id="modal-modal-title" component="h1">
                Oops, it seems you have not yet subscribed!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                SUBSCRIBE NOW by SIGNING IN!!
            </Typography>
            <div className="card-new">
                <div className="div-1">Get event details for FREE.</div>
                <div className="div-2">Unlimited Click on Events</div>
                <div className="div-3">Get hired through SpeakerOre Exclusive</div>
            </div>
        </Box>
      </Modal>
    </>
  );
}
