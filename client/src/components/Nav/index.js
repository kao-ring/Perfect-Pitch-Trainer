import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav(props) {
  const user = JSON.parse(localStorage.getItem("authUser")).user_name;
  return (
    <div className="navbar">
      <Link to="/">
        {/* <i className="fas fa-music"> </i> */}
        Perfect Pitch Trainer
      </Link>{" "}
      <div className="hiUser">
        <i className="far fa-user" onClick={props.handleLogout}></i>
        {user ? user : "log in please"}
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
