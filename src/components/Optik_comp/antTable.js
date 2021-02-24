import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import AnswerInput from "../Button";
import ExamAlert from "../ExamAlert";
import lessonName from "./lessonName";

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
    localStore && setResult(localStore);
    travelJson();
    // console.log("dataSource:", dataSource);
  }, []);

  // COMPONENT UPDATE

  useEffect(() => {
    localStorage.setItem("resultArr", JSON.stringify(result));
    // console.log("changed result : ", result);
  }, [result]);

  const addClick = (index, val, lessonName) => {
    const localStore = JSON.parse(localStorage.getItem("resultArr"));
    const temp = result[lessonName];
    if (temp[lessonName] == undefined) {
      temp[lessonName] = localStore && localStore[lessonName];
    }
    temp[lessonName][index] = val;
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
      let element_Key = name + i.toString()+'asdf';
      setData((dataSource) => [
        ...dataSource,
        {
          key: element_Key,
          element: (
            <li key={element_Key + i} className="text-center" accessKey={name}>
              <span>{i + 1} . soru</span>
              <AnswerInput
                id={i}
                addclick={addClick}
                name = {name}
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
      console.log("lesson_name:", lessonName[key]);
      let element_Key = key + index.toString() + "123123";
      setData((dataSource) => [
        ...dataSource,
        {
          key: element_Key,
          element: (
            <span
              className="d-flex align-items-center justify-content-center "
              style={{
                fontWeight: "bold",
                fontSize: "1.5em",
              }}
            >
              {lessonName[key]}
            </span>
          ),
        },
      ]);
      drawForm(key, result[key].length);
    });
  };

  const card_Box = {
    width:'100%',
    height: "93vh",
    overflowY: " scroll",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  return (
    <>
      {!redirect ? (
        <>
          <ExamAlert alertType={alert} />

          <div style={card_Box}>
            <Table
              align="center"
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              responsive={true}
              size={"large"}
            />
          </div>
          <button
            onClick={finishExam}
            type="button"
            className="btn btn-danger w-25 align-self-center m-3"
            disabled={wait}
          >
            Sınavı Bitir
          </button>
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
