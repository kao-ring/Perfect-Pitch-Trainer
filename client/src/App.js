import React from 'react';
import { useGlobalContext } from "./context/GlobalContext"
import AuthenticatedApp from "./components/AuthenticatedApp"
import UnauthenticatedApp from "./components/UnauthenticatedApp"
import './App.css';


function App() {
  const [state, dispatch] = useGlobalContext();

  return (
    <div className="App">
      {state.user.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
