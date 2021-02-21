import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Table } from "antd";

import axios from "axios";
import AnswerInput from "../Button";
import ExamAlert from "../ExamAlert";
import AYT from "../examTypeJson/AYT_info";
import TYT from "../examTypeJson/TYT_info";
import YDS from "../examTypeJson/YDS_info";

import { ChevronLeft } from "@material-ui/icons";

export default function Dev_Optik({ setAlertType, User, stateOptik, lesson }) {
  const columns = [{ title: "Sorular", dataIndex: "element", key: "element" }];
  const [dataSource, setData] = useState([]);
  const [result, setResult] = useState(stateOptik);
  const [startIndex, setStart] = useState(0);
  const [wait, setWait] = useState(false);
  const [alert, setAlert] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [lessons, setLessons] = useState({});
  const history = useHistory();

  // COMPONENT DİD MOUNT

  useEffect(() => {
    let localStore = JSON.parse(localStorage.getItem("resultArr"));
    setResult(localStore);
    travelJson();
    console.log("dataSource:", dataSource);
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
      temp[lessonName] = localStore && localStore[lessonName];
    }
    temp[lessonName][index] = val.toUpperCase();
    setResult((result) => ({ ...result, [lessonName]: temp[lessonName] }));
  };

  const finishExam = async () => {
    setWait(true);
    await axios
      .post("http://localhost:8099/exam/finish", {
        data: {
          user: User,
          result: result ? result : localStorage.getItem("result"),
        },
      })
      .then((res) => {
        console.log(res);
        setAlert("finishExam");
        setWait(false);
        setRedirect(true);
        localStorage.removeItem("user");
        localStorage.removeItem("resultArr");
      })
      .catch((err) => {
        console.log(err);
        setWait(false);
      });
  };

  const drawForm = (name, limit) => {
    for (let i = 0; i < limit; i++) {
      setData((dataSource) => [
        ...dataSource,
        {
          key: i,
          element: (
            <li accesskey={name}>
              <span>
                <strong>{i}-------</strong>
              </span>
              <span>{i + 1} . soru</span>
              <AnswerInput
                id={i}
                addclick={addClick}
                selectRadio={
                  result[name] == undefined ||
                  result[name] == null ||
                  result[name][i] == null
                    ? ""
                    : result[name][i]
                }
              />
            </li>
          ),
        },
      ]);
    }
  };

  const travelJson = () => {
    Object.keys(result).map((key, index) => {
      console.log("boyu", [result[key].length]);
      drawForm(key, result[key].length);
    });
  };

  return (
    <>
      {!redirect ? (
        <>
          <ExamAlert alertType={alert} />

          <div
            className="card p-3 mb-5 bg-white rounded"
            style={{ height: "100vh" }}
          >
            <>
              {/* {Object.keys(lessons).map((key) => {
                return <div className={key}>{lessons[key]}</div>;
              })} */}
              <Table dataSource={dataSource} columns={columns} />
            </>
            <div
              className="btn-group  d-flex 
            justify-content-center
            align-items-center
            pt-3"
              role="group"
              aria-label="Basic example"
            >
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
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )}
    </>
  );
}
// TODO:ekrana bas
