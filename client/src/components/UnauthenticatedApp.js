import React, { useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { LOGIN } from "../context/actions";
import axios from "axios";

const UnauthenticatedApp = () => {
  const [state, dispatch] = useGlobalContext();

  const emailRef = useRef();
  const passwordRef = useRef();
  const regEmailRef = useRef();
  const regPasswordRef = useRef();

  const doLogin = async () => {
    const { data } = await axios.post("/auth/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    console.log(data);
    dispatch({
      type: LOGIN,
      user: data,
    });
  };

  const doSignup = async () => {
    const { data } = await axios.post("/auth/register", {
      email: regEmailRef.current.value,
      password: regPasswordRef.current.value,
    });

    console.log(data);

    // dispatch({
    //   type: LOGIN,
    //   user: data
    // })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    doSignup();
  };

  return (
    <div>
      <p>Please enter your information to login:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="user_name" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit">Submit</button>
      </form>
      <p>Please enter your information to signup:</p>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="user_name" ref={regEmailRef} />
        <input type="password" placeholder="password" ref={regPasswordRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UnauthenticatedApp;
