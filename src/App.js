import React, { useState } from "react";
import "./App.css";
import HomeScreen from "./Views/HomeScreen";
import SignInScreen from "./Views/SignInScreen";

function App() {
  const [route, setRoute] = useState("signIn");
  const [currentUser, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: '',
  });
  // const [isSignedIn, setIsSignedIn] = useState(false);

  function onRouteChange(route) {
    setRoute(route);
  }

  function loadUser(user) {
    setUser({
      id: user.ID,
      name: user.NAME,
      email: user.EMAIL,
      entries: user.ENTRIES,
      joined: user.JOINED
    })
    
  }

  return (
    <div className="App">
      {route === "Home" ? (
        <HomeScreen onRouteChange={onRouteChange} currentUser={currentUser} setUser={setUser}/>
      ) : (
        <SignInScreen route={route} onRouteChange={onRouteChange} loadUser={loadUser}/>
      )}
    </div>
  );
}

export default App;
