import React, { useState,useCallback, useReducer,useEffect } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { Flag } from "@material-ui/icons";

export default function RadioButtons({id,addclick,selectRadio,name}) {
  const [selectedValue,setVal]=useState(selectRadio)


  const handleChange = ({target:{value,id}}) =>{
    setVal(value.toUpperCase());
    let parseKey = id.split('#');
    addclick(parseKey[1], value.toUpperCase(), parseKey[0]);

  }

 const handleClick =({target:{accessKey}})=>{
  let parseKey = accessKey.split('#');
  console.log(parseKey[0])
  console.log(parseKey[1])
  addclick(parseKey[1], null, parseKey[0]);
  setVal('')
}


  

  return (
    <div className={"w-100 d-flex justify-content-center"}>
      <span style={{ fontWeight: "bold" }}>A</span>
      <Radio
      id={name+'#'+id}
        checked={selectedValue==='A'}
        onChange={handleChange}
        value="a"
        label="A"
        name="radio-button-demo"
        inputProps={{ "aria-label": "A" }}
      />
      <span style={{ fontWeight: "bold" }}>B</span>

      <Radio
       id={name+'#'+id}
        checked={selectedValue==='B'}
        onChange={handleChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B" }}
      />
      <span style={{ fontWeight: "bold" }}>C</span>

      <Radio
       id={name+'#'+id}
        checked={selectedValue==='C'}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ "aria-label": "C" }}
      />
      <span style={{ fontWeight: "bold" }}>D</span>

      <Radio
       id={name+'#'+id}
        checked={selectedValue==='D'}
        onChange={handleChange}
        value="d"
        name="radio-button-demo"
        inputProps={{ "aria-label": "D" }}
      />
      <span style={{ fontWeight: "bold" }}>E</span>

      <Radio
       id={name+'#'+id}
        checked={selectedValue==='E'}
        onChange={handleChange}
        value="e"
        name="radio-button-demo"
        inputProps={{ "aria-label": "E" }}
      />

<button accessKey={name+'#'+id} className="btn btn-danger" style={{float:'right'}} onClick={handleClick}>X</button>

    </div>
  );
}

// const handleChange = (event) => {
//   if (selectedValue == event.target.value) {
//     console.log("aynı");
//   }
//   // setSelectedValue(event.target.value.toUpperCase());
//   const node = event.target;
//   const lessonName =
//     node.parentNode.parentNode.parentNode.parentNode.accessKey;
//   // node.parentNode.parentNode.parentNode.parentNode.parentNode.accessKey;
//   props.addclick(props.id, node.value, lessonName);
//   // console.log("lessonName:", lessonName);
//   // console.log("lessonName:", node.value);
//   // console.log("lessonName:", props.id);
// };
// const handleChange = useCallback(({ target: { value } }) => {
//   setSelectedValue((selectedValue) =>
//     selectedValue === value.toUpperCase() ? "" : value.toUpperCase()
//   );
// }, []);
// const handleChange = ({ target: { value } }) => {
//   console.log(value.toUpperCase());
//   setSelectedValue((selectedValue) =>
//     selectedValue === value.toUpperCase
//       ? console.log("2")
//       : value.toUpperCase()
//   );
// };
