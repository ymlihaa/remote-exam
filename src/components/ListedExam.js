import React, { useEffect, useState } from "react";
import axios from "axios";
// import Table from "./Table";
import { responsiveMap } from "antd/lib/_util/responsiveObserve";

function ListedExam() {
  const [data, setData] = useState([]);
  const arrD = [];
  useEffect(() => {
    axios
      .get("http://localhost:8099/exam")
      .then((response) => {
        Object.keys(response.data).map((item, index) => {
          Object.keys(response.data[item]).map((subitem) => {
            console.log(response.data[item][subitem]);
          });
          setData(arrD);
          console.log(arrD);
        });
      })
      .then(() => {
        console.log("thendata:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [data]);
  return <div className="w-100">{/* <Table data={data} /> */}</div>;
}
export default ListedExam;
