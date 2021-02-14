import axios from "axios";
import React, { Component } from "react";
import { Spin, Skeleton } from "antd";

export default class ListedExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      error: false,
      success: false,
    };
    this.deleteExam = this.deleteExam.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        success: true,
      });
    }, 1000);
    let temp = [];
    Object.keys(this.props.student_list).map((name) => {
      this.setState((prevState) => {
        return {
          arr: prevState.arr.concat(this.props.student_list[name]),
        };
      });
    });
  }

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
                <th scope="col">İsim</th>
                <th scope="col">Soy İsim</th>
                <th scope="col">Okul Numarası</th>
                <th scope="col">Sınav Türü</th>
                <th scope="col">Puan</th>
              </tr>
            </thead>
            <tbody>
              {this.state.arr.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td key={item.key}>{item.name}</td>
                    <td key={index + 2}>{item.surname}</td>
                    <td key={index + 3}>{item.studentNumber}</td>
                    <td key={index + 3}>{item.type}</td>
                    <td key={index + 3}>{item.point}</td>

                    <td>
                      <button
                        value={index}
                        type="button"
                        class="btn btn-danger"
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
