import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./app.css";

function Viewapp() {
  const navigate = useNavigate();
  const params = useParams();
  const did = params.id;
  const [datas, setdatas] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  let fetch = async () => {
    try {
      let post = await axios.post(
        "https://yadharthjp.herokuapp.com/cview",
        {
          did,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      console.log(post.data.finals);
      setdatas([...post.data.finals]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bss">
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
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => {
                      window.localStorage.removeItem("app_token");
                      window.localStorage.removeItem("idz");
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
      <div className="outer">
        <div className="row" id="row">
          <div className="col-lg-12">
            {datas.map((data) => {
              return (
                <div className="row">
                  <div className="col-lg-8">
                    <div className="appname">
                      <span style={{ textDecoration: "underline" }}>
                        {data.fname} {data.lname}
                      </span>
                    </div>
                    <div>
                      <span className="key">Highest Graduation:</span>
                      <span className="keyans">{data.major}</span>
                    </div>
                    <div>
                      <span className="key">Skills</span>
                      <span className="keyans">{data.skills}</span>
                    </div>

                    <div>
                      <span className="key">Applied on:</span>
                      <span className="keyans">03/2/2023</span>
                    </div>

                    <div>
                      <span className="key">Gmail:</span>
                      <span className="keyans">{data.gmail}</span>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="appbutton">
                      <a href={data.url} target="_blank">
                        <button
                          type="button"
                          class="btn btn-info"
                          id="appbutton"
                        >
                          View Resume
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewapp;
