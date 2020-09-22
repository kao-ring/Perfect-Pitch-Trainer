import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav(props) {
  const user = JSON.parse(localStorage.getItem("authUser")).user_name;

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/img/ear-logo.png" alt="ear-logo" className="earlogo" />
      </Link>
      <div className="hiUser dropdown">
        <i className="far fa-user dropbtn"></i>
        <div className="dropdown-content">
          <div>{user ? "Hi, " + user : "log in please"}</div>
          <hr />
          <Link to="/userinfo">User Info</Link>
          <a onClick={props.handleLogout}>Log Out</a>
        </div>
      </div>
      <Link to="/">Perfect Pitch Trainer</Link>
      <Link to="/progress">
        <i className="fas fa-chart-line"> </i>
      </Link>
      <Link to="/newsong">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
}

export default Nav;
