import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { Flag } from "@material-ui/icons";

export default function RadioButtons(props) {
  let length = props.length;
  const [selectedValue, setSelectedValue] = React.useState(props.selectRadio);

  const handleChange = (event) => {
    setSelectedValue(event.target.value.toUpperCase());
    const node = event.target;
    const lessonName =
      node.parentNode.parentNode.parentNode.parentNode.accessKey;
    // node.parentNode.parentNode.parentNode.parentNode.parentNode.accessKey;
    // props.addclick(props.id, event.target.value, lessonName);
    console.log("lessonName:", lessonName);
  };

  return (
    <div className={"w-100 d-flex justify-content-center"}>
      <span style={{ fontWeight: "bold" }}>A</span>
      <Radio
        checked={selectedValue === "A"}
        onChange={handleChange}
        value="a"
        label="A"
        name="radio-button-demo"
        inputProps={{ "aria-label": "A" }}
      />
      <span style={{ fontWeight: "bold" }}>B</span>

      <Radio
        checked={selectedValue === "B"}
        onChange={handleChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B" }}
      />
      <span style={{ fontWeight: "bold" }}>C</span>

      <Radio
        checked={selectedValue === "C"}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ "aria-label": "C" }}
      />
      <span style={{ fontWeight: "bold" }}>D</span>

      <Radio
        checked={selectedValue === "D"}
        onChange={handleChange}
        value="d"
        name="radio-button-demo"
        inputProps={{ "aria-label": "D" }}
      />
      <span style={{ fontWeight: "bold" }}>E</span>

      <Radio
        checked={selectedValue === "E"}
        onChange={handleChange}
        value="e"
        name="radio-button-demo"
        inputProps={{ "aria-label": "E" }}
      />
    </div>
  );
}
