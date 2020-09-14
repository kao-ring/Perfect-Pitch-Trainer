import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <div className="footer">
      <small>Copyright &copy; Kaori Caplan </small>
      <Link to="/info">
        {"   "}
        <i className="fas fa-info navBtn"></i>
      </Link>
    </div>
  );
}

export default Footer;
