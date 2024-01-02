import React, { useState } from "react";
import "./App.css";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";

import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import SideBar from "./components/SideBar";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <div>
      {loggedIn ? <HomeScreen setLoggedIn={setLoggedIn} /> : <AuthScreen setLoggedIn={setLoggedIn} />}
      {/* <AuthScreen /> */}
      {/* <HomeScreen /> */}
    </div>
  );
};

export default App;
