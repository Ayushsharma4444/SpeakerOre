import React, { useState } from "react";
import "../css/addeventpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Addeventpage() {
  const [name, setName] = useState("");
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");
  const [Description, setDescription] = useState("");
  const [DetailedDescription, setDetailedDescription] = useState("");
  const [location, setlocation] = useState("");
  const [mode, setMode] = useState();
  const [topic, setTopic] = useState();
  const [eventSite, setEventSite] = useState();
  const [AudienceType, setAudienceType] = useState();
  const [AudienceSize, setAudienceSize] = useState();
  const [Categories, setCategories] = useState();
  const [engagementTerm, setengagementTerm] = useState();
  // const [eventIncludes, seteventIncludes] = useState();
  // const [contact, setcontact] = useState("");
  const [cname, setcname] = useState();
  const [cemail, setcemail] = useState();
  const [cphone, setcphone] = useState();
  const [eventType, seteventType] = useState();
  const [tags, settags] = useState();
  const [isExclusive, setisExclusive] = useState();

  // function WordCount(str) {
  //   return str.split(" ").length;
  // }

  // console.log(WordCount("hello world"));
  const navigate = useNavigate();
  const handleEventCreate = (e) => {
    e.preventDefault();
    const data = {
      userId: JSON.parse(localStorage.getItem("@token"))?.userdata?.id,
      eventName: name,
      start_time: start_time || "",
      end_time: end_time || "2025-09-01T04:49:42.144Z",
      website: eventSite,
      mode: mode ? mode : "Online",
      topic: topic,
      location: location,
      engagementTerm: engagementTerm ? engagementTerm : "Probono",
      eventType: eventType ? eventType : "Conference",
      audienceType: AudienceType ? AudienceType : "Employees",
      audienceSize: AudienceSize,
      tags: tags,
      description: Description,
      detailedDescription: DetailedDescription,
      categories: Categories,
      isExclusive: isExclusive,
      contactName: cname,
      contactMail: cemail,
      contactPhone: cphone,
      isApproved: false,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/events`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("@token")).token
          }`,
        },
      })
      .then((data) => {
        if (data?.data) {
          navigate("/events");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="mp-parent">
        <form onSubmit={handleEventCreate}>
          <div className="mp-left">
            <div className="mp-lower">
              <div className="mpl-right">
                <div className="mpl-heading">
                  <p>Event Details</p>
                  {/* <button>Show previous events hosted</button> */}
                </div>
                <div className="mplower-body">
                  <div className="mpedit-section">
                    <div className="mpes-form">
                      <p>Name of the event</p>
                      <input
                        type="text"
                        className="mpes-input"
                        placeholder="Write Here"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      <p>Date of the event</p>
                      <div className="mpes-from_to">
                        <h6>From</h6>
                        <h6>To</h6>
                      </div>
                      <div className="mpes-date1">
                        <input
                          type="date"
                          className="mpes-input"
                          placeholder="Write Here"
                          value={start_time}
                          onChange={(e) => setstart_time(e.target.value)}
                        />
                        <input
                          type="date"
                          className="mpes-input"
                          placeholder="Write Here"
                          value={end_time}
                          onChange={(e) => {
                            // if date is less than start date then show error
                            if (e.target.value < start_time) {
                              alert(
                                "End date should be greater than start date"
                              );
                            } else {
                              setend_time(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <p>Mode</p>
                      <select
                        className="mpes-input"
                        style={{
                          paddingTop: "0",
                          paddingBottom: "0",
                          color: "grey",
                        }}
                        onChange={(e) => setMode(e.target.value)}
                        value={mode}
                      >
                        <option value="" selected>
                          Choose Mode
                        </option>
                        <option value="Online">Online</option>
                        <option value="Offline">In-Person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      <p>Location</p>
                      <input
                        type="text"
                        className="mpes-input"
                        placeholder="Write Here"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                      />
                      <p>Topics covered</p>
                      <input
                        type="text"
                        className="mpes-input"
                        placeholder="Write Here"
                        onChange={(e) => setTopic(e.target.value)}
                        value={topic}
                      />
                      <p>Event’s URL (Apply to Speak) [Start with https://] </p>
                      <input
                        type="url"
                        className="mpes-input"
                        placeholder="https://example.com"
                        onChange={(e) => setEventSite(e.target.value)}
                        value={eventSite}
                      />
                      <p>Audience Size</p>
                      <input
                        type="number"
                        className="mpes-input"
                        placeholder="Write Here"
                        onChange={(e) => setAudienceSize(e.target.value)}
                        value={AudienceSize}
                      />
                      <p>Categories</p>

                      <select
                        className="mpes-input"
                        style={{
                          paddingTop: "0",
                          paddingBottom: "0",
                          color: "grey",
                        }}
                        onChange={(e) => setCategories(e.target.value)}
                        value={Categories}
                      >
                        <option value="" selected>
                          Choose Category
                        </option>
                        <option value="Business">Business</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Sales">Sales</option>
                        <option value="Communication">Communication</option>
                        <option value="Health">Health</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Presentation skills">
                          Presentation skills
                        </option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Marketing">Marketing</option>
                        <option value="LGBTQ">LGBTQ</option>
                        <option value="Oil and Gas">Oil and Gas</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Coaching">Coaching</option>
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Education">Education</option>
                        <option value="Motivation">Motivation</option>
                        <option value="Finance">Finance</option>
                        <option value="Parenting">Parenting</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Creativity">Creativity</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Media">Media</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Banking">Banking</option>
                        <option value="Design Thinking">Design Thinking</option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="Others">Others</option>
                      </select>
                      {/* <input
                        type="text"
                        className="mpes-input"
                        placeholder="Write Here"
                        onChange={(e) =>
                          setCategories(e.target.value.split(","))
                        }
                        value={Categories}
                      /> */}
                      <p>Engagement Terms </p>
                      <select
                        className="mpes-input"
                        style={{
                          paddingTop: "0",
                          paddingBottom: "0",
                          color: "grey",
                        }}
                        onChange={(e) => setengagementTerm(e.target.value)}
                        value={engagementTerm}
                      >
                        {/* <option value="Online" selected>Choose Mode</option> */}
                        {/* <option value="Paid" selected>
                          Paid
                        </option> */}
                        <option value="Probono" selected>
                          Probono
                        </option>
                        <option value="Paid">Paid</option>
                        <option value="Open for Discussion">
                          Open for Discussion
                        </option>
                      </select>
                    </div>

                    <div className="mpes-form">
                      <p>Event Description (150 Characters) </p>
                      <textarea
                        rows="4"
                        cols="46"
                        placeholder="A small about the event that is going to be held for the speakers."
                        style={{
                          background: "#F5F5F5",
                          borderRadius: "10px",
                          padding: "0.5rem",
                          marginBottom: "1rem",
                        }}
                        value={Description}
                        onChange={(e) => {
                          if (e.target.value.length < 150) {
                            setDescription(e.target.value);
                          } else {
                            alert(
                              "Description should be less than 150 characters"
                            );
                          }
                        }}
                        res
                      ></textarea>
                      <p>Detailed Event Description</p>
                      <textarea
                        rows="5"
                        cols="46"
                        placeholder="A small about the event that is going to be held for the speakers."
                        style={{
                          borderRadius: "10px",
                          padding: "0.5rem",
                          marginBottom: "1rem",
                        }}
                        res
                        value={DetailedDescription}
                        onChange={(e) => setDetailedDescription(e.target.value)}
                      ></textarea>
                      <p>Contact Information:</p>
                      {/* <input
                        type="number"
                        className="mpes-input"
                        placeholder="Write Here"
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                      /> */}
                      <div className="mpes-contact1">
                        <div className="mpes-cname">
                          <h6>Name</h6>
                          <input
                            type="text"
                            className="mpes-input"
                            placeholder="Write Here"
                            value={cname}
                            onChange={(e) => setcname(e.target.value)}
                          />
                        </div>
                        <div className="mpes-cemail">
                          <h6>Email</h6>
                          <input
                            type="email"
                            className="mpes-input"
                            placeholder="Write Here"
                            value={cemail}
                            onChange={(e) => setcemail(e.target.value)}
                          />
                        </div>
                        <div className="mpes-cphone">
                          <h6>Phone</h6>
                          <input
                            type="number"
                            className="mpes-input"
                            placeholder="Write Here"
                            value={cphone}
                            onChange={(e) => setcphone(e.target.value)}
                          />
                        </div>
                      </div>

                      <p>Event Type</p>
                      <select
                        className="mpes-input"
                        style={{
                          paddingTop: "0",
                          paddingBottom: "0",
                          color: "grey",
                        }}
                        value={eventType}
                        onChange={(e) => seteventType(e.target.value)}
                      >
                        <option value="Conference">Conference</option>
                        <option value="Summit">Summit</option>
                        <option value="Employee Engagement Program">
                          Employee Engagement Program
                        </option>
                        <option value="Internal L&D event">
                          Internal L&D event
                        </option>
                        <option value="Online Video or Audio Interviews">
                          Online Video or Audio Interviews
                        </option>
                        <option value="Others">Others</option>
                      </select>
                      <p>Audience Type</p>

                      <select
                        className="mpes-input"
                        style={{
                          paddingTop: "0",
                          paddingBottom: "0",
                          color: "grey",
                        }}
                        onChange={(e) => setAudienceType(e.target.value)}
                        value={AudienceType}
                      >
                        {/* <option value="Online" selected>Choose Mode</option> */}
                        {/* <option value="Paid" selected>
                          Paid
                        </option> */}
                        <option value="Employees" selected>
                          Employees
                        </option>
                        <option value="Students">Students</option>
                        <option value="Techies">Techies</option>
                        <option value="Scientists">Scientists</option>
                        <option value="HRs">HRs</option>
                        <option value="Others">Others</option>
                      </select>
                      <p>Tags (separated by ,)</p>
                      <div className="tag-div">
                        <input
                          type="text"
                          className="mpes-input"
                          placeholder="first"
                          value={tags}
                          onChange={(e) => settags(e.target.value)}
                        />
                      </div>
                      <div>
                        {/* tags */}
                        <div className="tag-divit">
                          {tags?.split(",").map((tag) => (
                            <span
                              onClick={() => {
                                settags(tags.replace(tag + ",", ""));
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="confirmation">
                    <div className="con-upper">
                      <input
                        type="checkbox"
                        style={{ position: "initial" }}
                        className="apply1"
                        name="apply1"
                        onChange={(e) => {
                          setisExclusive(e.target.checked);
                        }}
                      />
                      <div className="conu-text">
                        <div className="conu-text1">
                          <h4>Apply for SpeakerOre Exclusive</h4>
                        </div>
                        <button
                          class="addMore"
                          title="Events only for SpeakerOre subscribers. All the speaker in these events will be selected from speakerore website only."
                        >
                          <InfoOutlinedIcon fontSize="small" />
                        </button>
                        {/* <span>
                          Events only for SpeakerOre subscribers. All the
                          speaker in these events will be selected among
                          speakers or members.
                        </span> */}
                      </div>
                    </div>
                    <div className="con-lower">
                      <button
                        className="con-lower-btn eprbtn1"
                        style={{
                          margin: "1rem",
                        }}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <LoggedInSidebar />
      </div>
    </>
  );
}
