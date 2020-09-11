import React, { useEffect } from "react";
import { useGlobalContext } from "./context/GlobalContext";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import { LOGIN } from "./context/actions";

function App() {
  const [state, dispatch] = useGlobalContext();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      dispatch({
        type: LOGIN,
        user: user,
      });
    }
  }, []);

  return (
    <div className="App">
      <Nav />
      {state.user.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <Footer />
    </div>
  );
}

export default App;
