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

  const dailyScore = () => {
    // console.log(user);
    if (user.tests) {
      const arrayOfDates = user.tests.map(
        (test) => test.scoreCreated.split("T")[0]
      );
      const noRepeats = arrayOfDates.filter(
        (day, i) => !arrayOfDates.slice(0, i).includes(day)
      );
      // console.log(noRepeats);

      const scoreData = noRepeats.map((day) => {
        return user.tests
          .filter((test) => test.scoreCreated.split("T")[0] === day)
          .reduce((total, current) => total + current.score, 0);
      });
      // console.log(scoreData);

      let dataPoint = [];
      for (let i = 0; i < noRepeats.length; i++) {
        dataPoint.push({ label: noRepeats[i], y: scoreData[i] });
      }
      // console.log(dataPoint);
      return dataPoint;
    }
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Student's Progress",
    },
    axisX: {
      title: "Student's Name",
      interval: 1,
      margin: 10,
      labelPlacement: "inside",
      tickPlacement: "inside",
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
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Your Daily Progress",
    },
    axisX: {
      title: "Date",
    },
    axisY: {
      title: "Daily Total Score",
      margin: 10,
    },
    data: [
      {
        type: "line",
        dataPoints: dailyScore(),
      },
    ],
  };

  return (
    <div>
      <br />
      <CanvasJSChart options={options} />
      <br />
      <CanvasJSChart options={options2} />
      <br />
    </div>
  );
}

export default Progress;
