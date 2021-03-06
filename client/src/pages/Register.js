import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import "../App.css";

const Register = () => {
  const history = useHistory();

  const regEmailRef = useRef();
  const regPasswordRef = useRef();

  const doSignup = () => {
    if (regEmailRef.current.value && regPasswordRef.current.value) {
      axios
        .post("/auth/register", {
          user_name: regEmailRef.current.value,
          password: regPasswordRef.current.value,
        })
        .then((res) => {
          if (res.data.name) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                "The user name is already taken. Please choose another name.",
            });
          } else {
            let user = res.config.data.split('"')[3];
            Swal.fire("Welcome, " + user + "! Please login.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Missing some information");
    }
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
