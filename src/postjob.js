import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
function Add() {
  const [position, setposition] = useState([]);
  const [company, setcompany] = useState([]);
  const [salary, setsalary] = useState([]);
  const [type, settype] = useState([]);
  const [ldate, setldate] = useState([]);
  const [skills, setskills] = useState([]);
  const date = new Date();
  const navigate = useNavigate();

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      let day = date.getDay() + 1;
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let pdate = day + "/" + month + "/" + year;
      ldate.toString();
      let post = await axios.post(
        "https://yadharthjp.herokuapp.com/post",
        {
          date,
          position,
          company,
          salary,
          type,
          ldate,
          skills,
          pdate,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert(post.data.message);
      if (post.data.status === true) {
        navigate("/job-applications", { replace: true });
      }
    } catch (error) {
      console.log("error");
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
                    <Link style={{ textDecoration: "none" }} to="/post-a-job">
                      <span style={{ color: "gray" }}>Add Jobs</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/job-applications"
                    >
                      <span style={{ color: "gray" }}>My Jobs</span>
                    </Link>
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    window.localStorage.removeItem("app_token");
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
        <div className="add">
          <div className="addbox">
            <div className="headingb">Post a Job vacany</div>
            <form
              onSubmit={(e) => {
                handlesubmit(e);
              }}
            >
              <div classNme="position">
                <input
                  type="text"
                  placeholder="Job position"
                  id="position"
                  value={position}
                  onChange={(e) => {
                    setposition(e.target.value);
                  }}
                />
              </div>
              <div className="cname">
                <input
                  type="text"
                  placeholder="Company name"
                  id="cname"
                  value={company}
                  onChange={(e) => {
                    setcompany(e.target.value);
                  }}
                />
              </div>
              <div className="salary">
                <input
                  type="text"
                  placeholder="Salary"
                  id="salary"
                  value={salary}
                  onChange={(e) => {
                    setsalary(e.target.value);
                  }}
                />
              </div>
              <div className="salary">
                <input
                  type="text"
                  placeholder="Skills"
                  id="salary"
                  onChange={(e) => {
                    setskills(e.target.value);
                  }}
                />
              </div>
              <div className="jtype">
                <select
                  id="jtype"
                  value={type}
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                >
                  <option value="">Job-Type</option>
                  <option value="Full time">Full time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="ldate">
                <div className="al">Application Lastdate:</div>
                <input
                  type="date"
                  id="ldate"
                  value={ldate}
                  onChange={(e) => {
                    setldate(e.target.value);
                  }}
                />
              </div>
              <div className="postsubmit">
                <input type="submit" id="postsubmit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
