import React from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AccountSide from "../accountSide";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import { Grid } from "@mui/material";

export default function MyProfile() {
  const [userData, setUser] = useState("");
  const planId = localStorage.getItem("@planId");
  const loggedInData = JSON.parse(localStorage.getItem("@token"))?.userdata?.id;
  console.log("processENV:", process.env);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_URL}/auth/get-loogedin/`
  //     )
  //     .then((data) => {
  //       console.log('userdata:', data?.data);
  //       setUser(data?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <div className="mp-parent">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <div className="mp-left">
              <AccountSide userData={userData} />
              <div style={{ marginLeft: "2rem", display: "flex" }}>
                <span style={{ fontSize: "2rem" }}>
                  <AiOutlineSafetyCertificate />
                </span>
                <span
                  style={{
                    fontSize: "small",
                    marginLeft: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Your information is secured with <br /> SpeakerOre
                </span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <LoggedInSidebar />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
