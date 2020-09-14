import React from "react";
import CanvasJSReact from "./assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;

function Progress() {
  const options = {
    animationEnabled: true,
    theme: "light2",

    axisX: {
      title: "User Name",
      reversed: true,
    },
    axisY: {
      title: "Total Score",
    },
    data: [
      {
        type: "bar",
        dataPoints: [
          { y: 500, label: "Kiki" },
          { y: 460, label: "Alisa" },
          { y: 300, label: "Jake" },
          { y: 280, label: "Gabriel" },
          { y: 100, label: "Kaori" },
          { y: 10, label: "Asd" },
          { y: 0, label: "Qwe" },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Ranking</h1>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default Progress;
