import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import withRouter from "../withRouter";
import "../css/About2.css";
function LoggedInSidebar({ setisExclusive }) {
  const [userData, setUser] = useState("");
  const isLoggedin = JSON.parse(localStorage.getItem("@token"))?.userdata;
  // useEffect(() => {
  //   if (userData) {
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_URL}/auth/get-loogedin/${
  //           JSON.parse(localStorage.getItem("@token"))?.userdata?.id
  //         }`
  //       )
  //       .then((data) => {
  //         setUser(data?.data);
  //         //console.log(isLoggedin);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  let loginButtons = [];

  if (!JSON.parse(localStorage.getItem("@token"))?.userdata) {
    loginButtons.push(
      <Button
        key="0"
        href="/login"
        variant="contained"
        style={{
          background: "#FFBF19",
          width: "100%",
          marginTop: 15,
        }}
      >
        Sign In / Up
      </Button>
    );

    // loginButtons.push(
    //   <Button
    //     key="1"
    //     href="/login"
    //     variant="outlined"
    //     style={{
    //       color: "#FFBF19",
    //       borderColor: "#FFBF19",
    //       width: "100%",
    //       marginTop: 15,
    //     }}
    //   >
    //     Sign Up
    //   </Button>
    // );

    loginButtons.push(
      <p
        style={{
          fontSize: 10,
          textAlign: "center",
          fontWeight: 100,
          marginTop: 5,
        }}
      >
        Single click Google Sign in.
      </p>
    );

    // loginButtons.push(
    //   <h2
    //     style={{
    //       marginTop: 50,
    //       fontSize: 12,
    //       textAlign: "center",
    //       fontWeight: 700,
    //     }}
    //   >
    //     {" "}
    //     Why Sign In/Up?{" "}
    //   </h2>
    // );

    // loginButtons.push(
    //   <ul
    //     style={{
    //       marginTop: 18,
    //       fontSize: 10,
    //       textAlign: "left",
    //       lineHeight: "14px",
    //     }}
    //   >
    //     <li key={1}>Get event details for FREE.</li>
    //     <li key={2}>Unlimited clicks on events</li>
    //     <li key={3}>Get hired through speakerOre exclusive events </li>
    //   </ul>
    // );
  }

  let resoursesLinks = {
    about: "About Us",
    "how-it-works": "How it works",
    privacy: "Privacy Policy",
  };

  let resourceLinkHTML = [];

  const resourceStyle = {
    listStyle: "none",
    textAlign: "left",
    marginTop: 28,
  };

  for (const rKey in resoursesLinks) {
    resourceLinkHTML.push(
      <li>
        <Button
          href={rKey}
          sx={{
            fontSize: 10,
            fontWeight: 100,
            lineHeight: "14.06px",
            color: "#333",
          }}
        >
          {" "}
          {resoursesLinks[rKey]}
        </Button>{" "}
      </li>
    );
  }

  return (
    <div className="ep-right">
      <div className="eprcard">
        <div className="avatar-parent">
          <img src={require("../images/default-user.png")} alt="" />
        </div>
        <p>
          <span
            style={{
              fontWeight: "100",
              fontSize: 18,
              lineHeight: "21px",
            }}
          >
            Hi
          </span>{" "}
          ,{" "}
          {isLoggedin ? (
            <b style={{ fontWeight: "500", fontSize: 24 }}>
              {isLoggedin?.name}!
            </b>
          ) : (
            ""
          )}
          {!isLoggedin && (
            <b style={{ fontWeight: "500", fontSize: 24 }}>Stranger</b>
          )}
        </p>

        {!isLoggedin && (
          <p
            style={{
              marginTop: 15,
              fontSize: 12,
              fontWeight: 100,
              lineHeight: "14.06px",
              textAlign: "center",
            }}
          >
            Are you an event manager or a speaker?
          </p>
        )}

        {userData?.role ? (
          <span className="eprtext1">{userData?.role} </span>
        ) : (
          ""
        )}

        <div style={{ marginTop: "3rem" }} className="eprbtn2">
          <a href="/addevent">Create a new event</a>
        </div>

        {/* Sign In/Sign Up Buttons */}
        {loginButtons}

        {JSON.parse(localStorage.getItem("@token"))?.userdata && (
          <a href="/events">
            <div className="eprbtn2">View Events</div>
          </a>
        )}
        {JSON.parse(localStorage.getItem("@token"))?.userdata?.subscribed && (
          <div
            style={{
              marginTop: "0",
              background: "rgba(255, 191, 25, 0.4)",
            }}
            className="eprbtn1"
          >
            Subscribed
          </div>
        )}
      </div>

      {/* <div className="eprcard">
        <p>
          <b style={{ fontWeight: "500", fontSize: 24 }}>Resources</b>
        </p>
        <ul>
          { resourceLinkHTML && <ul style={resourceStyle}> {resourceLinkHTML} </ul> }
        </ul>    
        <Button variant="contained" style={{background: '#FFBF19',marginTop: "10px", width: '100%' }} href="#" >Contact Us</Button>
        
      </div> */}
    </div>
  );
}

export default withRouter(LoggedInSidebar);
