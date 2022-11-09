import "../css/About2.css";
import "../css/addeventpage.css";
import LoggedInSidebar from "../accountSide/LoggedInSidebar";
import emailjs from 'emailjs-com';


export default function contact() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_exok2jl', 'template_vu51ijp', e.target, 'Z6VA164E44Gs7X2kR')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
  return (
    <>
      <div className="mp-parent">
        <form onSubmit={sendEmail}>
          <h2>&nbsp;&nbsp;&nbsp;Contact Us</h2>
          <br />
          <div className="mp-left">
            <div className="mp-lower">
              <div className="mpl-left">
                <div className="mplower-body">
                  <div className="mpedit-section">
                    <div className="mpes-form">
                      <p>Name</p>
                      <input
                        type="text"
                        className="mpes-input"
                        placeholder="Write Here"
                        name="name"
                      />
                      <p>Email</p>

                      <input
                        type="email"
                        className="mpes-input"
                        placeholder="Write Here"
                        name="email"
                      />

                      <p>Message</p>
                      <textarea
                        rows="10"
                        cols="120"
                        name="message"
                        placeholder="Write Your Message"
                        style={{
                          background: "#fff",
                          borderRadius: "10px",
                          padding: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      ></textarea>
                      <br />
                      <button type="submit" className="mpes-btn">Send</button>
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
