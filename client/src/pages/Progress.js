import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import API from "../utils/API";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;

function Progress() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userInfo();
    // console.log("エフェクト");
    // console.log(users);
  }, []);

  const userInfo = () => {
    API.getAllUserInfo()
      .then((res) => {
        console.log("ログデータ");
        console.log(res.data);

        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const scoreTotal = (tests) => {
  //   tests.map((test) => {
  //     let total = 0;
  //     total += test.score;
  //     return 100;
  //   });
  // };

  const options = {
    animationEnabled: true,
    theme: "light2",

    axisX: {
      title: "Student's Name",
      reversed: true,
    },
    axisY: {
      title: "Total Score",
    },
    data: [
      {
        type: "bar",
        dataPoints: users.map((user) => {
          // return { y: scoreTotal(user.tests), label: user.user_name };
          return { y: Math.floor(Math.random() * 100), label: user.user_name };
        }),
      },
    ],
  };

  // =====
  // const scoreArr = user.tests[i].score;
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // // 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer));
  // ======

  return (
    <div>
      <h1>Student's Progress</h1>

      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default Progress;
