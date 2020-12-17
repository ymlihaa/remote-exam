import React, { useEffect, useState, useReducer } from "react";
import Optik from "./Optik";
import ExamAlert from "./ExamAlert";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import Join from "./Join";
import { ContactSupportOutlined } from "@material-ui/icons";

export default function App() {
  const [alertType, setAlert] = useState("");
  const history = useHistory();
  const initialState = {
    name: "",
    surName: "",
    studentNumber: "",
    ExamID: "",
    isTrue: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setState":
        return {
          name: action.name,
          surname: action.surname,
          studentNumber: action.studentNumber,
          ExamID: action.ExamID,
          isTrue: action.onAuth,
        };
      case "mounting":
        return { state: action.user };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "mounting", user: user });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify([
        state.name,
        state.surname,
        state.studentNumber,
        state.isTrue,
        state.ExamID,
      ])
    );
  }, [state]);

  const setAlertType = (type) => {
    console.log("setAlertType :", type);
    console.log(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0;
    setAlert(type.toString());
  };

  const cardshadow = {
    background: " #fff",
    borderRadius: " 2px",
    boxShadow: " 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    maxWidth: "600px",
  };
  const element = <ExamAlert alertType={alertType} />;

  return (
    // <div style={Appwrapper} className="mx-auto p-2">
    <AppContext.Provider value={{ dispatch }}>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        {element !== null && element}
        {/* <div className="w-100 mx-auto" style={cardshadow}>
          <h3 className="text-center">Türkçe</h3>
        </div> */}
        {state.isTrue ? (
          <Optik userInfo={state} setAlertType={setAlertType} />
        ) : (
          <Join />
        )}
      </div>
    </AppContext.Provider>
  );
}
/**TODO:
 *
 * LOCAL STORAGE PROBLEMİNİ ÇÖZ
 *
 */
