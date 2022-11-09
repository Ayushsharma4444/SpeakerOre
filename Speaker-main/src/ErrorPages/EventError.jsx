import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./purchase.css";

function EventError() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    pt: 5,
    px: 4,
    pb: 3,
    display: "flex",
    flexFlow: "wrap column",
    alignItems: "center",
  };

  const modalCloseStyle = {
    position: "absolute",
    top: 0,
    left: 0,
  };

  const cardBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="fp-addevent">
        <div className="speaker">
          <img
            src={require("../components/images/EventsPage2.png")}
            style={{ height: "60%", marginTop: "20px" }}
            alt={""}
          />
          <div className="fp-text">
            <p className="fpae-imgtext">POPULAR UPCOMING EVENTS</p>
            <p className="two">
              As a subscriber to SpeakerOre you can view unlimited details of
              the events.
            </p>
            <Button
              onClick={handleOpen}
              variant="contained"
              style={{
                backgroundColor: "#ffbf19",
                borderColor: "#ffbf19",
                color: "#333",
                marginTop:"-150px"
              }}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose} sx={modalCloseStyle}>
            {" "}
            &#10096; Back
          </Button>
          <Typography id="modal-modal-title" component="h5" variant="h5">
            Oops, it seems you have not yet subscribed!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            SUBSCRIBE NOW by SIGNING IN!!
          </Typography>
          <div
            className="card-new"
            style={{
              display: "flex",
              flexFlow: "wrap",
              flex: "0 0 100%",
              width: "100%",
              marginBottom: "30px",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <div className="div-1" style={cardBoxStyle}>
              <span className="box-count">1</span>Get event details for FREE.
            </div>
            <div className="div-2" style={cardBoxStyle}>
              <span className="box-count">2</span>Unlimited Click on Events
            </div>
            <div className="div-3" style={cardBoxStyle}>
              <span className="box-count">3</span>Get hired through SpeakerOre
              Exclusive
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: 4,
                  color: "#FFBF19",
                  fontSize: 18,
                }}
              >
                {" "}
                &#9733;{" "}
              </span>
            </div>
          </div>

          <Box
            sx={{
              display: "flex",
              flexFlow: "wrap",
              flex: "0 0 100%",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* <Box
              sx={{
                width: "50%",
                flex: "0 0 50%",
                pl: 1,
                pr: 1,
              }}
            > */}
            <Button
              href="/login"
              variant="contained"
              style={{
                backgroundColor: "#ffbf19",
                borderColor: "#ffbf19",
                color: "#333",
                width: "100%",
              }}
            >
              Sign In / up
            </Button>
            {/* </Box> */}
            {/* <Box
              sx={{
                width: "50%",
                flex: "0 0 50%",
                pl: 1,
                pr: 1,
              }}
            >
              <Button
                href="/login"
                variant="outlined"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#ffbf19",
                  color: "#333",
                  width: "100%",
                }}
              >
                Sign Up
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EventError;
