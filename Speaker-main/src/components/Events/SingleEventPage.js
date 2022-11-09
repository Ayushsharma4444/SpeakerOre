import React, { useEffect, useState } from "react";
import "../css/SingleEventPage.css";
import {
  BsChevronLeft,
  BsFlag,
  BsBookmark,
  BsCalendar3,
  BsLink45Deg,
  BsFillCalendarEventFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
export default function SingleEventPage() {
  const navigate = useLocation();
  const [eventData, setEventData] = useState();

  const [singleEventData, setSingleEventData] = useState();
  console.log(singleEventData, "singleEventDatasingleEventData");
  useEffect(() => {
    if (navigate?.pathname?.split("/")[2]) {
      axios
        .get(
          `${process.env.REACT_APP_URL}/events/${
            navigate?.pathname?.split("/")[2]
          }`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("@token")).token
              }`,
            },
          }
        )
        .then((data) => {
          setSingleEventData(data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    const userToken = localStorage.getItem("@token");
    console.log(JSON.parse(userToken).token, "hjkhkjhkh");
    axios
      .get(`${process.env.REACT_APP_URL}/events`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(userToken).token}`,
        },
      })
      .then((d) =>
        setEventData(
          d?.data?.filter((e) => {
            if (e.id == navigate?.pathname?.split("/")[2]) {
              return false;
            }
            if (e.isApproved == 1) {
              return true;
            } else {
              return false;
            }
          })
        )
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mp-parent">
      <div className="mp-left">
        <div className="sep-eventinfo">
          <div className="sep-einfo-head">
            <a href="/events">
              <button>
                <span style={{ position: "relative", top: "3px" }}>
                  <BsChevronLeft />
                </span>
                <span>Back to Events Search </span>
              </button>
            </a>
            {/* <div>
              <div>
                <BsFlag />
              </div>
              <div>
                <BsBookmark />
              </div>
            </div> */}
          </div>
          <div
            className="sep-einfo-body"
            style={{ paddingBottom: "0", paddingRight: "0" }}
          >
            <div className="eib-left">
              <div className="eibl-ename">{singleEventData?.eventName}</div>
              <div className="eibl-eplace">
                {singleEventData?.city}, {singleEventData?.location}
              </div>
              <div className="eibl-oname" style={{ marginBottom: "0.4rem" }}>
                <span>Organiser Name: </span>
                <span>Mohit Gopal</span>
              </div>
              <div className="eibl-mode" style={{ marginBottom: "0.4rem" }}>
                <span>Event Mode: </span>
                <span>{singleEventData?.mode}</span>
              </div>
              <div className="eibl-date" style={{ marginBottom: "0.4rem" }}>
                <span
                  style={{ position: "relative", top: "3px", marginLeft: "0" }}
                >
                  <BsCalendar3 />
                </span>
                <span>Date:</span>
                <span>{singleEventData?.startTime}</span>
              </div>
              <div className="eibl-location" style={{ marginBottom: "0.4rem" }}>
                <span
                  style={{ position: "relative", top: "3px", marginLeft: "0" }}
                >
                  <BiMap />
                </span>
                <span>Location:</span>
                <span>{singleEventData?.location}</span>
              </div>
              <div className="eibl-link" style={{ marginBottom: "0.4rem" }}>
                <span
                  style={{ position: "relative", top: "3px", marginLeft: "0" }}
                >
                  <BsLink45Deg />
                </span>
                <span>Link:</span>
                <a style={{ color: "blue" }} href={singleEventData?.website}>
                  <span> {singleEventData?.website}</span>
                </a>
              </div>
            </div>
            {console.log(singleEventData, "singleEventDatasingleEventData")}
            <div className="eib-right">
              <div className="eibr-header">About this event:</div>
              <div className="eibr-body">
                <p>{singleEventData?.description}</p>
                <span>Tags:{singleEventData?.tags}</span>
              </div>
            </div>
          </div>
          <div className="sep-einfo-foot">
            This is an event hosted by one of the event managers. Click on the
            link above to apply as a speaker.
          </div>
        </div>
        <div style={{ margin: "1rem" }}>
          {/* <span
            style={{
              fontSize: "medium",
              marginLeft: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Similar Events
          </span> */}
        </div>
        <div className="mp-lower">
          <div className="vc-sec">
            {eventData &&
              eventData?.map((data) => {
                return (
                  <div className="event-card">
                    <div className="ec-section1">
                      <div className="eds1-l">
                        <p className="e1">{data?.eventName}</p>
                        <p className="e2">{data?.location}</p>
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
                        <p>{data?.startTime}</p>
                      </span>
                      <p className="e8">ONLINE</p>
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
      <LoggedInSidebar />
    </div>
  );
}
