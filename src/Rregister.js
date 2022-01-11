import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./app.css";

function Rregister() {
  const [fname, setfname] = useState([]);
  const [lname, setlname] = useState([]);
  const [wru, setwru] = useState([]);
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [cpassword, setcpassword] = useState([]);
  const navigate = useNavigate();

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      if (password === cpassword) {
        let post = await axios.post(
          "https://yadharthjp.herokuapp.com/register",
          {
            fname,
            lname,
            wru,
            gmail,
            password,
          }
        );
        window.alert(post.data.message);
        if (post.data.status === true) {
          navigate("/recruiter-login", { replace: true });
        }
      } else {
        console.log("post error");
        alert("check password");
      }
      console.log(e);
    } catch (error) {}
  };

  return (
    <div className="RREGISTER">
      <div className="rregister">
        <div className="rregisterbox">
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="heading">Recruiter Register</div>
            <div className="name">
              <input
                type="text"
                value={fname}
                onChange={(e) => {
                  setfname(e.target.value);
                }}
                placeholder="first name"
                id="fname"
                style={{ width: "38.5%" }}
              />
              <input
                type="text"
                value={lname}
                onChange={(e) => {
                  setlname(e.target.value);
                }}
                placeholder="last name"
                id="lname"
                style={{ width: "38.5%" }}
              />
            </div>

            <div className="gmail">
              <input
                type="text"
                placeholder="Gmail"
                id="gmail"
                value={gmail}
                onChange={(e) => {
                  setgmail(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="cpassword">
              <input
                type="password"
                placeholder="Confirm password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
            </div>
            <div className="submit">
              <input type="submit" value="Register" id="submit" />
            </div>
            <div className="al">
              <Link to="/recruiter-login" style={{ textDecoration: "none" }}>
                Already Registered?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Rregister;
