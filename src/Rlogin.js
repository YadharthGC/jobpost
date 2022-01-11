import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, usePatrams } from "react-router-dom";
import "./app.css";

function Rlogin() {
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const navigate = useNavigate();

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      let post = await axios.post("https://yadharthjp.herokuapp.com/login", {
        gmail,
        password,
      });
      window.alert(post.data.message);
      if (post.data.status === false) {
        navigate("/register", { replace: true });
      } else if (post.data.status === true) {
        window.localStorage.setItem("app_token", post.data.token);
        window.localStorage.setItem("idz", post.data.did);
        navigate("/post-a-job", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="RREGISTER">
      <div className="rregister">
        <div className="rlbox">
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="heading">Recruiter Login</div>
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
            <div className="ala">
              <Link to="/register">New Register?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Rlogin;
