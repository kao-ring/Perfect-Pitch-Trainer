import React from "react";
import "./style.css";

function Header() {
  return (
    <div className="navbar">
      <img src="/img/ear-logo.png" alt="ear-logo" className="earlogo" />
      <a href="/">Perfect Pitch Trainer</a>
    </div>
  );
}

export default Header;
