import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { account } from "./appwrite";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a session exists
    const checkSession = async () => {
      try {
        await account.get(); // Verifies if a session is active
        setIsLoggedIn(true);
      } catch (error) {
        console.log("No active session found:", error.message);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <AuthForm setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;

