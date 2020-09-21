import React, { useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { LOGIN } from "../context/actions";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "../pages/Register";
import Info from "../pages/Info";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";

const UnauthenticatedApp = () => {
  const [state, dispatch] = useGlobalContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const doLogin = () => {
    axios
      .post("/auth/login", {
        user_name: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(state);
        // save the authenticated user res.data in local storage
        localStorage.setItem("authUser", JSON.stringify(res.data));
        // save the authenticated user res.data in local storage
        dispatch({
          type: LOGIN,
          user: res.data,
        });
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The email and/or password isn't right. Try again.",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
  };

  return (
    <Router>
      <Header />
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
            <button type="submit">Log in</button>
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
      <Route exact path="/info">
        <Info />
      </Route>
      <Footer />
    </Router>
  );
};

export default UnauthenticatedApp;
