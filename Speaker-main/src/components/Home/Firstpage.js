import React from "react";
import About from "../About/About";
import Categories from "../Categories/Categories";
import "../css/Firstpage.css";

export default function Firstpage() {
  return (
    <>
      <div className="speaker">
        {/* <img src={require("../images/speaker.jpg")} alt={""} /> */}
        {/* <video height="80%" autoplay muted>
          <source src="./Speakerore Home Page video.mp4" type="video/mp4" />
        </video> */}
        <div className="container-video-bg">
          <video
            id="bg-video"
            width="100%"
            loop
            autoPlay="autoplay"
            muted
            src="./video1.mp4"
          ></video>

          <div className="fp-text">
            <a href="/events">
              <button className="bg-btn">EXPLORE EVENTS</button>
            </a>
            {/* <p className="one">SpeakerOre</p> */}
            <p className="two">
              Direct Access to Thousands of Events to Speak at
            </p>
            <span className="scrolldown">
              <a href="#section06">
                <span></span>
              </a>
            </span>
          </div>
        </div>
      </div>
      <About />
      <Categories />
      <div className="fp-addevent">
        <p className="head1">ADD EVENT</p>
        <p className="desc" style={{ marginBottom: "25px" }}>
          Choose among the best speakers in the industry by creating an event
          here. No charges at all.
        </p>
        {/* <h1 className="fpae-heading">features</h1> */}
        <div className="speaker">
          <img
            src={require("../images/MaskGroup.png")}
            style={{ height: "100%" }}
            alt={""}
            className="image-overflow"
          />
          <div className="fp-text fp-text-bg">
            <p className="fpae-imgtext">CREATE NOW</p>
            <p className="two">
              You can fill out the form and create any event.
            </p>
            <a href="/addevent">
              <button className="bg-btn relative-up">ADD AN EVENT</button>
            </a>
          </div>
        </div>
      </div>
      <div className="fp-addevent">
        <p className="head1"  style={{marginTop:"50px"}}>POPULAR UPCOMING EVENTS</p>
        <p className="desc" style={{ marginBottom: "25px" }}>
          Subscribe to us and view unlimited number of events.
        </p>
        {/* <h1 className="fpae-heading">features</h1> */}
        <div className="speaker" style={{marginBottom:"90px"}}>
          <img
            src={require("../images/EventsPage2.png")}
            style={{ height: "100%" }}
            alt={""}
          />
          <div className="fp-text fp-text-bg">
            <p className="fpae-imgtext">POPULAR UPCOMING EVENTS</p>
            <p className="two">
              SpeakerOre subscribers can access thousands of events across the
              world and apply for speaking in them.
            </p>
            <a href="/events">
              <button className="bg-btn relative-up">SUBSCRIBE</button>
            </a>
          </div>
        </div>
        <br />
        <groovemail-form-embed permalink="NjMwMGZkNmVkMjA3ZmMwMzcwNGJhZjYy"></groovemail-form-embed>
      </div>
    </>
  );
}
