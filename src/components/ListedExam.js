import axios from "axios";
import React, { Component } from "react";
import { Spin, Skeleton, Empty } from "antd";

export default class ListedExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      error: false,
      success: false,
    };
    this.updateStateArray = this.updateStateArray.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
    this.examine_Exam = this.examine_Exam.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        success: true,
      });
    }, 1000);
    axios
      .get("http://localhost:8099/exam/")
      .then((response) => {
        console.log(response);
        let temp = [];
        Object.keys(response.data).map((name) => {
          this.setState({
            arr: this.state.arr.concat(response.data[name]),
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  examine_Exam = (e) => {
    axios
      .post("http://localhost:8099/exam/examine", {
        examID: e.target.id,
      })
      .then((res) => {
        console.log(res.data);
        this.props.handleJoinedList(res.data);
      })
      .catch((error) => {
        alert("Bu sınava henüz kimse katılmadı !");
      });
  };

  deleteExam(e) {
    axios
      .post("http://localhost:8099/exam/delete", {
        examID: e.target.id,
      })
      .then(() => {
        this.updateStateArray(e.target.value);
        this.setState({
          success: true,
        });
        console.log("başarıyla silindi");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateStateArray(index) {
    let temp = [...this.state.arr];

    temp.splice(index, 1);
    this.setState({ arr: temp });
  }

  updateExam() {}

  render() {
    const ghostArr = (
      <>
        {Object.keys(this.state.arr).map((item) => {
          return <Skeleton title={false} avatar={false} active />;
        })}
      </>
    );

    return (
      <>
        {!this.state.success ? (
          <div className="d-flex justify-content-center align-items-center  flex-column ">
            <>{ghostArr}</>
          </div>
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sınav ID</th>
                <th scope="col">Başlangıç Tarihi</th>
                <th scope="col">Bitiş Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(this.state.arr).map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td key={item.key}>{item.key}</td>
                    <td key={index + 2}>{item.startTime}</td>
                    <td key={index + 3}>{item.endTime}</td>
                    <td>
                      <button
                        value={index}
                        id={item.key}
                        type="button"
                        class="btn"
                        style={{ backgroundColor: "#32be8f", color: "white" }}
                        onClick={this.examine_Exam}
                      >
                        İncele
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={this.deleteExam}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  }
}
