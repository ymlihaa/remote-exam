import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Card } from "antd";
import json from "../examTypeJson/AYT_info";

function AYT_form() {
  const [answer, setAnswer] = useState([]);
  const handleRef = useRef(0);

  const tde = [];
  const tarih_1 = [];
  const tarih_2 = [];
  const cografya_1 = [];
  const cografya_2 = [];
  const mat = [];
  const felsefe = [];
  const din = [];
  const fizik = [];
  const kimya = [];
  const biyoloji = [];

  const handleChange = (e) => {
    console.log(e.target.value);
    setAnswer((answer) => [...answer, e.target.value]);
    console.log(answer);
  };

  const drawForm = (limit, arr) => {
    for (let i = 0; i < limit; i++) {
      arr.push(
        <div style={{ padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ marginRight: ".5rem" }}>{i + 1 + ". Soru"}</span>
          </div>
          <Input
            onChange={handleChange}
            style={{ width: "5rem" }}
            size={"large"}
          />
        </div>
      );
    }
  };

  Object.keys(json).map((key) => {
    switch (key) {
      case "tde":
        tde.push(<h5>Türk Dili ve Edebiyatı</h5>);
        return drawForm(json[key], tde);
      case "mat":
        mat.push(<h5>Matematik</h5>);
        return drawForm(json[key], mat);
      case "tarih_1":
        tarih_1.push(<h5>Tarih-1</h5>);
        return drawForm(json[key], tarih_1);
      case "cografya_1":
        cografya_1.push(<h5>Coğrafya-1</h5>);
        return drawForm(json[key], cografya_1);
      case "tarih_2":
        tarih_2.push(<h5>Tarih-2</h5>);
        return drawForm(json[key], tarih_2);
      case "cografya_2":
        cografya_2.push(<h5>Tarih-2</h5>);
        return drawForm(json[key], cografya_2);
      case "felsefe":
        felsefe.push(<h5>Felsefe</h5>);
        return drawForm(json[key], felsefe);
      case "din":
        din.push(<h5>Din Kültürü </h5>);
        return drawForm(json[key], din);
      case "fizik":
        fizik.push(<h5>Fizik</h5>);
        return drawForm(json[key], fizik);
      case "kimya":
        kimya.push(<h5>Kimya</h5>);
        return drawForm(json[key], kimya);
      case "biyo":
        biyoloji.push(<h5>Biyoloji</h5>);
        return drawForm(json[key], biyoloji);
      default:
        return;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="card " style={{ margin: "0.3rem" }}>
        {tde}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {mat}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {cografya_1}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {cografya_2}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {tarih_1}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {tarih_2}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {felsefe}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {din}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {fizik}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {kimya}
      </div>
      <div className="card " style={{ margin: "0.3rem" }}>
        {biyoloji}
      </div>
    </div>
  );
}

export default AYT_form;
