import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Badge, Menu, Dropdown, Space, Spin, Skeleton } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

export default function ListedExam(props) {
  const [success, setSuccess] = useState(false);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setSuccess(true);
    }, 1000);

    Object.keys(props.student_list).map((name) => {
      setArr((arr) => [...arr, props.student_list[name]]);
    });
  }, []);

  const expandedRowRender = (e) => {
    const columns = [
      { title: "Doğru ", dataIndex: "countTrue", key: "countTrue" },
      { title: "Yanlış", dataIndex: "countFalse", key: "countFalse" },
      { title: "Boş", dataIndex: "countEmpty", key: "countEmpty" },
    ];

    const data = [];
    console.log("expanded key ", e.key);
    const expandElem = arr[e.key];
    console.log("expandEl:", expandElem);
    data.push({
      key: 0,
      countTrue: expandElem.D,
      countFalse: expandElem.Y,
      countEmpty: expandElem.B,
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "İsim", dataIndex: "name", key: "name" },
    { title: "Soyisim", dataIndex: "lastName", key: "lastName" },
    {
      title: "Okul Numarası",
      dataIndex: "studentNo",
      key: "studentNo",
    },
    { title: "Sınav Türü", dataIndex: "examType", key: "examType" },
    { title: "Puan", dataIndex: "point", key: "point" },
  ];

  const data = [];

  arr.map((item, index) => {
    data.push({
      key: index,
      index: index + 1,
      name: item.name,
      lastName: item.surname,
      studentNo: item.studentNumber,
      examType: item.type,
      point: item.point,
    });
  });

  const ghostArr = (
    <>
      {Object.keys(arr).map((item) => {
        return <Skeleton title={false} avatar={false} active />;
      })}
    </>
  );

  return (
    <>
      {!success ? (
        <>{ghostArr}</>
      ) : (
        <>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
          />
        </>
      )}
    </>
  );
}
