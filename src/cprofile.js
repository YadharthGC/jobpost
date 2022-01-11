import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./sjob.css";

function Cprofile() {
  const [datas, setdatas] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    post();
  }, []);

  let post = async () => {
    try {
      let ids = window.localStorage.idz;
      console.log(ids);
      let post = await axios.post(
        "http://localhost:3002/profile",
        { ids },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      console.log(post.data.get);
      setdatas([post.data.get]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <span className="JP">JP</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"> </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span className="bp">Jobportal</span>
                </a>
              </li>
            </ul>
            <form class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/candidate-profile/${window.localStorage.idz}`}
                    >
                      <span style={{ color: "gray" }}>Profile</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/job-offers/${window.localStorage.idz}`}
                    >
                      <span style={{ color: "gray" }}>Job-offers</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/my-Applications/${window.localStorage.idz}`}
                    >
                      <span style={{ color: "gray" }}>Applications</span>
                    </Link>
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    window.localStorage.removeItem("app_token");
                    window.localStorage.removeItem("idz");
                    navigate("/", { replace: true });
                  }}
                >
                  <a class="nav-link" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
      <div className="bss">
        <div className="heading">My Profile</div>
        <div className="profile">
          {datas.map((data) => {
            return (
              <div className="profilebox">
                <div>
                  <span className="key">Name:</span>
                  <span className="keyans">
                    {data.fname} {data.lname}
                  </span>
                </div>
                <div>
                  <span className="key">Gmail:</span>
                  <span className="keyans">{data.gmail}</span>
                </div>
                <div>
                  <span className="key">Highest Graduation:</span>
                  <span className="keyans">{data.major}</span>
                </div>
                <div>
                  <span className="key">Institution name:</span>
                  <span className="keyans">{data.clg}</span>
                </div>
                <div>
                  <span className="key">Year:</span>
                  <span className="keyans">
                    {data.start}-{data.end}
                  </span>
                </div>
                <div>
                  <span className="key">Skills:</span>
                  <span className="keyans">{data.skills}</span>
                </div>
                <div className="keyans">
                  <a href={data.url} target="_blank">
                    <button type="button" class="btn btn-primary">
                      Resume
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cprofile;
