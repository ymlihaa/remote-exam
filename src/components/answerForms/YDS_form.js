import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Card } from "antd";
import json from "../examTypeJson/YDS_info";
import { card_Box, card_Container } from "./form_style";
function YDS_form({ handleChange }) {
  const yds = [];

  const drawForm = (limit, arr, key) => {
    for (let i = 0; i < parseInt(limit); i++) {
      arr.push(
        <div
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      case "yd":
        yds.push(<h3>Yabancı Dil</h3>);
        return drawForm(json[key], yds, key);
      default:
        return;
    }
  });

  return (
    <div style={card_Container}>
      <div className="card " style={card_Box}>
        {yds}
      </div>
    </div>
  );
}

export default YDS_form;
