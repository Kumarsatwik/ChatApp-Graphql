import React from "react";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import Welcome from "../components/Welcome";
import AuthScreen from "./AuthScreen";
import { Routes, Route } from "react-router-dom";
import ChatScreen from "../components/ChatScreen";

const HomeScreen = ({setLoggedIn}) => {
  const RoutePath = () => {
    return (
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/:id/:name" element={<ChatScreen />}></Route>
      </Routes>
    );
  };

  return (
    <Box display="flex">
      <SideBar setLoggedIn={setLoggedIn} />
      <RoutePath />
    </Box>
  );
};

export default HomeScreen;
