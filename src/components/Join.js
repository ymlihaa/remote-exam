import { LocalGasStation } from "@material-ui/icons";
import React, { useEffect, useContext, useRef, useState } from "react";
import AppContext from "../context/app-context";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import bg from "./studentlogin.svg";
import avatar from "./stars.svg";
import axios from "axios";

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
    let start, end;
    let temp_s, temp_e;
    let different_times_db, different_times_client;
    let different_days_db, different_days_client;
    let temp = arr[0].replace(/\D/g, " ");
    let temp_one = arr[1].replace(/\D/g, " ");
    temp = temp.split(" ");
    temp_one = temp_one.split(" ");
    console.log("datesParseMethod:", temp[0]);

    start = new Date(
      parseInt(temp[0]),
      parseInt(temp[1]) - 1,
      parseInt(temp[2]),
      parseInt(temp[3]),
      parseInt(temp[4]),
      parseInt(temp[5])
    );
    end = new Date(
      parseInt(temp_one[0]),
      parseInt(temp_one[1]) - 1,
      parseInt(temp_one[2]),
      parseInt(temp_one[3]),
      parseInt(temp_one[4]),
      parseInt(temp_one[5])
    );

    temp_s = start.getTime();
    temp_e = end.getTime();

    different_times_db = temp_e - temp_s;
    different_times_client = now - temp_s;
    different_days_db = different_times_db / (1000 * 3600 * 24);
    different_days_client = different_times_client / (1000 * 3600 * 24);

    if (
      different_days_client == 0 ||
      different_days_client <= different_days_db
    ) {
      console.log("Sınav kullanılabilir :", different_days_client);
      console.log("client :", different_days_client);
      console.log("db :", different_days_db);
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

//  <div
//       className="d-flex align-items-center justify-content-center "
//       style={{ minHeight: "100vh" }}
//     >
//       <div className="card p-3 mb-5 bg-white rounded">
//         <div className="card-body">
//           <h2 className="text-center mb-4">Sınava Gir</h2>
//           <form>
//             <div className="form-col p-3">
//               <div className=" form-group row mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="First name"
//                   required
//                 ></input>
//               </div>
//               <div className="form-group row mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Last name"
//                   required
//                 ></input>
//               </div>
//               <div className="form-group row mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Student Number"
//                   required
//                 ></input>
//               </div>
//               <button
//                 onClick={() => {
//                   thisContext.dispatch({
//                     type: "setState",
//                     name: currentUser.name,
//                     surname: currentUser.surname,
//                     studentNumber: currentUser.studentNumber,
//                     isTrue: currentUser.isTrue,
//                   });
//                 }}
//                 type="button"
//                 className="btn btn-primary w-100 text-center mt-3"
//               >
//                 Join
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
