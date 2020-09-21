import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import API from "../utils/API";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;

function Progress() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    userInfo();
    singleUserInfo();
  }, []);

  const userInfo = () => {
    API.getAllUserInfo()
      .then((res) => {
        console.log("***getAllUserInfo***");
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const singleUserInfo = () => {
    let user = JSON.parse(localStorage.getItem("authUser")).user_name;
    API.getUserInfo(user)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const scoreTotal = (tests) => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.score;
    return tests.reduce(reducer, 0);
  };

  // const testGroupByDate

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Student's Progress",
    },
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
          return { y: scoreTotal(user.tests), label: user.user_name };
        }),
      },
    ],
  };

  const options2 = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Your Daily Progress",
    },
    axisX: {
      title: "Date",
      reversed: false,
    },
    axisY: {
      title: "Daily Total Score",
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { x: new Date(2020, 0), y: 25060 },
          { x: new Date(2020, 1), y: 27980 },
          { x: new Date(2020, 2), y: 42800 },
          { x: new Date(2020, 3), y: 32400 },
          { x: new Date(2020, 4), y: 35260 },
          { x: new Date(2020, 5), y: 33900 },
          { x: new Date(2020, 6), y: 40000 },
          { x: new Date(2020, 7), y: 52500 },
          { x: new Date(2020, 8), y: 32300 },
          { x: new Date(2020, 9), y: 42000 },
          { x: new Date(2020, 10), y: 37160 },
          { x: new Date(2020, 11), y: 38400 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
      <CanvasJSChart options={options2} />
    </div>
  );
}

export default Progress;
