import React, { useEffect } from "react";
import { useGlobalContext } from "./context/GlobalContext";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
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
      {state.user.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
