import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, usePatrams } from "react-router-dom";
import "./app.css";

function Slogin(props) {
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const navigate = useNavigate();
  const [ids, setids] = useState("");

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      let post = await axios.post("https://yadharthjp.herokuapp.com/clogin", {
        gmail,
        password,
      });
      window.alert(post.data.message);
      if (post.data.status === false) {
        navigate("/register", { replace: true });
      } else if (post.data.status === true) {
        window.localStorage.setItem("app_token", post.data.token);
        window.localStorage.setItem("idz", post.data.did);
        setids(post.data.did);
        navigate(`/job-offers/${post.data.did}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="RREGISTER">
      <div className="rregister" style={{ backgroundColor: "lightgray" }}>
        <div className="rlbox" style={{ backgroundColor: "white" }}>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="heading">Candidate Login</div>
            <div className="gmail">
              <input
                type="text"
                placeholder="Gmail"
                id="lgmail"
                value={gmail}
                onChange={(e) => {
                  setgmail(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <input
                type="text"
                placeholder="Password"
                id="lpassword"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="submit">
              <input type="submit" value="Login" id="submit" />
            </div>
            <div
              className="sal"
              onClick={() => {
                navigate("/student-register", { replace: true });
              }}
            >
              New Register?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Slogin;
