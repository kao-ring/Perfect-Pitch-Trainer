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
import UserInfo from "./UserInfo";
import Info from "../pages/Info";

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
    window.location.replace("/");
  };

  return (
    <div className="container">
      <Router>
        <Nav handleLogout={handleLogout} />
        <Route exact path="/" component={Player} />
        <Route exact path="/progress" component={Progress} />
        <Route path="/newsong" component={NewSong} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/userinfo">
          <UserInfo handleLogout={handleLogout} />
        </Route>

        <hr />

        <Footer />
      </Router>
    </div>
  );
};
export default AuthenticatedApp;
