import React from "react";
import "./style.css";

function Nav() {
  const user = JSON.parse(localStorage.getItem("authUser")).user_name;
  return (
    <div className="navbar">
      <a href="/">
        {/* <i className="fas fa-music"> </i> */}
        Perfect Pitch Trainer
      </a>
      <div className="hiUser">
        <i className="far fa-user"></i>
        {user ? user : "log in please"}
      </div>
      <div className="navBtn">
        <a href="/progress">
          {"   "}
          <i className="fas fa-chart-line"> </i>
        </a>
      </div>
      <div className="navBtn">
        {" "}
        {"   "}
        <a href="/newsong">
          <i className="fas fa-plus"></i>
        </a>
      </div>
    </div>
  );
}

export default Nav;
