import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./sregister.css";
import { storage } from "./firebase";

function Sregister() {
  const [fname, setfname] = useState([]);
  const [lname, setlname] = useState([]);
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [cpassword, setcpassword] = useState([]);
  const [clg, setclg] = useState([]);
  const [major, setmajor] = useState([]);
  const [start, setstart] = useState([]);
  const [end, setend] = useState([]);
  const [skills, setskills] = useState([]);
  const [pdf, setpdf] = useState([]);
  const navigate = useNavigate();

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const uploadtask = storage.ref(`images/${pdf.name}`).put(pdf);
      uploadtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("error32");
        },
        () => {
          try {
            storage
              .ref("images")
              .child(pdf.name)
              .getDownloadURL()
              .then(async (url) => {
                try {
                  console.log(url);

                  let posta = await axios.post(
                    "http://localhost:3002/candidate",
                    {
                      fname,
                      lname,
                      skills,
                      gmail,
                      password,
                      major,
                      clg,
                      start,
                      end,
                      url,
                    }
                  );
                  window.alert(posta.data.message);
                  if (posta.data.status) {
                    navigate("/student-login", { replace: true });
                  }
                } catch (error) {
                  console.log("erorre");
                  console.log(error);
                }
              });
          } catch (error) {
            console.log("storage error");
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log("handlesubmit error");
      console.log("error");
    }
  };

  return (
    <div>
      <div className="register" style={{ backgroundColor: "lightgray" }}>
        <div className="box" style={{ backgroundColor: "white" }}>
          <div className="sheading">Candidate Register</div>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="name">
              <input
                type="text"
                value={fname}
                onChange={(e) => {
                  setfname(e.target.value);
                }}
                placeholder="first name"
                id="fname"
                required
              />
              <input
                type="text"
                value={lname}
                onChange={(e) => {
                  setlname(e.target.value);
                }}
                placeholder="last name"
                id="lname"
                required
              />
            </div>
            <div className="gmail">
              <input
                type="text"
                value={gmail}
                onChange={(e) => {
                  setgmail(e.target.value);
                }}
                placeholder="gmail"
                id="sgmail"
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="password"
                id="spassword"
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
                placeholder="confirm password"
                id="spassword"
                required
              />
            </div>
            <div className="education">
              <div>
                <input
                  type="text"
                  placeholder="Degree & Major"
                  value={major}
                  onChange={(e) => {
                    setmajor(e.target.value);
                  }}
                  id="smajor"
                  required
                />
                <input
                  type="text"
                  placeholder="College name"
                  value={clg}
                  onChange={(e) => {
                    setclg(e.target.value);
                  }}
                  id="clg"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="start year"
                  value={start}
                  onChange={(e) => {
                    setstart(e.target.value);
                  }}
                  id="start"
                  required
                />
                <input
                  type="text"
                  placeholder="end year"
                  value={end}
                  onChange={(e) => {
                    setend(e.target.value);
                  }}
                  id="end"
                  required
                />
              </div>
            </div>
            <div className="password">
              <input
                type="text"
                value={skills}
                onChange={(e) => {
                  setskills(e.target.value);
                }}
                placeholder="skills"
                id="spassword"
                required
              />
            </div>
            <div className="password">
              <div className="sheading" style={{ fontSize: "16px" }}>
                <u>
                  <span>Resume Upload:</span>
                </u>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setpdf(e.target.files[0]);
                }}
                placeholder="skills"
                id="spassword"
                required
              />
            </div>
            <div className="ssubmit">
              <input value="submit" type="submit" id="ssubmit" />
              <div
                className="sal"
                onClick={() => {
                  navigate("/student-login", { replace: true });
                }}
              >
                Already a Candidate?
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sregister;
