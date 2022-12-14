import React, { useEffect, useState } from "react";
import "../css/eventpage.css";
import {
  BsChevronRight,
  BsFillBookmarkFill,
  BsFillCalendarEventFill,
  BsChevronLeft,
} from "react-icons/bs";
import axios from "axios";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Firstpage.css";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import PurchaseError from "../../ErrorPages/purchaseError";

const EventMod = () => {
  console.log(JSON.parse(localStorage.getItem("@token")));
  const { userdata } = JSON.parse(localStorage.getItem("@token"));
  const [search, setSearch] = useState("");
  const [isExclusive, setisExclusive] = useState(false);
  const [eventData, setEventData] = useState();
  const userToken = JSON.parse(localStorage.getItem("@token"));
  const [startTime, setstart_time] = useState("");
  const [endTime, setendTime] = useState("");
  console.log(userToken, "startTime");
  const userEvents = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/events`, {
        headers: {
          Authorization: `Bearer ${userToken?.token}`,
        },
      })
      .then((d) => {
        setEventData(d?.data?.filter((e) => e.isApproved));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var resultProductData = eventData?.filter((a) => {
    var date = new Date(a.start_time);
    return date >= startTime && date <= endTime;
  });
  console.log(resultProductData);

  useEffect(() => {
    if (isExclusive) {
      setEventData(eventData?.filter((e) => e.isExclusive));
    } else {
      userEvents();
    }
  }, [isExclusive]);

  useEffect(() => {
    if (userdata?.subscribed || userToken?.userdata?.role === "MODERATOR") {
      userEvents();
    }
  }, []);

  const handleBookmark = (id) => {
    const data = {};
    console.log(id);
    axios
      .post(`${process.env.REACT_APP_URL}/events/bookmark/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userToken?.token}`,
        },
      })
      .then((d) => {
        toast.dark("Event bookmarked successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filteredCountries = eventData?.filter((country) => {
    return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  var aquaticCreatures = eventData?.filter(function (creature) {
    return creature.isExclusive === isExclusive;
  });
  const [mode, setMode] = useState();
  var aquaticCreature1s = eventData?.filter(function (creature) {
    return creature.mode === mode;
  });

  return (
    <>
      <ToastContainer />
      <div className="mp-parent" style={{ background: "none", marginTop: "0" }}>
        {userdata?.role === "MODERATOR" ? (
          <div className="mp-left">
            <div className="search-ticket">
              <div className="st-upper">
                <div className="stu-left">
                  <input
                    className="searchbar"
                    type="text"
                    placeholder="Search by event name, location, or category name"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <div className="stu-right">
                  <input
                    type="checkbox"
                    name="apply1"
                    value={isExclusive}
                    onChange={(e) => setisExclusive(e.target.checked)}
                  />
                  <div className="stur-text">
                    <b className="s1">SpeakerOre Exclusive</b>
                    <p
                      className="eprtext1"
                      style={{ fontSize: "x-small", paddingRight: "5rem" }}
                    >
                      Events only for SpeakerOre subscribers. All the speaker in
                      these events will be selected among speakers or members.
                    </p>
                  </div>
                </div>
              </div>

              <div className="st-lower">
                <div className="stl-child">
                  <p className="stlc-text">Mode: </p>
                  <select
                    className="stlc-field "
                    // style={{
                    //   paddingTop: "0",
                    //   paddingBottom: "0",
                    //   color: "grey",
                    // }}
                    onChange={(e) => setMode(e.target.value)}
                    value={mode}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">In-Person</option>
                  </select>
                </div>
                <div className="stl-child">
                  <p className="stlc-text">Categories: </p>
                  <select
                    className="stlc-field "
                    style={{
                      paddingTop: "0",
                      paddingBottom: "0",
                      color: "grey",
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
                    placeholder="dd/mm/yyyy"
                    onChange={(e) => setstart_time(e.target.value)}
                    value={startTime}
                  />
                  {console.log(startTime, "startTimestartTime")}
                </div>
                <div className="stl-child">
                  <p className="stlc-text">to: </p>

                  <input
                    type="date"
                    className=" stlc-field"
                    placeholder="dd/mm/yyyy"
                    onChange={(e) => setendTime(e.target.value)}
                    value={endTime}
                  />
                </div>
                <div className="stl-child">
                  <button
                    style={{
                      marginLeft: "35px",
                      height: "45px",
                      width: "99px",
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="view-event">
              <div className="vc-sec">
                {eventData &&
                  eventData?.map((data) => {
                    return (
                      <div className="event-card">
                        <div className="ec-section1">
                          <div className="eds1-l">
                            <p className="e1">{data?.name}</p>
                            <p className="e2">{data?.state}</p>
                          </div>
                          <div className="eds1-r">
                            <BsFillBookmarkFill />
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
                            <p>{data?.start_time}</p>
                          </span>
                          <p className="e8">ONLINE</p>
                        </div>
                        <div className="ec-section3">
                          Tags:{" "}
                          <p className="e4">
                            Industry, Film, Acting, Speaking{" "}
                          </p>
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

              {eventData?.length > 9 && (
                <div className="event-nav-bottom">
                  <div className="enav-prev">
                    <span className="enb-icon">
                      <BsChevronLeft />
                    </span>
                    <span>Previous</span>
                  </div>
                  <ul className="enav-nums">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>...</li>
                    <li>15</li>
                  </ul>
                  <div className="enav-next">
                    <span>Next</span>
                    <span className="enb-icon">
                      <BsChevronRight />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="speaker">
            <img
              src={require("../images/EventsPage2.png")}
              style={{ height: "100%" }}
              alt={""}
            />
            <div
              className="fp-text"
              style={{
                top: 0,
                left: 0,
                background: "rgba(52, 52, 52, 0.65)",
                padding: "30% 0",
                textAlign: "center",
              }}
            >
              <p className="fpae-imgtext">CREATE NOW</p>
              <p className="two">
                You can fill out the form and create any event.
              </p>
              <a href="/404">
                <button className="">VIEW EVENT</button>
              </a>
            </div>
          </div>
        )}
        <LoggedInSidebar
          setisExclusive={setisExclusive}
          isExclusive={isExclusive}
        />
      </div>
    </>
  );
};
export default EventMod;
