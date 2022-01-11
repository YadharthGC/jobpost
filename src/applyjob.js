import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./sjob.css";

function Applyjob() {
  const [datas, setdatas] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    post();
  }, []);

  // useEffect(() => {
  //   fetch();
  // }, []);

  let post = async () => {
    try {
      let ids = window.localStorage.idz;
      console.log(ids);
      let post = await axios.post(
        "http://localhost:3002/view",
        { ids },
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

  let handlesubmit = async (e) => {
    let did = window.localStorage.idz;
    console.log(did, e);
    try {
      let post = await axios.post(
        "http://localhost:3002/delapply",
        {
          did,
          e,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert(post.data.message);
      if (post.data.status === true) {
        navigate(`/my-Applications/${window.localStorage.idz}`, {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // let fetch = async () => {
  //   try {
  //     let get = await axios.get("http://localhost:3002/view", {
  //       headers: {
  //         Authorization: window.localStorage.getItem("app_token"),
  //       },
  //     });
  //     setdatas([...get.data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      <div className="bs">
        {" "}
        <div className="heading">My Applications</div>
        <div className="full">
          <div className="fullbox">
            {datas.map((data) => {
              return (
                <div className="row" id="row">
                  <div
                    className="col-lg-12"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="appname">
                          <span style={{ textDecoration: "underline" }}>
                            {data.position}-
                          </span>
                          {data.company}
                        </div>
                        <div className="appsalary">Rs {data.salary}/-</div>
                        <div>
                          <div className="appsalary">
                            <span className="key"> Skills:</span>
                            <span className="keyans"> {data.skills}</span>
                          </div>
                        </div>
                        <div>
                          <span className="key">Type:</span>
                          <span className="keyans"> {data.type}</span>
                        </div>
                        <div>
                          <span className="key">Application Lastdate:</span>
                          <span className="keyans"> {data.ldate}</span>
                        </div>
                        <div>
                          <span className="key">Posted on:</span>
                          <span className="keyans">{data.pdate}</span>
                        </div>
                        <div>
                          <span className="key">Posted by:</span>
                          <span className="keyans">{data.name}</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="appbutton">
                          <div className="apply">
                            <button
                              className="applybox"
                              onClick={() => {
                                handlesubmit(data.token);
                              }}
                              style={{ backgroundColor: "red" }}
                            >
                              Withdraw
                            </button>
                          </div>
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
    </div>
  );
}

export default Applyjob;
