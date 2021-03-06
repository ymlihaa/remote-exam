import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Card } from "antd";
import json from "../examTypeJson/TYT_info";
import { card_Box, card_Container } from "./form_style";

function TYT_form({ handleChange }) {
  const tr = [];
  const mat = [];
  const cografya = [];
  const tarih = [];
  const felsefe = [];
  const din = [];
  const fizik = [];
  const kimya = [];
  const biyoloji = [];

  const drawForm = (limit, arr, key) => {
    let lesson = arr[0].props.children.replace(" ", "");
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
      case "tr":
        tr.push(<h3>Türkçe</h3>);
        return drawForm(json[key], tr, key);
      case "mat":
        mat.push(<h3>Matematik</h3>);
        return drawForm(json[key], mat, key);
      case "cografya":
        cografya.push(<h3>Coğrafya</h3>);
        return drawForm(json[key], cografya, key);
      case "tarih":
        tarih.push(<h3>Tarih</h3>);
        return drawForm(json[key], tarih, key);
      case "felsefe":
        felsefe.push(<h3>Felsefe</h3>);
        return drawForm(json[key], felsefe, key);
      case "din":
        din.push(<h3>Din Kültürü </h3>);
        return drawForm(json[key], din, key);
      case "fizik":
        fizik.push(<h3>Fizik</h3>);
        return drawForm(json[key], fizik, key);
      case "kimya":
        kimya.push(<h3>Kimya</h3>);
        return drawForm(json[key], kimya, key);
      case "biyo":
        biyoloji.push(<h3>Biyoloji</h3>);
        return drawForm(json[key], biyoloji, key);
      default:
        return;
    }
  });

  return (
    <div style={card_Container}>
      <div className="card " style={card_Box}>
        {tr}
      </div>

      <div className="card m-1 p-1" style={card_Box}>
        {mat}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {cografya}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {tarih}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {felsefe}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {din}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {fizik}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {kimya}
      </div>
      <div className="card m-1 p-1" style={card_Box}>
        {biyoloji}
      </div>
    </div>
  );
}

export default TYT_form;
