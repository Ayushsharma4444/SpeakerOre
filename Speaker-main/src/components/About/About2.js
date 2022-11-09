import { Grid } from "@mui/material";
import React from "react";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import "../css/About2.css";
import Culture from "../images/AboutUs.png";

import TeamMembers from "../Team/TeamMembers";

const About2 = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <div className="ep-left">
            <div
              className="epl-heading"
              style={{
                fontWeight: "600",
              }}
            >
              <p>About Us</p>
            </div>
            <div className="col-first">
              <p>
                One potential customer in the audience could create a positive
                impact by becoming a client, giving a referral or investing in
                your business. Today's business ecosystem requires every
                entrepreneur and experts to be visible all the time.{" "}
              </p>

              <p>Out of sight is out of mind!</p>

              <p>
                Speakerore.com solves the biggest and the most basic problem
                that stops an expert from becoming a successful and famous
                speaker. That is - finding the right speaking opportunities.
              </p>

              <p>Successful speakers speak more often.</p>

              <p>
                Some speakers invest in hiring good talent to identify
                opportunities which obviously is an expensive way of doing
                things. But most speakers spend their own time doing it. This
                method works out to be more expensive (your time value) and is
                highly inconsistent. It takes away 80% or more of your time and
                even tiny changes in your routine disrupts the entire process
                which requires enormous efforts to get back. Which means losing
                speaking opportunities. Sometimes really good ones.
              </p>

              <p>
                Speakerore is a portal that provides information on events from
                all over the world where speakers from across industries are
                required. These events could be conferences, summits, online
                interviews, corporate requirements, workshops, unconferences,
                panel discussions or something else. It includes all in-person,
                virtual, and hybrid events for you to choose from.
              </p>

              <p>
                With more than 4000 events listed every year, we also have 100+
                SpeakerOre exclusive events where speakers are selected only
                from SpeakerOre members. There is no referral fee or commission,
                and you get to connect with the organisers directly. No
                favouritism or influence from our team.
              </p>

              <p>
                The stage is set! The organisers are shortlisting. Be there!
                After all, even a single event could change the trajectory of
                your speaking business. And we bring in at least 4000 such event
                details to you.{" "}
              </p>

              <p>Join the speakerore.com tribe now.</p>
            </div>
           </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
        <div className="ep-parent">
          <LoggedInSidebar />
        </div>
      </Grid>
      </Grid>

      <div className="auditoriumimg">
              <img src={Culture} alt="" />
            </div>
            <h3
              style={{
                margin: "3rem 0",
                textAlign: "center",
              }}
            >
              Why SpeakerOre?
            </h3>
            <div className="siul-child">
              <div className="siul-child4">
                <div className="siul-child3">
                  <h4>4000+ Speaking Opportunities From Across The World</h4>
                  <p>
                    New leads to apply everyday! Focus on speaking, not lead
                    generation. Business growth opportunity - connect with the
                    right audience.
                  </p>
                </div>
                <br />
                <div>
                  <h4>100+ SpeakerOre Exclusive Events</h4>
                  <p>
                    Reduces competition increasing the probability of being
                    selected as a speaker
                  </p>
                </div>
                <br />

                <div>
                  <h4> Directly contact the event managers</h4>
                  <p>
                    No commissions, favouritism. Deal directly with the event
                    managers.
                  </p>
                </div>
                <br />

                <div>
                  <h4> Saves your precious resources (Time, Money & Effort)</h4>
                  <p>
                    Easy, Efficient and Cost Effective. Saves Effort, Time and
                    Money
                  </p>
                </div>
              </div>
            </div>
            {/* <p
            className="eprtext1"
            style={{
              textAlign: "center",
              fontSize: "smaller",
              paddingLeft: "3rem",
            }}
          >
            Thousands of people have joined SpeakerOre and are creating better
            opportunities to grow. Are you?
          </p> */}
            <div className="btn-container">
              <a href="/addevent">
                <button
                  className="create-event-btn eprbtn2"
                  style={{
                    margin: "1rem",
                  }}
                >
                  Create an Event
                </button>
              </a>
              <a href="/events">
                <button
                  className="create-event-btn eprbtn1"
                  style={{
                    margin: "1rem",
                  }}
                >
                  Search events
                </button>
              </a>
            </div>
     

      <TeamMembers />
    </>
  );
};
export default About2;
