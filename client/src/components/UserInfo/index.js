import React, { useRef, useState, useEffect } from "react";
import API from "../../utils/API";
import Swal from "sweetalert2";

function UserInfo(props) {
  const [user, setUser] = useState({});
  const nameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = () => {
    let user = JSON.parse(localStorage.getItem("authUser")).user_name;
    API.getUserInfo(user)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    let body;
    event.preventDefault();
    // console.log(nameRef.current.value, passwordRef.current.value);

    if (nameRef.current.value && passwordRef.current.value) {
      body = {
        user_name: nameRef.current.value,
        password: passwordRef.current.value,
      };
    } else if (nameRef.current.value) {
      body = {
        user_name: nameRef.current.value,
      };
    } else if (passwordRef.current.value) {
      body = {
        password: passwordRef.current.value,
      };
    } else {
      alert("Please type something...");
      return;
    }

    API.updateUser(user._id, body)
      .then((res) => {
        console.log(res);
        alert("User info changed successfully! Please log in again.");
        props.handleLogout();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The user name is already taken. Please choose another name.",
        });
      });
  };

  const deleteAcc = () => {
    if (
      window.confirm(
        "Are you sure to delete this account? You are loosing all test scores."
      )
    ) {
      // console.log(user._id);
      API.deleteUser(user._id)
        .then((res) => {
          alert("Delete account successfully!");
          props.handleLogout();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <h3>Edit your information:</h3>
      <form onSubmit={handleSubmit}>
        <div className="input">
          {" "}
          <input
            type="text"
            placeholder={user ? user.user_name : "new user name"}
            ref={nameRef}
          />
        </div>
        <div className="input">
          <input type="password" placeholder="*****" ref={passwordRef} />
        </div>
        <div className="btn">
          {" "}
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />

      <div>
        <button id="deleteAcc" onClick={deleteAcc}>
          <strong>Delete this account</strong>
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
