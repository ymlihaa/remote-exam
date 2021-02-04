import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Card } from "antd";
import json from "../examTypeJson/AYT_info";
import { card_Box, card_Container } from "./form_style";

function AYT_form({ handleChange }) {
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

  const drawForm = (limit, arr, key) => {
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
            onChange={handleChange(key, i)}
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
        return drawForm(json[key], tde, key);
      case "mat":
        mat.push(<h5>Matematik</h5>);
        return drawForm(json[key], mat, key);
      case "tarih_1":
        tarih_1.push(<h5>Tarih-1</h5>);
        return drawForm(json[key], tarih_1, key);
      case "cografya_1":
        cografya_1.push(<h5>Coğrafya-1</h5>);
        return drawForm(json[key], cografya_1, key);
      case "tarih_2":
        tarih_2.push(<h5>Tarih-2</h5>);
        return drawForm(json[key], tarih_2, key);
      case "cografya_2":
        cografya_2.push(<h5>Tarih-2</h5>);
        return drawForm(json[key], cografya_2, key);
      case "felsefe":
        felsefe.push(<h5>Felsefe</h5>);
        return drawForm(json[key], felsefe, key);
      case "din":
        din.push(<h5>Din Kültürü </h5>);
        return drawForm(json[key], din, key);
      case "fizik":
        fizik.push(<h5>Fizik</h5>);
        return drawForm(json[key], fizik, key);
      case "kimya":
        kimya.push(<h5>Kimya</h5>);
        return drawForm(json[key], kimya, key);
      case "biyo":
        biyoloji.push(<h5>Biyoloji</h5>);
        return drawForm(json[key], biyoloji, key);
      default:
        return;
    }
  });

  return (
    <div style={card_Container}>
      <div className="card " style={card_Box}>
        {tde}
      </div>
      <div className="card " style={card_Box}>
        {mat}
      </div>
      <div className="card " style={card_Box}>
        {cografya_1}
      </div>
      <div className="card " style={card_Box}>
        {cografya_2}
      </div>
      <div className="card " style={card_Box}>
        {tarih_1}
      </div>
      <div className="card " style={card_Box}>
        {tarih_2}
      </div>
      <div className="card " style={card_Box}>
        {felsefe}
      </div>
      <div className="card " style={card_Box}>
        {din}
      </div>
      <div className="card " style={card_Box}>
        {fizik}
      </div>
      <div className="card " style={card_Box}>
        {kimya}
      </div>
      <div className="card " style={card_Box}>
        {biyoloji}
      </div>
    </div>
  );
}

export default AYT_form;
