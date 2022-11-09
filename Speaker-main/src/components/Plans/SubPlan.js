import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import "../css/subPlan.css";
import { ToastContainer, toast } from "react-toastify";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const SubPlan = () => {
  const user_id = JSON.parse(localStorage.getItem("@token"))?.userdata?.id;
  const user_token = JSON.parse(localStorage.getItem("@token"))?.token;
  const userData = JSON.parse(localStorage.getItem("@token"))?.userdata;
  // console.log(userData, "userData");
  const navigate = useNavigate();
  const [datas, setDatas] = useState("");
  const [getData, setGetData] = useState("");
  console.log(getData);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/subscription`)
      .then((data) => {
        setGetData(data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const handleUpdate = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/subscription/update`,
        {
          planId: localStorage.getItem("@planId"),
          userId: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        }
      )
      .then((Data) => {
        // loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log(Data);
        const newtoken = JSON.parse(localStorage.getItem("@token"));
        newtoken.userdata.subscribed = true;
        newtoken.isSubscribed = true;
        localStorage.setItem("@token", JSON.stringify(newtoken));
        // success toast
        toast.dark("Subscription Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function showRazorpay(price, id) {
    localStorage.setItem("@planId", id);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    await axios
      .post(
        `${process.env.REACT_APP_URL}/subscription/payment`,
        {
          currency: "IN",
          amount: `${price}`,
          id: `${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        }
      )
      .then((t) => setDatas(t?.data?.order_id));
    const options = {
      key: "rzp_live_a9w4WLhoRPSxPi",
      currency: "INR",
      amount: price * 100,
      order_id: datas,
      handler: function (response) {
        handleUpdate();
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <ToastContainer />
      <div className="ep-parent">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <div className="ep-left">
              <div className="epl-heading subplan-heading">
                <p style={{ borderBottom: "1px solid rgba(255, 191, 25, 1)" }}>
                  Plans
                </p>
                <p style={{ fontWeight: "bolder" }}>SpeakerOre</p>
              </div>
              <div className="plan-container">
                {getData?.length > 0 &&
                  getData?.map((data) => {
                    return (
                      <div className="plan-card">
                        <p>PLAN INCLUDES:</p>
                        <p>{data?.name}</p>
                        <div style={{ height: "15rem" }}></div>
                        <p>Rs.{data?.price}/-</p>
                        {user_token ? (
                          <div
                            className="eprbtn1"
                            onClick={() => showRazorpay(data?.price, data?.id)}
                          >
                            BUY NOW
                          </div>
                        ) : (
                          <Button
                            href="/login"
                            sx={{
                              fontSize: "small",
                              backgroundColor: "#ffbf19",
                              marginTop: "2rem",
                              padding: "0.5rem",
                              borderRadius: "5px",
                              fontWeight: "500",
                              marginBottom: "0.5rem",
                              width: "100%",
                              color: "#333",
                            }}
                          >
                            BUY NOW
                          </Button>
                        )}
                      </div>
                    );
                  })}
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
};
export default SubPlan;
