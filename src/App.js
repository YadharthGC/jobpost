import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Land from "./home";
import Rregister from "./Rregister";
import Rlogin from "./Rlogin";
import Add from "./postjob";
import Jobapp from "./Rjob";
import Viewapp from "./viewapp";
import Sregister from "./Sregister";
import Slogin from "./Slogin";
import Sjob from "./joboffers";
import Sjobapp from "./applyjob";
import Cprofile from "./cprofile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Land />} exact={true} />
          <Route path="/register" element={<Rregister />} exact={true} />
          <Route path="/recruiter-login" element={<Rlogin />} exact={true} />
          <Route path="/post-a-job" element={<Add />} exact={true} />
          <Route path="/job-applications" element={<Jobapp />} exact={true} />
          <Route
            path="/job-applications/:id"
            element={<Viewapp />}
            exact={true}
          />
          <Route
            path="/candidate-profile/:id"
            element={<Cprofile />}
            exact={true}
          />
          <Route
            path="/student-register"
            element={<Sregister />}
            exact={true}
          />
          <Route path="/student-login" element={<Slogin />} exact={true} />
          <Route path="/job-offers/:id" element={<Sjob />} exact={true} />{" "}
          <Route
            path="/my-Applications/:id"
            element={<Sjobapp />}
            exact={true}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
