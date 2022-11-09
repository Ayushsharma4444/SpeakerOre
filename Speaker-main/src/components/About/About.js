import React from "react";
import "../css/About.css";

export default function About() {
  return (
    <>
      <div className="about">
        <p className="heading1">ABOUT SPEAKERORE</p>

        <div className="cards-section">
          <div className="card" style={{  marginTop:"10px" }}>
            <div className="fp-cardtext">
              <p className="num" style={{ textAlign: "left"}}>
                01
              </p>
              <h3 style={{ textAlign: "left" }}>4000+ Speaking Opportunities From Across The World</h3>
              <p className="desc" style={{ textAlign: "left" }}>
                New leads to apply everyday! Focus on speaking, not lead
                generation. Business growth opportunity - connect with the right
                audience.
              </p>
            </div>

            <img
              className="image"
              src={require("../images/4000+ Speaking.png")}
              alt={""}
            />
          </div>
          <div className="card" style={{  marginTop:"180px" }}>
            <div className="fp-cardtext">
              <p className="num" style={{ textAlign: "right" }}>
                02
              </p>
              <h3 style={{ textAlign: "right" }}>100+ SpeakerOre Exclusive Events</h3>
              <p className="desc" style={{ textAlign: "right" }}>
                Reduces competition increasing the probability of being selected
                as a speaker
              </p>
            </div>

            <img
              className="image"
              src={require("../images/100+ SpeakerOre.png")}
              alt={""}
            />
          </div>
          <div className="card" style={{  marginTop:"-180px" }}>
            <div className="fp-cardtext">
              <p className="num" style={{ textAlign: "left" }}>
                03
              </p>
              <h3 style={{ textAlign: "left" }}>Directly contact the event managers</h3>
              <p className="desc" style={{ textAlign: "left" }}>
                No commissions, favouritism. Deal directly with the event
                managers
              </p>
            </div>

            <img
              className="image"
              src={require("../images/Directly contact.png")}
              alt={""}
            />
          </div>
          <div className="card" style={{  marginTop:"30px" }}>
            <div className="fp-cardtext">
              <p className="num" style={{ textAlign: "right" }}>
                04
              </p>
              <h3 style={{ textAlign: "right" }}>Saves your precious resources (Time, Money & Effort)</h3>
              <p className="desc" style={{ textAlign: "right" }}>
                Easy, Efficient and Cost Effective. Saves Effort, Time and Money
              </p>
            </div>

            <img
              className="image"
              src={require("../images/Saves your precious resources.png")}
              alt={""}
            />
          </div>
        </div>
        {/* <div
          className="cards-section"
          style={{ position: "relative", top: "-7rem" }}
        >
          <div className="card">
            <div className="fp-cardtext">
              <p className="num" style={{ textAlign: "end" }}>
                04
              </p>
              <p className="desc">
                Fill the speakerore exclusive events form and increase your
                probabilty of being selected by the organizer.
              </p>
            </div>

            <img
              className="image"
              src={require("../images/about.jpg")}
              alt={""}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
