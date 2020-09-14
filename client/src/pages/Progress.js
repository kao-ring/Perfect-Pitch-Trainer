import React from "react";
// import { Line } from "react-chartjs-2";
// import moment from "moment";
// import API from "../utils/API";

export default class Progress extends React.Component {
  // state = {
  //   labels: [],
  //   score: [],
  //   tests: [],
  //   user: "",
  //   // labels: this.state.labels,
  // };

  // componentDidMount() {
  //   const startDate = new Date(2020, 8, 1);
  //   let labels = [];
  //   let score = [];
  //   let tests = [];

  //   for (let i = 0; i < 30; i++) {
  //     const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  //     labels.push(date.toString());
  //     score.push(Math.floor(Math.random() * 30)); //仮データ
  //     tests.push(Math.floor(Math.random() * 10)); //仮データ
  //   }
  //   let user = JSON.parse(localStorage.getItem("authUser")).user_name;
  //   this.setState({ labels: labels, score: score, tests: tests });

  //   if (user) {
  //     this.setState({ user: user });
  //   } else {
  //     this.getUser(user);
  //   }
  // }

  // getUser(user) {
  //   API.getUserInfo(user)
  //     .then((res) => {
  //       console.log(res.data);
  //       this.totalScore(res.data.tests);
  //       this.numberOfTests(res.data.tests);
  //     })
  //     .catch((err) => console.log(err));

  //   API.getAllUserInfo()
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // totalScore(data) {
  //   console.log(data);
  // }

  // numberOfTests(data) {
  //   console.log(data);
  // }

  // data = (canvas) => {
  //   // const ctx = canvas.getContext("2d");
  //   // const gradient = ctx.createLinearGradient(0, 0, 100, 0);
  //   return {
  //     backgroundColor: "red",
  //     // labels,
  //     datasets: [
  //       {
  //         label: this.state.labels,
  //         data: this.state.score,
  //         borderWidth: 3,
  //         fill: false,
  //         borderColor: "green",
  //       },
  //     ],
  //   };
  // };

  render() {
    return (
      <div>
        {/* <Line
          data={this.data}
          options={{
            title: {
              display: true,
              text: this.state.user + "'s Daily Progress",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        /> */}
        Progress page
      </div>
    );
  }
}
