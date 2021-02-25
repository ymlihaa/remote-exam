import React from "react";
import { Result, Button } from "antd";
import { Link } from "@material-ui/core";

function handleCopy({target:{value,id}}){
  console.log(value)
  var copyText = document.getElementById(id)
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Sınav ID kopyalandı : " + copyText.value);
}


const ResultComponent = ({message,examID}) => {
  return (
    <Result
      status="success"
      title="Tebrikler ..."
      subTitle={message}
      className="d-flex flex-column justify-content-center"
      extra={[
          <input id ="copyText" onClick={handleCopy} className="btn btn-success p-3 mb-3" value={examID}></input>,
        <div><Button>Çıkış Yap</Button></div>,
      ]}
    />
  );
};

export default ResultComponent;
