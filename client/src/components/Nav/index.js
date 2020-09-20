import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav(props) {
  const user = JSON.parse(localStorage.getItem("authUser")).user_name;
  return (
    <div className="navbar">
      <Link to="/">Perfect Pitch Trainer</Link>{" "}
      <div className="hiUser dropdown">
        <i className="far fa-user dropbtn"></i>
        {user ? user : "log in please"}
        <div className="dropdown-content">
          <Link to="/userinfo">User Info</Link>
          <a onClick={props.handleLogout}>Log Out</a>
        </div>
      </div>
      <div className="navBtn">
        <Link to="/progress">
          {"   "}
          <i className="fas fa-chart-line"> </i>
        </Link>
      </div>
      <div className="navBtn">
        {" "}
        {"   "}
        <Link to="/newsong">
          <i className="fas fa-plus"></i>
        </Link>
      </div>
    </div>
  );
}

export default Nav;

{
  /* <div className="logout">
  <button className="logOutBtn" onClick={handleLogout}>
    Logout
  </button>
</div>; */
}
