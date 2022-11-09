import React, { useEffect, useState } from "react";
// import "./css/SingleEventPageExclusive.css";
import { useLocation } from "react-router-dom";
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
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import axios from "axios";
export default function Exclusiveevent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [books, setBooks] = useState([]);
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [ProblemsSolve, setProblemsSolve] = useState("");
  const [keynote, setKeynote] = useState("");
  const [speakingRef, setSpeakingRef] = useState("");
  const [orgExtra, setOrgExtra] = useState("");
  const [singleEventData, setSingleEventData] = useState();
  const navigate = useLocation();
  const [eventData, setEventData] = useState();

  useEffect(() => {
    // console.log(navigate?.pathname);
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
          if (data?.data) {
            setSingleEventData(data?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleEventCreate = (e) => {
    e.preventDefault();
    const mailData = {
      name: name,
      address: address,
      phone: phone,
      website: website,
      books: books,
      linkedin: linkedin,
      youtube: youtube,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      ProblemsSolve: ProblemsSolve,
      keynote: keynote,
      speakingRef: speakingRef,
      orgExtra: orgExtra,
    };

    console.log(mailData);

    // if (navigate?.pathname?.split("/")[2]) {
    //   axios
    //     .post(`${process.env.REACT_APP_URL}/mail`, mailData, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           JSON.parse(localStorage.getItem("@token")).token
    //         }`,
    //       },
    //     })
    //     .then((data) => {
    //       if (data?.data) {
    //         navigate("/events");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

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
    <>
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
                    style={{
                      position: "relative",
                      top: "3px",
                      marginLeft: "0",
                    }}
                  >
                    <BsCalendar3 />
                  </span>
                  <span>Date:</span>
                  <span>{singleEventData?.startTime}</span>
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
                  <span>Location:</span>
                  <span>{singleEventData?.location}</span>
                </div>
                <div className="eibl-link" style={{ marginBottom: "0.4rem" }}>
                  <span
                    style={{
                      position: "relative",
                      top: "3px",
                      marginLeft: "0",
                    }}
                  >
                    <BsLink45Deg />
                  </span>
                  <span>Link:</span>
                  <a style={{ color: "blue" }} href={singleEventData?.website}>
                    <span> {singleEventData?.website}</span>
                  </a>
                </div>
              </div>
              {/* {console.log(singleEventData, "singleEventDatasingleEventData")} */}
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

          <div className="mp-lower" style={{ marginTop: "1rem" }}>
            <div className="mpl-right">
              <div className="mpl-heading">
                <p>Mail to Organizer</p>
                <button
                  style={{
                    color: "rgba(255, 191, 25, 1)",
                    textDecoration: "underline",
                  }}
                >
                  SpeakerOre Exclusive Events*
                </button>
              </div>
              <div className="mplower-body">
                <form onSubmit={handleEventCreate}>
                  <div className="mpedit-section" style={{ columnGap: "0" }}>
                    <div className="mpes-form">
                      <p>Full Name</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p>Phone Number</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p>Address</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <p>Website</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <p>Books Authored</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setBooks(e.target.value)}
                      />
                    </div>
                    <div className="mpes-form">
                      <p>Linkedin Profile</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                      <p>Youtube Profile</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setYoutube(e.target.value)}
                      />
                      <p>Facebook Profile</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                      <p>Twitter Profile</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                      <p>Instagram Profile</p>
                      <input
                        type="text"
                        className="mpes-input see-forminput"
                        placeholder="Write Here"
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>
                    <div className="mpes-form form-ta">
                      <p>Problems you are helping the audience solve:</p>
                      <textarea
                        rows="5"
                        cols="46"
                        placeholder="Write here..."
                        onChange={(e) => setProblemsSolve(e.target.value)}
                      ></textarea>
                      <p>
                        Sample Keynote Speakers Video Link:*(Write Fresher if no
                        experience yet)
                      </p>
                      <textarea
                        rows="5"
                        cols="46"
                        placeholder="Write here..."
                        onChange={(e) => setKeynote(e.target.value)}
                      ></textarea>
                      <p>
                        Previous speaking references and contact information:*
                        (Write Fresher for no experience yet)
                      </p>
                      <textarea
                        rows="5"
                        cols="46"
                        placeholder="Write here..."
                        onChange={(e) => setSpeakingRef(e.target.value)}
                      ></textarea>
                      <p>
                        Anything extra you want the organizer to know about you:
                      </p>
                      <textarea
                        rows="5"
                        cols="46"
                        placeholder="Write here..."
                        onChange={(e) => setOrgExtra(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="confirmation">
                    <div className="con-upper">
                      <input
                        type="checkbox"
                        style={{ position: "initial" }}
                        className="apply1"
                        name="apply1"
                      />
                      <div className="conu-text">
                        <h4>Applied via SpeakerOre Exclusive </h4>
                        <span style={{ fontSize: "medium" }}>
                          Providing a direct way to connect with the event
                          manager via mail. Tip: Share whatever sample you have.
                        </span>
                      </div>
                    </div>
                    <div className="sepe-middle">
                      **It is not compulsory to apply for the above option, it’s
                      just a pact that you are making with us that you will only
                      be hiring through our platform.
                    </div>
                    <div className="con-lower">
                      <button
                        className="con-lower-btn eprbtn1"
                        style={{
                          margin: "1rem",
                        }}
                      >
                        SEND MAIL
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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

          <div className="card-parent" style={{ padding: "0 1rem" }}>
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
    </>
  );
}
