import React from "react";
import { Link } from "react-router-dom";
import TeacherLogin from "./TeacherLogin";

export default function Login() {
  return (
    <>
      <span>
        <Link to="/teacher">Öğretmen</Link>
      </span>{" "}
      <span>
        <Link to="/exam">Öğrenci</Link>
      </span>
    </>
  );
}
