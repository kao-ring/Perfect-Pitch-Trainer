import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { LOGOUT, GET_WELCOME } from "../context/actions";
import axios from "axios";
import Player from "./Player";
import Nav from "./Nav";
import Footer from "./Footer";
import Progress from "../pages/Progress.js";
import NewSong from "./NewSong";

const AuthenticatedApp = () => {
  const [state, dispatch] = useGlobalContext();

  const getWelcome = async () => {
    const { data } = await axios.get("/api/welcome", {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    });

    dispatch({
      type: GET_WELCOME,
      welcomeMessage: data,
    });
  };

  useEffect(() => {
    getWelcome();
  }, []);

  const handleLogout = () => {
    // remove the user from localStorage
    localStorage.removeItem("authUser");
    // remove the user from the state
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <div className="container">
      <Nav />

      <Router>
        <Route exact path="/" component={Player} />
        <Route exact path="/progress" component={Progress} />
        <Route path="/newsong" component={NewSong} />
      </Router>

      <hr />

      <div className="logout">
        <button className="logOutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default AuthenticatedApp;
