import React, { useEffect, useState } from "react";
import Button from "../components/Button";
export default function Test_optic({
  startI,
  addClick,
  localResultArr,
  setName,
  counter,
}) {
  useEffect(() => {
    setName();
  }, []);

  useEffect(() => {
    setName();
  }, [startI]);

  const Optic = [];
  function iterateOptic(add) {
    console.log("this is add ", add);
    for (let i = startI; i < startI + add; i++) {
      Optic.push(
        <>
          <span>{i + 1}. Soru</span>
          <li key={i}>
            <Button
              id={i}
              addclick={addClick}
              selectRadio={localResultArr[i] !== "" ? localResultArr[i] : ""}
            />
          </li>
        </>
      );
    }
  }

  iterateOptic(counter);
  console.log("this is startI", startI);
  return Optic;
}
