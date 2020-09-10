import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { LOGOUT } from "../context/actions";
import Player from "./Player";
import Nav from "./Nav";
// import Keyboard from "./Keyboard";

const AuthenticatedApp = () => {
  const [state, dispatch] = useGlobalContext();

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <div>
      <div onClick={handleLogout}>Logout</div>
      <Nav />
      <Player />
      {/* <Keyboard /> */}
    </div>
  );
};

export default AuthenticatedApp;
