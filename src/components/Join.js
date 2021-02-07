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

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     await thisContext.dispatch({
  //       type: "setState",
  //       name: usernameRef.current.value,
  //       surname: surnameRef.current.value,
  //       studentNumber: studentNumberRef.current.value,
  //       ExamID: examIDRef.current.value,
  //       onAuth: true,
  //     });
  //   } catch {
  //     setError("İşlem Gerçekleştirilemedi .");
  //   }

  //   setLoading(false);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const examID = examIDRef.current.value;
    axios
      .post("http://localhost:8099/exam/getOne", { examID })
      .then((res) => {
        console.log(res.data);
        calculateTimeDiff(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setError("İşlem Gerçekleştirilemedi !");
      });
  }

  async function calculateTimeDiff(timeObj) {
    let timeType;
    let start = moment(timeObj.startTime);
    let stop = moment(timeObj.endTime);
    let now = moment();
    let diff_time = now.diff(start, "minutes");

    const User = {
      name: usernameRef.current.value,
      surname: surnameRef.current.value,
      studentNumber: studentNumberRef.current.value,
      ExamID: examIDRef.current.value,
      onAuth: true,
      type: timeObj.type,
    };

    switch (timeObj.type) {
      case "TYT":
        timeType = 135;
      case "AYT":
        timeType = 180;
      case "YDS":
        timeType = 135;
    }
    console.log("times between diff", diff_time);

    if (diff_time > 0 && diff_time < timeType) {
      console.log("success");
      await thisContext.dispatch({
        type: "setState",
        User,
      });
    } else {
      console.log("failed");
      setError("Sınav Geçersiz !");
    }
    setLoading(false);
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
