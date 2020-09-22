import React from "react";
import "./info.css";

function Info() {
  return (
    <div className="unauthContainer">
      <h1>Explore</h1>
      <div className="text_left">Links</div>
      <div className="bg_light">
        Fork this app:
        <a
          href="https://github.com/kao-ring/Perfect-Pitch-Trainer"
          target="_blank"
          rel="noopener noreferrer"
          className="float_right"
        >
          Perfect-Pitch-Trainer
        </a>
      </div>
      <div className="bg_light">
        Github:
        <a
          href="https://github.com/kao-ring/"
          target="_blank"
          rel="noopener noreferrer"
          className="float_right"
        >
          Kaori Caplan
        </a>
      </div>
      <div className="bg_light">
        LinkedIn:
        <a
          href="https://www.linkedin.com/in/kaori-nakajima-64750072/"
          target="_blank"
          rel="noopener noreferrer"
          className="float_right"
        >
          Kaori Nakajima
        </a>
      </div>
      <hr />
      <div className="text_left">About</div>
      <div className="bg_light">Version: 1.0.0</div>
      <div className="bg_light">Developer: Kaori Caplan</div>
    </div>
  );
}

export default Info;
