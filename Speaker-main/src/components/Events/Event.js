import React from "react";
import "./css/Event.css";

export default function Event() {
  return (
    <>
      <div className="eventshead1">
        <p className="heading3">ADD EVENT </p>
        <p className="subhead1">
          Choose among the best speakers in the industry by creating an event
          here. No charges at all
        </p>
        <img
          className="eventspic1"
          src={require("./images/MaskGroup.png")}
          alt={""}
        />
        <div className="subevent">
          <p className="subhead3">CREATE NOW</p>
          <p className="subhead4">
            You can fill out the form and create any event.
          </p>
          <button className="subE">ADD AN EVENT</button>
        </div>
      </div>
      <div className="eventshead2">
        <p className="heading2">POPULAR UPCOMING EVENTS</p>
        <p className="subhead5">
          Subscribe to us and view unlimited number of events.
        </p>
        {/* <p className="subhead6">features</p> */}
        <img
          className="eventspic"
          src={require("./images/EventsPage2.png")}
          alt={""}
        />
        <div className="subevent">
          <p className="subhead7">POPULAR UPCOMING EVENTS</p>
          <p className="subhead8">
            As a subscriber to SpeakerOre you can view unlimited details of the
            events.
          </p>
          <button className="subN">SUBSCRIBE NOW</button>
        </div>
      </div>
    </>
  );
}
