import React, { useState } from "react";
import Player from "./components/Player";
import Nav from "./components/Nav";
import "./style.css";

function App() {
  return (
    <div className="container">
      <Nav />
      <Player />
    </div>
  );
}

export default App;
