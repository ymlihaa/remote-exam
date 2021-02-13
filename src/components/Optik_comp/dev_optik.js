import React, { useState, useEffect } from "react";
import axios from "axios";
import AnswerInput from "../Button";
import ExamAlert from "../ExamAlert";
import AYT from "../examTypeJson/AYT_info";
import TYT from "../examTypeJson/TYT_info";
import YDS from "../examTypeJson/YDS_info";

import { ChevronLeft } from "@material-ui/icons";

export default function Dev_Optik({ setAlertType, User, stateOptik, lesson }) {
  const [result, setResult] = useState(stateOptik);
  const [startIndex, setStart] = useState(0);
  const [wait, setWait] = useState(false);
  const [alert, setAlert] = useState("");
  const [lessons, setLessons] = useState({});

  // COMPONENT DİD MOUNT

  useEffect(() => {
    let localStore = JSON.parse(localStorage.getItem("resultArr"));
    setResult(localStore);
    travelJson();
  }, []);

  // COMPONENT UPDATE

  useEffect(() => {
    localStorage.setItem("resultArr", JSON.stringify(result));
    console.log("changed result : ", result);
  }, [result]);

  const addClick = (index, val, lessonName) => {
    const localStore = JSON.parse(localStorage.getItem("resultArr"));
    const temp = result[lessonName];
    if (temp[lessonName] == undefined) {
      temp[lessonName] = localStore ? localStore[lessonName] : [];
    }
    temp[lessonName][index] = val.toUpperCase();
    setResult({ ...result, [lessonName]: temp[lessonName] });
    // let localStore = {
    //   ...JSON.parse(localStorage.getItem("resultArr")),
    // };

    // if (result[lessonName] == undefined) {
    // result[lessonName] = [];
    // temp = result[lessonName];
    // console.log("this undefined");
    // } else if (localStore[lessonName]) {
    // result[lessonName] = [...localStore[lessonName]];
    // temp = result[lessonName];

    // setResult(localStore);
    // console.log("localRes", localStore[lessonName]);
    // console.log("this lcoalStro result", result);
    // }
    // console.log("resulLessonName", result[lessonName]);
    // temp = result[lessonName];
    // temp.push({ index: index, key: val });

    // setResult({ ...result, [lessonName]: temp });
  };

  const nextPage = () => {
    setAlert("upperAlert");
  };
  const prevPage = () => {
    setAlert("lowerAlert");
  };
  const finishExam = async () => {
    setWait(true);
    // await axios
    //   .post("http://localhost:8099/exam/finish", {
    //     data: {
    //       user: User,
    //       result: result ? result : localStorage.getItem("result"),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setAlert("finishExam");
    //     setWait(false);
    //     localStorage.removeItem("user");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setWait(false);
    //   });
    setAlert("finishExam");
    setWait(false);
    localStorage.removeItem("user");
    localStorage.removeItem("resultArr");
  };

  const drawForm = (index, name, limit) => {
    const temp = lessons;
    const localStore = { ...JSON.parse(localStorage.getItem("resultArr")) };
    if (temp[name] === undefined) {
      temp[name] = [];
    }
    for (let i = 0; i < limit; i++) {
      temp[name].push(
        <li>
          <span>{i + 1} . soru</span>
          <AnswerInput
            id={i}
            addclick={addClick}
            selectRadio={
              localStore[name] === undefined ? "" : localStore[name][i]
            }
          />
        </li>
      );
      setLessons((lessons) => temp);
    }
  };

  const travelJson = () => {
    Object.keys(lesson).map((key, index) => {
      drawForm(index, key, lesson[key]);
    });
  };

  const card_Box = {
    width: "100%",
    height: "75vh",
    overflowY: " scroll",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  return (
    <>
      <ExamAlert alertType={alert} />

      <div className="card p-3 mb-5 bg-white rounded">
        <div className="card-body"></div>
        <div style={card_Box}>
          {/* <AnswerInput addclick={addClick} />
           */}

          {Object.keys(lessons).map((key) => {
            return <div className={key}>{lessons[key]}</div>;
          })}
        </div>
        <div
          className="btn-group  d-flex 
            justify-content-center
            align-items-center
            pt-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-primary  m-1"
            onClick={prevPage}
          >
            Önceki Sayfa
          </button>
          <button
            type="button"
            className="btn btn-success m-1"
            onClick={nextPage}
          >
            Sonraki Sayfa
          </button>
          <button
            onClick={finishExam}
            type="button"
            className="btn btn-danger  m-1"
            disabled={wait}
          >
            Sınavı Bitir
          </button>
        </div>
      </div>
    </>
  );
}
// TODO:ekrana bas
