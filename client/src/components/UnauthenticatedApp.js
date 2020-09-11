import React, { useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { LOGIN } from "../context/actions";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "../pages/Register";

const UnauthenticatedApp = () => {
  const [state, dispatch] = useGlobalContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const doLogin = async () => {
    const { data } = await axios.post("/auth/login", {
      user_name: emailRef.current.value,
      password: passwordRef.current.value,
    });

    console.log(data);
    // save the authenticated user data in local storage
    localStorage.setItem("authUser", JSON.stringify(data));
    // save the authenticated user data in local storage
    dispatch({
      type: LOGIN,
      user: data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
  };

  return (
    <Router>
      <Route exact path="/">
        <p>Please enter your information to login:</p>
        <form onSubmit={handleSubmit}>
          <div className="input">
            {" "}
            <input type="text" placeholder="user_name" ref={emailRef} />
          </div>
          <div className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
          </div>
          <div className="btn">
            {" "}
            <button type="submit">Submit</button>
          </div>
        </form>
        <hr />
        <Link to="/register">
          <p>If you don't have an account:</p>
          <button className="signup"> Create Account</button>
        </Link>
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Router>
  );
};

export default UnauthenticatedApp;
