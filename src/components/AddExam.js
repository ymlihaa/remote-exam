import React, { useRef, useState, useEffect } from "react";
import {
  DatePicker,
  Space,
  ConfigProvider,
  Input,
  Row,
  Col,
  TimePicker,
  Select,
  Empty,
} from "antd";

import form_flex from "./addExam_style";

import TYT from "./answerForms/TYT_form";
import AYT from "./answerForms/AYT_form";
import YDS from "./answerForms/YDS_form";

import { Link, useHistory } from "react-router-dom";
import ResultComponent from "./Result";
import moment from "moment";
import tr from "antd/lib/locale/tr_TR";
import "antd/dist/antd.css";
import axios from "axios";

export default function AddExam({ setDate }) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const [answer, setAnswer] = useState({});
  const [alert, setAlert] = useState("Lütfen Cevap Anahtarını Giriniz .");

  const handleChange = (propertyName, index) => (e) => {
    const arr = answer;
    if (arr[propertyName] === undefined) {
      arr[propertyName] = {};
    }
    arr[propertyName][parseInt(index)] = e.target.value.toUpperCase();
    setAnswer((answer) => arr);
    console.log({ ...answer });
  };

  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setStopTime] = useState("");
  const [type, setType] = useState("Sınav Tipi");
  const history = useHistory();

  async function handleSubmit() {
    // console.log("handleSubmit start", typeof startTime);
    // console.log('handleSubmit start"', endTime);
    // startTime.length == 0 && console.log("starttime");
    startTime.length == 0
      ? throwAlert()
      : await axios
          .post("http://localhost:8099/exam/create", {
            startTime: startTime,
            endTime: endTime,
            answerKey: answer,
            type: type,
          })
          .then(function (response) {
            console.log(response);
            setResult(true);
          })
          .catch(function (error) {
            console.log(error);
            alert("İşlem Gerçekleştirilemedi.");
          });
  }

  const throwAlert = () => {
    document.documentElement.scrollTop = 0;
    setAlert("Lütfen tarih'i ayarlayınız .");
  };

  function onChange(value, dateString) {
    console.log("time is :", dateString);
    let temp_dataString = moment(dateString);
    let times;
    // let times = temp_dataString;
    // temp_dataString = temp_dataString.format("YYYY/MM/DD HH:mm:ss");
    times = timeAdd(temp_dataString);
    console.log("times", times);
    times = times.format("YYYY/MM/DD HH:mm:ss");
    setStartTime(temp_dataString.toLocaleString());
    setStopTime(times.toLocaleString());
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  function handleSelect(value) {
    setType(value);
    console.log(type);
  }

  function timeAdd(time) {
    let adding_time;
    if (type == "TYT") {
      adding_time = time.add(135, "m");
    } else if (type == "AYT") {
      adding_time = time.add(180, "m");
    } else {
      adding_time = time.add(120, "m");
    }
    // switch (type) {
    //   case "TYT":
    //     return time.add(135, "m");
    //     break;
    //   case "AYT":
    //     return time.add(180, "m");
    //     break;
    //   case "Dil":
    //     return time.add(120, "m");
    //     break;
    // }
    return adding_time;
  }

  const SelectBox = () => {
    return (
      <Select
        defaultValue={type}
        onSelect={handleSelect}
        showSearch
        defaultValue={type}
        style={{ width: 200, cursor: "pointer" }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="TYT">TYT</Option>
        <Option value="AYT">AYT</Option>
        <Option value="YDS">YABANCI DİL</Option>
      </Select>
    );
  };

  const AnswerForm = () => {
    switch (type) {
      case "TYT":
        return (
          <>
            <div className={"d-flex align-items-center justify-content-center"}>
              <div
                className="alert alert-danger w-50 "
                style={{ padding: "5px" }}
                role="alert"
              >
                <strong>{alert}</strong>
              </div>
            </div>
            <TYT handleChange={handleChange} />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="teacher-btn "
                style={{ width: "50%" }}
                onClick={handleSubmit}
              >
                Kaydet
              </button>
            </div>
          </>
        );
      case "AYT":
        return (
          <>
            <div className={"d-flex align-items-center justify-content-center"}>
              <div
                className="alert alert-danger w-50"
                style={{ padding: "5px" }}
                role="alert"
              >
                <strong>{alert}</strong>
              </div>
            </div>
            <AYT handleChange={handleChange} />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="teacher-btn "
                style={{ width: "50%" }}
                onClick={handleSubmit}
              >
                Kaydet
              </button>
            </div>
          </>
        );
      case "YDS":
        return (
          <>
            <div className={"d-flex align-items-center justify-content-center"}>
              <div
                className="alert alert-danger w-50"
                style={{ padding: "5px" }}
                role="alert"
              >
                <strong>{alert}</strong>
              </div>
            </div>
            <YDS handleChange={handleChange} />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="teacher-btn "
                style={{ width: "50%" }}
                onClick={handleSubmit}
              >
                Kaydet
              </button>
            </div>
          </>
        );
      default:
        return <Empty description={"Henüz sınav tipi seçmediniz."} />;
    }
  };

  return (
    <div className="text-center w-100">
      {!result ? (
        <>
          <ConfigProvider locale={tr}>
            <div className="mb-3">
              <SelectBox />
              <DatePicker showTime onChange={onChange} onOk={onOk} />
            </div>
          </ConfigProvider>
          <div className="w-100">
            <AnswerForm />
          </div>
        </>
      ) : (
        <ResultComponent message={"Sınavınız başarıyla kaydedildi ."} />
      )}
    </div>
  );
}
