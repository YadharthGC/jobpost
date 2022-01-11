import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./app.css";

function Land() {
  const navigate = useNavigate();
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
                    <Link style={{ textDecoration: "none" }} to="student-login">
                      <span style={{ color: "gray" }}>Candidate</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="recruiter-login"
                    >
                      <span style={{ color: "gray" }}>Recruiter</span>
                    </Link>
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
      <div className="spl">
        <div className="splbox">
          <div className="jj">JP</div>
          <div className="wel"> Welcome to Jobportal</div>
          <div className="btns">
            <Link to="/student-login">
              <button type="button" class="btn btn-info" id="bta">
                Candidate
              </button>
            </Link>
            <Link to="/recruiter-login">
              <button type="button" class="btn btn-info" id="btb">
                Recruiter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Land;
