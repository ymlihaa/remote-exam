import { LocalGasStation } from "@material-ui/icons";
import React, { useEffect, useContext, useRef, useState } from "react";
import AppContext from "../context/app-context";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import bg from "./studentlogin.svg";
import avatar from "./stars.svg";
import axios from "axios";

import moment from "moment";

export default function Join({ dispatch }) {
  const usernameRef = useRef();
  const surnameRef = useRef();
  const studentNumberRef = useRef();
  const examIDRef = useRef();
  const thisContext = useContext(AppContext);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    checkTime();
    setLoading(false);
  }

  function checkTime() {
    const dates = [];
    const nowDate = new Date().getTime();
    axios({
      method: "post",
      url: "http://localhost:8099/exam/getOne",
      data: {
        examID: examIDRef.current.value,
      },
    })
      .then((res) => {
        console.log(res.data);
        dates.push(res.data.startTime);
        dates.push(res.data.endTime);
        datesParse(dates, nowDate);
      })
      .catch((err) => {
        setError("İşlem Gerçekleştirilemedi .");
      });
  }

  async function datesParse(arr, now) {
    let temp_now = new moment();
    let start = new moment(arr[0]);
    let end = new moment(arr[1]);
    let db_duration = moment.duration(end.diff(start));
    let cl_duration = moment.duration(temp_now.diff(start));
    db_duration = db_duration.as("minutes");
    cl_duration = cl_duration.as("minutes");

    console.log("db diff : ", db_duration);
    console.log("cl diff : ", cl_duration);

    if (cl_duration >= 0 && cl_duration <= db_duration) {
      console.log("Sınav Kullanılabilir ...");
      await requestOptik();
    } else {
      setError("Bu sınav Kullanılamaz. ");
    }
  }

  function addcl(e) {
    let parent = e.target.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl(e) {
    let parent = e.target.parentNode.parentNode;
    console.log(e.target.value);
    if (e.target.value == "") {
      parent.classList.remove("focus");
    }
  }

  async function requestOptik() {
    try {
      await thisContext.dispatch({
        type: "setState",
        name: usernameRef.current.value,
        surname: surnameRef.current.value,
        studentNumber: studentNumberRef.current.value,
        ExamID: examIDRef.current.value,
        onAuth: true,
      });
    } catch {
      setError("İşlem Gerçekleştirilemedi .");
    }
  }

  return (
    <>
      <img src={bg} alt="bg" className="bg" />
      <div className="bg">{/* <img src={} /> */}</div>
      <div className="teacher-container">
        <div className="left"></div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="avatar" />
            <h2 className="title">Login</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Name</h5>
                <input
                  tabIndex={1}
                  ref={usernameRef}
                  type="text"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>

              <div className="div">
                <h5>Last Name</h5>
                <input
                  tabIndex={2}
                  ref={surnameRef}
                  type="text"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i class="fas fa-sort-numeric-up-alt"></i>{" "}
              </div>
              <div className="div">
                <h5>Student Number</h5>
                <input
                  tabIndex={3}
                  ref={studentNumberRef}
                  type="text"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i class="fas fa-key"></i>{" "}
              </div>
              <div className="div">
                <h5>Exam ID</h5>
                <input
                  tabIndex={4}
                  ref={examIDRef}
                  type="text"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>

            <span tabIndex={6}>
              <Link to="/teacher">Öğretmen Girişi</Link>
            </span>
            <input
              tabIndex={5}
              disabled={loading}
              type="submit"
              value="Join"
              className="teacher-btn"
            />
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
