import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import "./sregister.css";

function Jobapp() {
  const [datas, setdatas] = useState([]);
  const [success, setsuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
    setsuccess(false);
  }, [success]);

  let fetch = async () => {
    try {
      let get = await axios.get("https://yadharthjp.herokuapp.com/get", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setdatas([...get.data]);
    } catch (error) {
      console.log(error);
    }
  };

  let handledel = async (e) => {
    try {
      console.log("delete");
      window.alert("deleted");
      await axios
        .post(
          "https://yadharthjp.herokuapp.com/getdel",
          { e },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            setsuccess(true);
          }
        });

      // window.alert(post.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bs">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div></div>
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
      <div className="headingb">Jobs Application</div>
      <div className="outer">
        <div>
          {datas.map((data) => {
            console.log(data.skills);
            let sks = data.skills;
            return (
              <div className="row" id="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="appname">
                        <span style={{ textDecoration: "underline" }}>
                          {data.position}
                        </span>
                        {"(" + data.company + ")"}
                      </div>
                      <div className="appsalary">
                        {"Rs" + data.salary + "/-"}
                      </div>
                      <div>
                        <div className="appsalary">
                          <span className="key"> Skills:</span>
                          <span className="keyans">{data.skills}</span>
                        </div>
                      </div>
                      <div>
                        <span className="key">Type:</span>
                        <span className="keyans">{data.type}</span>
                      </div>
                      <div>
                        <span className="key">Application Lastdate:</span>
                        <span className="keyans">{data.ldate}</span>
                      </div>
                      <div>
                        <span className="key">Posted on:</span>
                        <span className="keyans">{data.pdate}</span>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="appbutton">
                        <button
                          type="button"
                          class="btn btn-info"
                          id="appbutton"
                        >
                          <Link
                            to={`/job-applications/${data._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <span style={{ color: "white" }}>
                              View Applications
                            </span>
                          </Link>
                        </button>
                      </div>
                      <div className="appbutton">
                        <button
                          type="button"
                          class="btn btn-danger"
                          id="appbutton"
                          onClick={() => {
                            handledel(data._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Jobapp;
