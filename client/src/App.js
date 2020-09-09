import React, { useState } from "react";
import Player from "./components/Player";
import Nav from "./components/Nav";
import Buttons from "./components/Buttons";
import API from "./utils/API";
import "./style.css";

function App() {
  return (
    <div className="container">
      <Nav />
      <Buttons />
      <Player />
    </div>
  );
}

export default App;
