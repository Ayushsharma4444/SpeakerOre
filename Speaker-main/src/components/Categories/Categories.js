import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/category.css";
import { catData } from "./categories_data.js";
import videocat from "../images/SpeakerOreCategories.mp4";
export default function Categories() {
  const [categoryData, setCategoryData] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/events/category`)
      .then((data) => {
        setCategoryData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="category">
        <p className="head1">CATEGORIES</p>
        <p className="desc">WIDE RANGE OF CATEGORIES FOR SPEAKERORE USERS</p>
        <center>
          {/* <video autoPlay loop muted className="video" width="80%">
            <source src={videocat} type="video/mp4" />
          </video> */}
           <video
            // id="bg-video"
            width="80%"
            loop
            autoPlay="autoplay"
            muted
            src="./SpeakerOre Categories 22_1.mp4"
          ></video>
        </center>
        <div className="catcards">
          <div className="catcards-section">
            {catData &&
              catData?.map((data) => {
                return (
                  <div className="catcard">
                    <img className="catimgs" src={data.img_path} alt={""} />
                    <p className="catsub">{data?.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="fp-options">
          <p className="head1">which one are you?</p>
          <div className="fpo-card-parent">
            <div className="fpo-card">
              <p className="fpoc-head">SPEAKER</p>
              <p className="fpoc-subhead">
                Get nearby event detail by SpeakerOre
              </p>
              <img
                className="fpoc-img"
                src={require("../images/Speaker.png")}
                alt={""}
              />
              <p className="fpoc-text">
                {" "}
                I am willing to look for events to get an opportunity to speak
                in one of the greatest events.
              </p>
              <a href="/events">
                <button className="fpoc-btn"> View Events</button>
              </a>
            </div>
            <div className="fpo-card">
              <p className="fpoc-head">EVENT MANAGER</p>
              <p className="fpoc-subhead">
                Get connected to amazing speakers for your next event
              </p>
              <img
                className="fpoc-img"
                src={require("../images/Event Manager.png")}
                alt={""}
              />
              <p className="fpoc-text">Find the perfect speaker effortlessly</p>
              <a href="/addevent">
                <button className="fpoc-btn">Create Events</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
