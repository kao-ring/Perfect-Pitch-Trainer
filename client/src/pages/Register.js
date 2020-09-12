import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Register = () => {
  const history = useHistory();

  const regEmailRef = useRef();
  const regPasswordRef = useRef();

  const doSignup = async () => {
    const { data } = await axios.post("/auth/register", {
      user_name: regEmailRef.current.value,
      password: regPasswordRef.current.value,
    });

    console.log(data);

    // dispatch({
    //   type: LOGIN,
    //   user: data
    // })
  };

  const handleSignup = (e) => {
    e.preventDefault();
    doSignup();
    history.push("/");
  };

  return (
    <div className="resister">
      <p>Please enter your information to signup:</p>
      <form onSubmit={handleSignup}>
        <div>
          <input type="text" placeholder="user_name" ref={regEmailRef} />
        </div>
        <div>
          {" "}
          <input type="password" placeholder="password" ref={regPasswordRef} />
        </div>
        <div>
          <button type="submit" className="signup">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
