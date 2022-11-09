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
  const [allDetails, setAllDetails] = useState([]);

  const [singleEventData, setSingleEventData] = useState(null);
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

  useEffect(() => {
    let allDetailsi = [];
    for (let key in singleEventData) {
      if (singleEventData.hasOwnProperty(key)) {
        allDetailsi.push(
          <div className="eibl-location" style={{ marginBottom: "0.4rem" }}>
            <span
              style={{ position: "relative", top: "3px", marginLeft: "0" }}
            ></span>
            <span>
              <b>{key} : </b>
            </span>
            <span>
              {singleEventData[key] == true
                ? "True"
                : singleEventData[key] == false
                ? "False"
                : singleEventData[key] == "Offline"
                ? "In - Person"
                : singleEventData[key]}
            </span>
          </div>
        );
      }
    }
    setAllDetails(allDetailsi);
  }, [singleEventData]);

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
          {/* {"id":241,"eventName":"The Meetings Show","website":"https://www.themeetingsshow.com/","contactName":"The Meetings Show","contactEmail":"RBarker@ntmllc.com","contactPhone":0,"description":"THE UK'S LEADING PLATFORM FOR THE MEETINGS, EVENTS, AND INCENTIVES INDUSTRY","detailedDescription":"Meet face-to-face with hundreds of UK and global suppliers: from hotels, destinations, and destination management companies, to conference centres, venues and technology suppliers\n\nGain insight and inspiration from industry leaders through our comprehensive education programme\n\nAttend countless networking events happening at the show and throughout London","isApproved":true,"startTime":"2023-06-28","endTime":"2023-06-29","mode":"Offline","location":"London","topic":"Gain insight and inspiration from industry leaders through our comprehensive education programme","engagementTerm":"Open for Discussion","eventType":"Conference","audienceType":"Employees","audienceSize":500,"tags":"Networking","categories":"\"Business\"","isExclusive":false,"userId":3} */}
          {/* represent the data in front end */}
          <br />
          <br />
          <h3>&nbsp;All Details: </h3>
          <br />
          {allDetails}

          <div className="sep-einfo-foot">
            This is an event hosted by one of the event managers. Click on the
            link above to apply as a speaker.
          </div>
        </div>
      </div>
      <LoggedInSidebar />
    </div>
  );
}
