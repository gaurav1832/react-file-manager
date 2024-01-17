import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import HomePage from "./Components/HomePage.jsx";
import Folder from "./Components/Folder.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/signup.jsx";
import { UserProvider, useUserContext } from "./Context/UserContext.js";

function App() {
  const { isLoggedIn } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/folder/:folderId"
            element={isLoggedIn ? <Folder /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppWithContext() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWithContext;
