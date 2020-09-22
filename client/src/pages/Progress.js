import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import API from "../utils/API";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        // console.log("***getAllUserInfo***");
        // console.log(res.data);
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

  // const scoreTotal = (tests) => {
  //   const reducer = (accumulator, currentValue) =>
  //     accumulator + currentValue.score;
  //   return tests.reduce(reducer, 0);
  // };

  const rankingScore = () => {
    const allUserName = users.map((user) => user.user_name);
    // console.log(allUserName);
    const scoreTotal = users.map((user) =>
      user.tests.reduce((total, current) => total + current.score, 0)
    );
    // console.log(scoreTotal);
    let dataPoint = [];
    for (let i = 0; i < allUserName.length; i++) {
      dataPoint.push({ label: allUserName[i], y: scoreTotal[i] });
    }

    //オブジェクト要素のソート
    dataPoint.sort(function (a, b) {
      if (a.y < b.y) {
        return -1;
      } else {
        return 1;
      }
    });

    return dataPoint;
  };

  const dailyScore = () => {
    if (user.tests) {
      const arrayOfDates = user.tests.map(
        (test) => test.scoreCreated.split("T")[0]
      );
      const noRepeats = arrayOfDates.filter(
        (day, i) => !arrayOfDates.slice(0, i).includes(day)
      );

      const scoreData = noRepeats.map((day) => {
        return user.tests
          .filter((test) => test.scoreCreated.split("T")[0] === day)
          .reduce((total, current) => total + current.score, 0);
      });

      let dataPoint = [];
      for (let i = 0; i < noRepeats.length; i++) {
        dataPoint.push({ label: noRepeats[i], y: scoreData[i] });
      }

      return dataPoint;
    }
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "User Ranking",
    },
    axisX: {
      title: "User Name",
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
        dataPoints: rankingScore(),
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
        type: "column",
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
