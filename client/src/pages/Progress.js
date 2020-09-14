import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import API from "../utils/API";

export default class Progress extends React.Component {
  state = {
    startDate: new Date(2020, 8, 1),
    labels: [],
    score: [],
    tests: [],
    user: "",
    labels: labels,
    datasets: [
      {
        label: "Daily Total Score",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: score,
      },
      {
        label: "Number of tests",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        data: tests,
      },
    ],
  };

  componentDidMount() {
    for (let i = 0; i < 30; i++) {
      const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
      labels.push(date.toString());
      score.push(Math.floor(Math.random() * 30)); //仮データ
      tests.push(Math.floor(Math.random() * 10)); //仮データ
    }
    let user = JSON.parse(localStorage.getItem("authUser")).user_name;
    if (user) {
      this.getUser();
    }
  }

  getUser() {
    API.getUserInfo(user)
      .then((res) => {
        console.log(res.data);
        totalScore(res.data.tests);
        numberOfTests(res.data.tests);
      })
      .catch((err) => console.log(err));

    API.getAllUserInfo()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  // function totalScore(data) {
  //   console.log(data);
  // }

  // function numberOfTests(data) {
  //   console.log(data);
  // }

  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: user + "'s Daily Progress",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
