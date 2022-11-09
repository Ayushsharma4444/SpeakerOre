import React from "react";
import "../css/footer.css";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <ul className="firstcolumn">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/events">Events</a>
          </li>
          <li>
            <a href="/subplan">Plans</a>
          </li>
        </ul>
        <ul className="secondcolumn">
          <li>
            <a href="/terms">Terms of Use</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          {/* <Link to="/faq"> */}
          <li>
            <a href="/faq">FAQ</a>
          </li>
          {/* </Link> */}
          {/* <li>Help</li> */}
        </ul>

        <ul className="thirdcolumn">
          <li></li>

          <li></li>
          <li className="fc10">
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.facebook.com/speakerore"
              >
                <BsFacebook />
              </a>
            </span>
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.instagram.com/speakerore"
              >
                <BsInstagram />
              </a>
            </span>
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/speakerore/"
              >
                <BsLinkedin />
              </a>{" "}
            </span>
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.twitter.com/speakerore"
              >
                <BsTwitter />
              </a>
            </span>
          </li>
          <li>Social Handles</li>
        </ul>
      </div>
      <p className="copyright-line">Copyright &copy; 2021 SpeakerOre</p>
    </>
  );
}
