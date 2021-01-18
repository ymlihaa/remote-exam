import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Card } from "antd";
import json from "../examTypeJson/YDS_info";
import { card_Box, card_Container } from "./form_style";
function YDS_form() {
  const [answer, setAnswer] = useState([]);
  const handleRef = useRef(0);

  const yds = [];

  const handleChange = (e) => {
    console.log(e.target.value);
    setAnswer((answer) => [...answer, e.target.value]);
    console.log(answer);
  };

  const drawForm = (limit, arr) => {
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
      case "yd":
        yds.push(<h3>Yabancı Dil</h3>);
        return drawForm(json[key], yds);
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
