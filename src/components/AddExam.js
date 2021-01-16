import React, { useRef, useState } from "react";
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
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const [answerKey, setKey] = useState();
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setStopTime] = useState("");
  const [type, setType] = useState("Sınav Tipi");

  const history = useHistory();

  function handleChange(e) {
    setKey(e.target.value);
  }

  async function handleSubmit() {
    try {
      await axios
        .post("http://localhost:8099/exam/create", {
          startTime: startTime,
          endTime: endTime,
          answerKey: answerKey,
          type: type,
        })
        .then(function (response) {
          console.log(response);
          setResult(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch {
      console.log("not created");
    }
  }

  function onChange(value, dateString) {
    let temp_dataString = moment(dateString);
    let times = temp_dataString;
    temp_dataString = temp_dataString.format("YYYY/MM/DD HH:mm:ss");
    times = timeAdd(times);
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
    let added_time;
    switch (type) {
      case "TYT":
        added_time = time.add(135, "m");
        return added_time;
      case "AYT":
        added_time = time.add(180, "m");
        return added_time;

      case "Dil":
        added_time = time.add(120, "m");
        return added_time;
    }
  }

  const SelectBox = () => {
    return (
      <Select
        defaultValue={type}
        onSelect={handleSelect}
        showSearch
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
        return <TYT />;
      case "AYT":
        return <AYT />;
      case "YDS":
        return <YDS />;
      default:
        return <Empty description={"Henüz sınav tipi seçmediniz."} />;
    }
  };

  return (
    <div className="text-center">
      {!result ? (
        <Space direction="vertical" size={12}>
          <ConfigProvider locale={tr}>
            <div className="mb-3">
              <SelectBox />
              <DatePicker showTime onChange={onChange} onOk={onOk} />
            </div>

            <div className="card p-3 w-100" style={{ borderRadius: " 20px" }}>
              <AnswerForm />

              {/* <div className="d-flex align-items-center justify-content-center  flex-column">
                <div
                  class="alert alert-danger"
                  style={{ padding: "5px" }}
                  role="alert"
                >
                  Lütfen Cevap Anahtarını Giriniz .
                </div>
                <TextArea rows={20} onChange={handleChange} />
                <button
                  className="teacher-btn "
                  style={{ width: "50%" }}
                  onClick={handleSubmit}
                >
                  Kaydet
                </button>
              </div> */}
            </div>
          </ConfigProvider>
        </Space>
      ) : (
        <ResultComponent message={"Sınavınız başarıyla kaydedildi ."} />
      )}
    </div>
  );
}
