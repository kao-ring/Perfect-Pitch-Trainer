import React, { Component } from "react";
import Chart from "chart.js";
// import API from "./utils/API";

// import classes from "./LineGraph.module.css";

export default class Progress extends Component {
  chartRef = React.createRef();

  // componentDidMount() {
  //   API.getUserInfo()
  //     .then((res) => {
  //       console.log(res.data[0]);
  //       this.setState({
  //         user: res.data[0],
  //       });
  //     })
  //     .catch((err) => console.log(err));

  //   let myBarChart = new Chart(ctx, {
  //     type: "horizontalBar",
  //     data: {
  //       labels: [
  //         "Sunday",
  //         "Monday",
  //         "Tuesday",
  //         "Wednesday",
  //         "Thursday",
  //         "Friday",
  //         "Saturday",
  //       ],
  //       datasets: [
  //         {
  //           label: "Pounds",
  //           data: pounds,
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: options,
  //   });
  // }

  render() {
    return (
      // <div className={classes.graphContainer}>
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
