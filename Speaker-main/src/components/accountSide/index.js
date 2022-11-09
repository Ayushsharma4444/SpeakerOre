import React, { useEffect, useState } from "react";
import user from "../images/profile.png";
import { useNavigate } from "react-router-dom";
import { BsChevronDown, BsCalendar3 } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  BsChevronRight,
  BsFillBookmarkFill,
  BsFillCalendarEventFill,
  BsChevronLeft,
} from "react-icons/bs";
import "../css/eventpage.css";

export default function Index() {
  const [tabs, setTabs] = useState(0);
  const [name, setname] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [age, setage] = useState();
  const [occupation, setoccupation] = useState();
  const userToken = JSON.parse(localStorage.getItem("@token"));
  console.log(userToken, "userToken");
  const { userdata } = JSON.parse(localStorage.getItem("@token"));
  const [filterData, setFilterData] = useState("");
  const [images, setImages] = useState();
  const handleImage = (event) => {
    localStorage.setItem("@image", URL.createObjectURL(event.target.files[0]));
    setImages(URL.createObjectURL(event.target.files[0]));
  };

  const [allApprovedEvents, setAllApprovedEvents] = useState([]);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [sortedEvents, setSortedEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!(fromTime == "" || toTime == "")) {
      setSortedEvents(
        events
          ?.filter((event) => {
            return (
              new Date(event.startTime) >= new Date(fromTime) &&
              new Date(event.startTime) <= new Date(toTime)
            );
          })
          .filter(
            (data) =>
              data?.isApproved == true &&
              new Date(data?.startTime) <= new Date()
          )
          .sort((a, b) => {
            return new Date(a.startTime) - new Date(b.startTime);
          })
      );
    }
  }, [fromTime, toTime]);

  console.log(sortedEvents, "sortedEvents");

  const fetchEvents = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/events`, {
        headers: {
          Authorization: `Bearer ${userToken?.token}`,
        },
      })
      .then((data) => {
        console.log(data?.data);
        const dd = data?.data?.filter((data) => data?.isApproved == false);
        setFilterData(dd);
        setAllApprovedEvents(
          data?.data?.filter(
            (data) => data?.isApproved == true && data?.userId == userdata?.id
          )
        );
        setEvents(
          data?.data
            .reverse()
            .filter(
              (data) =>
                data?.isApproved == true &&
                new Date(data?.startTime) <= new Date()
            )
            .sort((a, b) => {
              return new Date(a.startTime) - new Date(b.startTime);
            })
        );
        setSortedEvents(
          data?.data
            ?.filter((event) => {
              return (
                new Date(event.startTime) >= new Date("1111-01-01") &&
                new Date(event.startTime) <= new Date("7111-01-01")
              );
            })
            .reverse()
            .filter(
              (data) =>
                data?.isApproved == true &&
                new Date(data?.startTime) <= new Date()
            )
            .sort((a, b) => {
              return new Date(a.startTime) - new Date(b.startTime);
            })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const [plandta, setplandata] = useState("");
  const handleEdit = () => {
    const data = {
      phone: phone || userdata.phone,
      isSubscribed: userdata.isSubscribed,
      email: email || userdata.email,
      name: name || userdata.name,
      occupation: occupation || userdata.occupation,
      age: age || userdata.age,
      provider: "GOOGLE",
      role: userdata.role,
    };
    console.log(data);
    axios
      .put(
        `${process.env.REACT_APP_URL}/auth/update/${userToken?.userdata?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken?.token}`,
          },
        }
      )
      .then((data) => {
        if (data?.data) {
          toast.dark("User updated successfully");
          userToken.userdata = data?.data;
          localStorage.setItem("@token", JSON.stringify(userToken));
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/subscription/${localStorage.getItem(
          "@planId"
        )}`
      )
      .then((data) => {
        setplandata(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("@token");
    navigate("/login");
  };

  const approveEvent = (id) => {
    axios
      .post(`${process.env.REACT_APP_URL}/events/approve/${id}`, "", {
        headers: {
          Authorization: `Bearer ` + userToken?.token,
        },
      })
      .then((data) => {
        console.log(data, "dfghjk", userToken?.token);
        if (data?.data) {
          toast.dark("Event approved successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectEvent = (id) => {
    axios
      .post(`${process.env.REACT_APP_URL}/events/reject/${id}`, "", {
        headers: {
          Authorization: `Bearer ` + userToken?.token,
        },
      })
      .then((data) => {
        console.log(data);
        if (data?.data) {
          toast.dark("Event rejected successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mp-upper">
        <div className="mpl-left">
          <h5
            style={{
              margin: "0 auto 1rem auto",
              borderBottom: "2px solid #ffbf19",
              width: "fit-content",
              paddingBottom: "0.5rem",
            }}
          >
            PROFILE DETAILS
          </h5>

          <div className={tabs === 0 ? "cdrow active-tab" : "cdrow"}>
            <div className="cdr-box"></div>
            <span onClick={() => setTabs(0)}>BASIC INFORMATION</span>
          </div>
          <div className={tabs === 1 ? "cdrow active-tab" : "cdrow"}>
            <div className="cdr-box"></div>
            <span onClick={() => setTabs(1)}>ACCOUNT</span>
          </div>

          {userdata?.role === "MODERATOR" && (
            <div className={tabs === 4 ? "cdrow active-tab" : "cdrow"}>
              <div className="cdr-box"></div>
              <span onClick={() => setTabs(4)}>EVENT REQUESTS</span>
            </div>
          )}
          <div className={tabs === 9 ? "cdrow active-tab" : "cdrow"}>
            <div className="cdr-box"></div>
            <span onClick={() => setTabs(9)}>MY EVENTS</span>
          </div>
          {(userdata?.role === "MODERATOR" || userdata?.role === "TEAM") && (
            <div className={tabs === 5 ? "cdrow active-tab" : "cdrow"}>
              <div className="cdr-box"></div>
              <span onClick={() => setTabs(5)}>ARCHIVED EVENTS</span>
            </div>
          )}
          {/*
          {userdata?.role === "MODERATOR" && (
            <div className={tabs === 6 ? "cdrow active-tab" : "cdrow"}>
              <div className="cdr-box"></div>
              <span onClick={() => setTabs(6)}>SUBSCRIPTION PLANS</span>
            </div>
          )}

          {userdata?.role === "MODERATOR" && (
            <div className={tabs === 7 ? "cdrow active-tab" : "cdrow"}>
              <div className="cdr-box"></div>
              <span onClick={() => setTabs(7)}>FLAGGED SECTION</span>
            </div>
          )} */}
          {userdata?.role === "USER" && (
            <div className={tabs === 3 ? "cdrow active-tab" : "cdrow"}>
              <div className="cdr-box"></div>
              <span onClick={() => setTabs(3)}>BILLING INFORMATION</span>
            </div>
          )}
          <div onClick={handleLogout} className="cdrow">
            <div className="cdr-box"></div>
            <span>LOGOUT</span>
          </div>
        </div>
        {tabs === 0 && (
          <div className="mpl-right">
            <div className="mpl-heading">
              <p>BASIC INFORMATION</p>
            </div>
            <div className="mpedit-section">
              <div className="mpes-form">
                <p>Full Name</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  defaultValue={userdata?.name || name}
                  onChange={(e) => setname(e.target.value)}
                />
                <p>Phone Number</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  defaultValue={userdata?.phone || phone}
                  onChange={(e) => setphone(e.target.value)}
                />
                <p>Email</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  defaultValue={userdata?.email || email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <p>Age</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  defaultValue={userdata?.age}
                  onChange={(e) => setage(e.target.value)}
                />
                {/* <p>Phone Number</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.phone}
                /> */}
                <p>Occupation</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  defaultValue={userdata?.occupation}
                  onChange={(e) => setoccupation(e.target.value)}
                />
                <button className="con-lower-btn eprbtn1" onClick={handleEdit}>
                  Update User
                </button>
              </div>
              <div className="mpes-profilepic">
                {console.log(localStorage.getItem("@image"), "kgdfg")}
                {images && <img src={localStorage.getItem("@image")} alt="" />}
                <div className={images ? " images-new " : "mpesdp-change"}>
                  <input
                    type="file"
                    className="mpes-input"
                    placeholder=""
                    onChange={handleImage}
                    style={{ height: "100%", width: "100%", opacity: "0" }}
                  />
                  {/* <span style={{ marginTop: "12rem" }}>Change</span> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {tabs === 1 && (
          <div className="mpl-right">
            <div className="mpl-heading">
              <p>ACCOUNT</p>
              <button>Edit</button>
            </div>
            <div className="mpedit-section">
              <div className="mpes-form">
                <p>Full Name</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.name}
                />
                {/* <p>Age</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                />
                <p>Phone Number</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.phone}
                />
                <p>Occupation</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                /> */}
              </div>
              <div className="mpes-profilepic">
                {/* <img src={user} alt="" /> */}
                {/* <div className="mpesdp-change">
                  <input
                    type="file"
                    className="mpes-input"
                    placeholder=""
                    style={{ height: "100%", width: "100%", opacity: "0" }}
                  />
                  {/* <span style={{ marginTop: "12rem" }}>Change</span> */}
                {/* </div>  */}
              </div>
            </div>
          </div>
        )}
        {tabs === 2 && (
          <div className="mpl-right">
            <div className="mpl-heading">
              <p>Event</p>
              <button>Edit</button>
            </div>
            <div className="mpedit-section">
              <div className="mpes-form">
                <p>Full Name</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.name}
                />
                <p>Age</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                />
                <p>Phone Number</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.phone}
                />
                <p>Occupation</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                />
              </div>
              <div className="mpes-profilepic">
                <img src={user} alt="" />
                <div className="mpesdp-change">
                  <input
                    type="file"
                    className="mpes-input"
                    placeholder=""
                    style={{ height: "100%", width: "100%", opacity: "0" }}
                  />
                  {/* <span style={{ marginTop: "12rem" }}>Change</span> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {tabs === 3 && (
          <div className="mpl-right">
            <div className="mpl-heading">
              <p>BILLING INFORMATION</p>
              <button>Edit</button>
            </div>
            {/* <div className="mpedit-section">
              <div className="mpes-form">
                <h1>Bank Account</h1>
                <p>IFSC Code</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.name}
                />
                <p>Account Number</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                />
                <p>Beneficiary</p>
                <input
                  type="text"
                  className="mpes-input"
                  placeholder="Write Here"
                  value={userdata?.phone}
                />
              </div>
            </div> */}
          </div>
        )}
        {tabs === 4 && (
          <div className="mpl-right">
            <div className="md-header mpl-heading">
              <p>EVENT REQUESTS</p>
              <button>Total Request Pending: {filterData?.length}</button>
            </div>
            {/* <div
              className="st-lower"
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <div className="stl-child">
                <p className="stlc-text">Location: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">Sort: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">from: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="stl-child">
                <p className="stlc-text">to: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div> */}
            <div className="mpedit-section">
              {filterData?.length > 0 &&
                filterData?.map((data) => {
                  return (
                    <div key={data?.id} className="md-card-parent">
                      <div className="mdcp-header">
                        <h4>{data?.eventName}</h4>
                        <div>
                          {data.isExclusive ? (
                            <img
                              src={require("../images/exclusiveEvent.png")}
                              alt={""}
                              style={{ width: "40px" }}
                            />
                          ) : null}
                          &nbsp;
                          <a
                            href={`/modevent/${data?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsChevronDown />
                          </a>
                        </div>
                      </div>
                      <div className="mdcp-body">
                        <div>
                          <div
                            className="eibl-date"
                            style={{ marginBottom: "0.4rem" }}
                          >
                            <span
                              style={{
                                position: "relative",
                                top: "3px",
                                marginLeft: "0",
                              }}
                            >
                              <BsCalendar3 />
                            </span>
                            <span>{data?.startTime}</span>
                          </div>
                          <div
                            className="eibl-location"
                            style={{ marginBottom: "0.4rem" }}
                          >
                            <span
                              style={{
                                position: "relative",
                                top: "3px",
                                marginLeft: "0",
                              }}
                            >
                              <BiMap />
                            </span>
                            <span>{data?.location}</span>
                          </div>
                        </div>
                        <div style={{}}>
                          {data?.mode == "Offline" ? "In-Person" : data?.mode}
                        </div>
                      </div>
                      <br />
                      <div className="approve">
                        <button
                          onClick={() => {
                            approveEvent(data?.id);
                            fetchEvents();
                          }}
                          style={{ marginRight: "0.8rem" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            rejectEvent(data?.id);
                            fetchEvents();
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {tabs === 5 && (
          <div className="mpl-right">
            <div className="md-header mpl-heading">
              <p>ARCHIEVE PLANS</p>
            </div>
            <div
              className="st-lower"
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <div className="stl-child"></div>
              <div className="stl-child">
                <p className="stlc-text">from: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => {
                    setFromTime(e.target.value);
                  }}
                />
              </div>
              <div className="stl-child">
                <p className="stlc-text">to: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => {
                    setToTime(e.target.value);
                  }}
                />
              </div>
            </div>

            <div
              style={{
                margin: "1.5rem",
              }}
              className="view-event"
            >
              <div className="vc-sec">
                {sortedEvents &&
                  sortedEvents?.map((data) => {
                    return (
                      <div className="event-card">
                        <div className="ec-section1">
                          <div className="eds1-l">
                            <p className="e1">{data?.eventName}</p>
                            <p className="e2">{data?.location}</p>
                          </div>
                          <div className="eds1-r">
                            {/* <BsFillBookmarkFill /> */}
                            {data.isExclusive ? (
                              <img
                                src={require("../images/exclusiveEvent.png")}
                                alt={""}
                                style={{ width: "40px" }}
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="ec-section2">
                          <span>
                            <div
                              style={{
                                marginRight: "0.5rem",
                                fontSize: "medium",
                              }}
                            >
                              <BsFillCalendarEventFill />
                            </div>
                            <p>{data?.startTime}</p>
                          </span>
                          <p className="e8">
                            {data?.mode == "Offline" ? "In-Person" : data?.mode}
                          </p>
                        </div>
                        <div className="ec-section3">
                          Tags: <p className="e4">{data?.tags}</p>
                        </div>
                        <div className="ec-section4">{data?.description}</div>
                        <div className="ec-section5">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              data.isExclusive
                                ? `/modevent/${data?.id}`
                                : `/modevent/${data?.id}`
                            }
                          >
                            <button
                              className="eprbtn2"
                              style={{
                                background: "#ffbf19",
                                padding: "0.5rem 2rem",
                              }}
                            >
                              View Details
                            </button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {tabs === 9 && (
          <div className="mpl-right">
            <div className="md-header mpl-heading">
              <p>My Events</p>
            </div>

            <div
              style={{
                margin: "1.5rem",
              }}
              className="view-event"
            >
              <div className="vc-sec">
                {allApprovedEvents &&
                  allApprovedEvents?.map((data) => {
                    return (
                      <div className="event-card">
                        <div className="ec-section1">
                          <div className="eds1-l">
                            <p className="e1">{data?.eventName}</p>
                            <p className="e2">{data?.location}</p>
                          </div>
                          <div className="eds1-r">
                            {/* <BsFillBookmarkFill /> */}
                            {data.isExclusive ? (
                              <img
                                src={require("../images/exclusiveEvent.png")}
                                alt={""}
                                style={{ width: "40px" }}
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="ec-section2">
                          <span>
                            <div
                              style={{
                                marginRight: "0.5rem",
                                fontSize: "medium",
                              }}
                            >
                              <BsFillCalendarEventFill />
                            </div>
                            <p>{data?.startTime}</p>
                          </span>
                          <p className="e8">
                            {data?.mode == "Offline" ? "In-Person" : data?.mode}
                          </p>
                        </div>
                        <div className="ec-section3">
                          Tags: <p className="e4">{data?.tags}</p>
                        </div>
                        <div className="ec-section4">{data?.description}</div>
                        <div className="ec-section5">
                          <a
                            href={
                              data.isExclusive
                                ? `/exevent/${data?.id}`
                                : `/event/${data?.id}`
                            }
                          >
                            <button
                              className="eprbtn2"
                              style={{
                                background: "#ffbf19",
                                padding: "0.5rem 2rem",
                              }}
                            >
                              View Details
                            </button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {/* {tabs === 5 && (
          <div className="mpl-right">
            <div className="md-header mpl-heading">
              <p>ARCHIEVE PLANS</p>
              <button
                style={{
                  height: "35.06px",
                  boxSizing: "border-box",
                }}
              >
                Total Request Pending: 30
              </button>
            </div>
            <div
              className="st-lower"
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <div className="stl-child">
                <p className="stlc-text">Location: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">Sort: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">from: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="stl-child">
                <p className="stlc-text">to: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="mpedit-section">
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        {tabs === 7 && (
          <div className="mpl-right">
            <div className="md-header mpl-heading">
              <p>ARCHIEVE PLANS</p>
              <button>Total Request Pending: 30</button>
            </div>
            <div
              className="st-lower"
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <div className="stl-child">
                <p className="stlc-text">Location: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">Sort: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">from: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="stl-child">
                <p className="stlc-text">to: </p>

                <input
                  type="date"
                  className=" stlc-field"
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="mpedit-section">
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
              <div className="md-card-parent">
                <div className="mdcp-header">
                  <h4>EVENT NAME HERE TILL HERE...</h4>
                  <div>
                    <BsChevronDown />
                  </div>
                </div>
                <div className="mdcp-body">
                  <div>
                    <div
                      className="eibl-date"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BsCalendar3 />
                      </span>
                      <span>29th Dec’2021</span>
                    </div>
                    <div
                      className="eibl-location"
                      style={{ marginBottom: "0.4rem" }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "3px",
                          marginLeft: "0",
                        }}
                      >
                        <BiMap />
                      </span>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div style={{}}>ONLINE</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tabs === 6 && (
          <div className="mpl-right">
            <div className=" mpl-heading">
              <p>SUBSCRIPTION PLANS</p>
            </div>
            <div
              className="st-lower"
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <div
                className="stu-left"
                style={{
                  width: "50%",
                }}
              >
                <input
                  className="searchbar"
                  type="text"
                  placeholder="Name of the customer here..."
                  name="search"
                />
                <button
                  type="submit"
                  style={{
                    border: " none",
                    color: " white",
                    background: "#ffbf19",
                    borderRadius: " 10px",
                    padding: " 1rem",
                    position: " relative",
                    left: "-0.7rem",
                  }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className="stl-child">
                <p className="stlc-text">Location: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
              <div className="stl-child">
                <p className="stlc-text">Sort: </p>
                <select
                  className="stlc-field "
                  style={{
                    background: "#e4e4e4",
                    color: "#000",
                  }}
                >
                  <option value="Online" selected>
                    Choose Mode
                  </option>
                  <option value="Online" selected>
                    Conference
                  </option>
                  <option value="Offline">In-Person</option>
                </select>
              </div>
            </div>
            <div className="subplan-sec1">
              <div className="sps1-row">
                <h5>S. No.</h5>
                <h5>Name </h5>
                <h5>Subscription Plan</h5>
                <h5>Starting Date</h5>
                <h5>Ending Date</h5>
                <h5>Location</h5>
              </div>
              <div className="sps1-row">
                <p>1.</p>
                <p>{userdata?.name}</p>
                <p>{plandta?.name}</p>
                <p>31.01.2022</p>
                <p>28.02.2022</p>
                <p>New Delhi</p>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="subplan-sec2">
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "0.5rem",
                }}
              >
                Suscription Plan Details
              </h3>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                Editing as {userdata?.name}
              </p>
              <div className="sps1-row">
                <p>Name</p>
                <p>Subscription Plan</p>
                <p>Started on</p>
                <p>Ends on</p>
                <p>Email address</p>
                <p>Paid</p>
              </div>
              {console.log(plandta, "plandta")}
              <div className="sps1-row">
                <h5>{userdata?.name}</h5>
                <h5>{plandta?.name}</h5>
                <h5 style={{ display: "flex" }}>
                  31.01.2022
                  <div style={{ marginLeft: "0.5rem", textAlign: "center" }}>
                    <BsCalendar3 />
                    <button
                      style={{
                        outline: "none",
                        background: "none",
                        border: "none",
                        textDecoration: "underline",
                        fontSize: "small",
                      }}
                    >
                      Change
                    </button>
                  </div>
                </h5>
                <h5 style={{ display: "flex" }}>
                  28.02.2022
                  <div style={{ marginLeft: "0.5rem", textAlign: "center" }}>
                    <BsCalendar3 />
                    <button
                      style={{
                        outline: "none",
                        background: "none",
                        border: "none",
                        textDecoration: "underline",
                        fontSize: "small",
                      }}
                    >
                      Change
                    </button>
                  </div>
                </h5>
                <h5>{userdata?.email}</h5>
                <h5>Rs.{plandta?.price}/-</h5>
              </div>
              {/* <div className="mdlheader mpl-heading">
              <p>Update Details</p>
            </div> */}
              {/* <p>
              <b>Mohit Gopal</b> changed the suscription ending date from{" "}
              <b>28.02.2022</b> to <b>30.03.2022</b>
            </p>
            <p>
              <b>Mohit Gopal</b> changed the suscription ending date from{" "}
              <b>28.02.2022</b> to <b>30.03.2022</b>
            </p>
            <p>
              <b>Mohit Gopal</b> changed the suscription ending date from{" "}
              <b>28.02.2022</b> to <b>30.03.2022</b>
            </p> */}
              <div className="con-lower">
                <button
                  className="con-lower-btn eprbtn2"
                  style={{
                    margin: "1rem",
                    border: "1px solid #ffbf19",
                    background: "none",
                    width: "223px",
                  }}
                >
                  Cancel Subscription
                </button>
                <a href="/events">
                  <button
                    className="con-lower-btn eprbtn1"
                    style={{
                      margin: "1rem",
                      width: "223px",
                    }}
                  >
                    Update Subscription
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
