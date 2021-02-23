import React, { useEffect, useState, useReducer } from "react";
import Optik from "./Optik_comp/antTable";
import ExamAlert from "./ExamAlert";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";
import Join from "./Join";
import { ContactSupportOutlined } from "@material-ui/icons";

import AYT_state from "./Optik_comp/optikStates/AYT_state";
import TYT_state from "./Optik_comp/optikStates/TYT_state";
import YDS_state from "./Optik_comp/optikStates/YDS_state";

import AYT from "./examTypeJson/AYT_info";
import TYT from "./examTypeJson/TYT_info";
import YDS from "./examTypeJson/YDS_info";

export default function App() {
  const [alertType, setAlert] = useState("");
  const history = useHistory();
  const initialState = {
    name: "",
    surName: "",
    studentNumber: "",
    ExamID: "",
    isTrue: false,
    type: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setState":
        return {
          name: action.User.name,
          surname: action.User.surname,
          studentNumber: action.User.studentNumber,
          ExamID: action.User.ExamID,
          isTrue: action.User.onAuth,
          type: action.User.type,
        };
      case "mounting":
        return {
          name: action.User.name,
          surname: action.User.surname,
          studentNumber: action.User.studentNumber,
          ExamID: action.User.examID,
          isTrue: action.User.isTrue,
          type: action.User.type,
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localStore_User = JSON.parse(localStorage.getItem("user"));
    // localStore_User && dispatch({ type: "mounting", User: localStore_User });
    if (localStorage.getItem("user")) {
      dispatch({ type: "mounting", User: localStore_User });
    }
  }, []);

  useEffect(() => {
    const User = {
      name: state.name,
      surname: state.surname,
      studentNumber: state.studentNumber,
      isTrue: state.isTrue,
      examID: state.ExamID,
      type: state.type,
    };
    localStorage.setItem("user", JSON.stringify(User));
  }, [state.isTrue]);

  const setAlertType = (type) => {
    console.log("setAlertType :", type);
    // console.log(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0;
    setAlert(type.toString());
    return <ExamAlert alertType={type} />;
  };

  const HandleOptik = () => {
    switch (state.type) {
      case "TYT":
        return (
          <Optik
            User={state}
            stateOptik={TYT_state}
            setAlertType={setAlertType}
            lesson={TYT}
          />
        );
      case "AYT":
        return (
          <Optik
            User={state}
            stateOptik={AYT_state}
            setAlertType={setAlertType}
            lesson={AYT}
          />
        );
      case "YDS":
        return (
          <Optik
            User={state}
            stateOptik={YDS_state}
            setAlertType={setAlertType}
            lesson={YDS}
          />
        );
    }
  };

  const element = <ExamAlert alertType={alertType} />;

  return (
    <AppContext.Provider value={{ dispatch }}>
      <div
        className="container d-flex align-items-center  flex-column"
        // style={{ height: "50vh" }}
      >
        {element !== null && element}

        {state.isTrue ? <HandleOptik /> : <Join />}
      </div>
    </AppContext.Provider>
  );
}
/**TODO:
 *
 * X LOCAL STORAGE PROBLEMİNİ ÇÖZ
 * X local storage diziye çevirdin diziden istrue değğerine ulaşığ sınava devam çözümü üret
 */
