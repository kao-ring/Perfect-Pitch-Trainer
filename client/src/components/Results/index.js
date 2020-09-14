import React from "react";

function Results(props) {
  let message = "";
  let image;

  if (props.score === 100) {
    message = <div>You got {props.score}% correct!</div>;
    image = <img src="img/correct.png" alt="correct" className="img" />;
  } else {
    message = <div>You got {props.score}%. Try one more time!</div>;
    image = <img src="img/wrong.png" alt="wrong" className="img" />;
  }

  // function okBtn() {
  //   console.log("オッケー");
  //   message = "next";
  //   image = "da";
  // }

  return (
    <div className="results">
      <div>
        {message}
        {image}
      </div>
      <div>
        <button onClick={props.onClickOk}>OK</button>
      </div>{" "}
    </div>
  );
}

export default Results;
