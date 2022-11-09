import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./components/css/global.css";
import Addeventpage from "./components/Events/Addeventpage";
import Navbar from "./components/Header/Navbar";
import Firstpage from "./components/Home/Firstpage";
import Categories from "./components/Categories/Categories";
// import Event from "./components/Event";
import Footer from "./components/Footer/Footer";
import Eventpage from "./components/Events/Eventpage";
import EventError from "./ErrorPages/EventError";
import About2 from "./components/About/About2";
import ModeratorProfile from "./components/Moderator/ModeratorProfile";
import MyProfile from "./components/Profile/MyProfile";
import BasicInfo from "./components/accountSide/BasicInfo";
import BillingInformation from "./components/Billing/BillingInformation";
import BookmarkedEvent from "./components/Bookmark/BookmarkedEvent";
import SingleEventPage from "./components/Events/SingleEventPage";
import MODSingleEventPage from "./components/Events/MODSingleEventPage";
import MyProfileEvent from "./components/Profile/MyProfileEvent";
import SingleEventPageExclusive from "./components/Events/SingleEventPageExclusive";
import SignInUp from "./components/Profile/SignInUp";
import SubPlan from "./components/Plans/SubPlan";
import ModeratorDummy1 from "./components/Moderator/ModeratorDummy1";
import ModeratorDummy2 from "./components/Moderator/ModeratorDummy2";
import ModeratorDummy3 from "./components/Moderator/ModeratorDummy3";
import ModeratorDummy4 from "./components/Moderator/ModeratorDummy4";
import Terms from "./components/Team/terms";
import Privacy from "./components/Terms/privacy";
import PurchaseError from "./ErrorPages/purchaseError";
import SigneEeror from "./ErrorPages/SignIn";
import EventMod from "./components/Events/EventMod";
import Auth from "./components/Auth";
import Exclusiveevent from "./components/Terms/Exclusiveevent";
// import Test from "./components/Test";
import Exevent from "./components/Events/Exevents";
import Faq from "./components/FAQ/Faq";
import { Task } from "@mui/icons-material";
import { useState } from "react";
import Contact from "./components/About/contact";

function PrivateRoute({ component: Component, ...rest }) {
  let auth = JSON.parse(localStorage.getItem("@token"))?.token;
  if (auth) {
    return <Component />;
  }
  return <Navigate to="/login" />;
}

const App = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("@token"))?.token
  );

  const setLogin = () => {
    setAuth(JSON.parse(localStorage.getItem("@token"))?.token);
  };

  return (
    <>
      <Navbar auth={auth} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/about" element={<About2 />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/addevent"
            element={<PrivateRoute component={Addeventpage} />}
          />
          <Route
            path="/events"
            element={auth ? <EventMod /> : <EventError />}
          />
          <Route
            path="/mod-event"
            element={<PrivateRoute component={EventMod} />}
          />
          <Route path="/404" element={<PurchaseError />} />
          <Route path="/500" element={<SigneEeror />} />
          <Route
            path="/myprofile"
            element={<PrivateRoute component={MyProfile} />}
          />
          <Route path="/bookmark" element={<BookmarkedEvent />} />
          <Route path="/exevent/:id" element={<Exclusiveevent />} />
          <Route
            path="/event/:id"
            element={<PrivateRoute component={SingleEventPage} />}
          />
          <Route
            path="/modevent/:id"
            element={<PrivateRoute component={MODSingleEventPage} />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<SignInUp setLogin={setLogin} />} />
          <Route path="/subplan" element={<SubPlan />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />

          {/* <Route path="/bill" element={<BillingInformation />} />
          <Route
            path="/moderator"
            element={<PrivateRoute component={ModeratorProfile} />}
          />
          <Route
            path="/basicinfo"
            element={<PrivateRoute component={BasicInfo} />}
          />
          <Route
            path="/single-event-ex/:id"
            element={<PrivateRoute component={SingleEventPageExclusive} />}
          />
          <Route
            path="/single-event-ex"
            element={<PrivateRoute component={SingleEventPageExclusive} />}
          />
          <Route path="/myprofile-event" element={<MyProfileEvent />} />
          <Route path="/mod-dummy1" element={<ModeratorDummy1 />} />
          <Route path="/mod-dummy2" element={<ModeratorDummy2 />} />
          <Route path="/mod-dummy3" element={<ModeratorDummy3 />} />
          <Route path="/mod-dummy4" element={<ModeratorDummy4 />} />
          <Route path="/authorize" element={<Auth />} />
          <Route path="/exevent" element={<Exevent />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
